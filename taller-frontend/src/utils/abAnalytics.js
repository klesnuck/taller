/**
 * A/B Analytics Telemetry Utility
 * Registra impresiones, clics y conversiones de las variantes A/B.
 * Mantiene copia local en localStorage para rápida visualización y sincroniza con el backend.
 */

const ANALYTICS_STORAGE_KEY = 'ab_test_metrics_data';

// Estructura inicial de métricas
const initialStats = {
  experiment: 'Hero CTA Optimization',
  startDate: new Date().toISOString(),
  A: { views: 0, clicks: 0, conversions: 0, errors: 0 },
  B: { views: 0, clicks: 0, conversions: 0, errors: 0 },
  eventsLog: [],
};

/**
 * Obtiene las métricas locales acumuladas.
 */
export function getLocalABMetrics() {
  try {
    const data = localStorage.getItem(ANALYTICS_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error al leer métricas A/B:', e);
  }
  return initialStats;
}

/**
 * Guarda las métricas locales en localStorage.
 */
function saveLocalMetrics(stats) {
  try {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, JSON.stringify(stats));
    window.dispatchEvent(new CustomEvent('ab_metrics_updated', { detail: stats }));
  } catch (e) {
    console.error('Error al guardar métricas A/B:', e);
  }
}

/**
 * Registra un evento de la prueba A/B.
 * @param {'A' | 'B'} variant - Variante ('A' o 'B')
 * @param {'view' | 'click' | 'conversion' | 'error'} type - Tipo de evento
 * @param {object} metadata - Información adicional opcional
 */
export async function trackABEvent(variant, type, metadata = {}) {
  if (!variant || (variant !== 'A' && variant !== 'B')) return;

  // 1. Actualizar métricas locales
  const stats = getLocalABMetrics();
  if (type === 'view') stats[variant].views += 1;
  if (type === 'click') stats[variant].clicks += 1;
  if (type === 'conversion') stats[variant].conversions += 1;
  if (type === 'error') stats[variant].errors += 1;

  const eventEntry = {
    id: Date.now() + Math.random().toString(36).substr(2, 4),
    variant,
    type,
    timestamp: new Date().toISOString(),
    ...metadata,
  };

  // Mantener solo los últimos 200 eventos en el log local
  stats.eventsLog.unshift(eventEntry);
  if (stats.eventsLog.length > 200) stats.eventsLog.pop();

  saveLocalMetrics(stats);

  // 2. Intentar enviar al backend
  try {
    const API_URL = import.meta.env.VITE_API_URL || '';
    await fetch(`${API_URL}/api/ab-testing/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ variant, type, metadata, timestamp: eventEntry.timestamp }),
    });
  } catch (err) {
    // Si no se puede comunicar con el backend, no detiene la interfaz (funciona offline/demo)
    console.log('Backend notification offline, event saved locally.');
  }
}

/**
 * Genera datos simulados representativos para demostración/evaluación.
 * Simula 600 usuarios (300 en A, 300 en B) con hipótesis cumplida.
 */
export function seedSimulatedData() {
  const simulated = {
    experiment: 'Hero CTA Optimization - Taller San Jorge',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    A: { views: 320, clicks: 35, conversions: 28, errors: 4 }, // ~10.9% CTR
    B: { views: 325, clicks: 64, conversions: 52, errors: 2 }, // ~19.7% CTR (+80.7% mejora relativa, p < 0.01)
    eventsLog: [],
  };

  // Generar algunos eventos del historial
  for (let i = 0; i < 30; i++) {
    simulated.eventsLog.push({
      id: `sim-${i}`,
      variant: i % 2 === 0 ? 'B' : 'A',
      type: i % 3 === 0 ? 'click' : 'view',
      timestamp: new Date(Date.now() - i * 3600 * 1000).toISOString(),
    });
  }

  saveLocalMetrics(simulated);
  return simulated;
}

/**
 * Reinicia completamente las métricas acumuladas.
 */
export function resetABMetrics() {
  saveLocalMetrics({ ...initialStats, startDate: new Date().toISOString() });
}

/**
 * Realiza el cálculo estadístico entre Variante A y Variante B (Z-score / p-value / Chi-cuadrada).
 */
export function calculateStatisticalSignificance(stats = getLocalABMetrics()) {
  const { A, B } = stats;

  const nA = A.views;
  const cA = A.clicks;
  const rateA = nA > 0 ? cA / nA : 0;

  const nB = B.views;
  const cB = B.clicks;
  const rateB = nB > 0 ? cB / nB : 0;

  if (nA === 0 || nB === 0) {
    return {
      rateA: 0,
      rateB: 0,
      relativeImprovement: 0,
      zScore: 0,
      pValue: 1,
      isSignificant: false,
      confidenceLevel: '0%',
      sampleSizeSufficient: false,
      recommendation: 'Recopilando datos iniciales...',
    };
  }

  // Tasa agrupada (Pooled proportion)
  const pPooled = (cA + cB) / (nA + nB);
  const sePooled = Math.sqrt(pPooled * (1 - pPooled) * (1 / nA + 1 / nB));

  // Z-Score
  const zScore = sePooled > 0 ? (rateB - rateA) / sePooled : 0;

  // Aproximación del p-value (prueba bilateral/two-tailed test)
  const absZ = Math.abs(zScore);
  // Aproximación polinómica para la distribución normal acumulada
  const t = 1 / (1 + 0.2316419 * absZ);
  const poly = t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  const pValue = Math.max(0, 2 * (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * absZ * absZ) * poly);

  const relativeImprovement = rateA > 0 ? ((rateB - rateA) / rateA) * 100 : 0;
  const isSignificant = pValue < 0.05 && (nA + nB >= 100);
  const confidencePercent = Math.min(99.9, Math.max(0, (1 - pValue) * 100)).toFixed(1);

  let recommendation = '';
  if (nA + nB < 100) {
    recommendation = 'Se necesita un tamaño de muestra mayor (mínimo 100 vistas totales) para concluir con rigor.';
  } else if (isSignificant && relativeImprovement > 0) {
    recommendation = `¡Hipótesis Validada! La Variante B superó a la A con un ${relativeImprovement.toFixed(1)}% de mejora y un nivel de confianza del ${confidencePercent}%. Recomendación: Desplegar la Variante B al 100% de los usuarios.`;
  } else if (isSignificant && relativeImprovement < 0) {
    recommendation = `La Variante B tuvo un rendimiento inferior (${relativeImprovement.toFixed(1)}%). Recomendación: Mantener la Variante A (Control) e investigar nuevas hipótesis.`;
  } else {
    recommendation = 'No se observan diferencias estadísticamente significativas entre la Variante A y la Variante B en este momento.';
  }

  return {
    rateA: (rateA * 100).toFixed(2),
    rateB: (rateB * 100).toFixed(2),
    relativeImprovement: relativeImprovement.toFixed(2),
    zScore: zScore.toFixed(3),
    pValue: pValue.toFixed(4),
    isSignificant,
    confidenceLevel: `${confidencePercent}%`,
    sampleSizeSufficient: nA + nB >= 100,
    recommendation,
  };
}
