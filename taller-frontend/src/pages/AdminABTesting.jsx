import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { getFeatureFlagState, setFeatureFlagOverride, resetFeatureFlag } from '../utils/featureFlags';
import { getLocalABMetrics, calculateStatisticalSignificance, seedSimulatedData, resetABMetrics } from '../utils/abAnalytics';

function AdminABTesting() {
  const [flagState, setFlagState] = useState(() => getFeatureFlagState('ab_cta_button'));
  const [metrics, setMetrics] = useState(() => getLocalABMetrics());
  const [analysis, setAnalysis] = useState(() => calculateStatisticalSignificance(getLocalABMetrics()));

  // Cargar y escuchar actualizaciones de métricas y banderas
  useEffect(() => {
    const refreshData = () => {
      const currentMetrics = getLocalABMetrics();
      setMetrics(currentMetrics);
      setAnalysis(calculateStatisticalSignificance(currentMetrics));
      setFlagState(getFeatureFlagState('ab_cta_button'));
    };

    window.addEventListener('ab_metrics_updated', refreshData);
    window.addEventListener('ab_flag_updated', refreshData);

    const interval = setInterval(refreshData, 2000);

    return () => {
      window.removeEventListener('ab_metrics_updated', refreshData);
      window.removeEventListener('ab_flag_updated', refreshData);
      clearInterval(interval);
    };
  }, []);

  // Manejar cambio de Feature Flag
  const handleVariantToggle = (variant) => {
    if (variant === 'RANDOM') {
      resetFeatureFlag('ab_cta_button');
    } else {
      setFeatureFlagOverride('ab_cta_button', variant);
    }
  };

  // Simular datos de 500 usuarios
  const handleSeedData = () => {
    const data = seedSimulatedData();
    setMetrics(data);
    setAnalysis(calculateStatisticalSignificance(data));
  };

  // Reiniciar datos
  const handleResetData = () => {
    if (window.confirm('¿Deseas reiniciar todas las métricas de la prueba A/B?')) {
      resetABMetrics();
      const fresh = getLocalABMetrics();
      setMetrics(fresh);
      setAnalysis(calculateStatisticalSignificance(fresh));
    }
  };

  // Exportar PDF directo desde el navegador
  const handleExportPDF = () => {
    window.print();
  };

  const { A, B } = metrics;

  return (
    <AdminLayout activeTab="ab-testing">
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        
        {/* ENCABEZADO */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">
                Prueba Controlada A/B
              </span>
              <span className="text-xs text-gray-400">
                Experimento: Optimización del CTA Hero
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2">
              Panel de Monitoreo & Feature Flags ⚡
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Monitoreo en tiempo real, cálculo de significancia estadística y control de variantes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSeedData}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2.5 rounded-xl shadow text-sm flex items-center gap-2 transition-all"
            >
              <span>🚀 Simular 600 Usuarios</span>
            </button>
            <button
              onClick={handleResetData}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all"
            >
              🔄 Reiniciar
            </button>
            <button
              onClick={handleExportPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl shadow text-sm flex items-center gap-2 transition-all"
            >
              <span>📄 Imprimir / Exportar PDF</span>
            </button>
          </div>
        </div>

        {/* CONTROL DE FEATURE FLAGS EN VIVO */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md border border-slate-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="text-lg font-bold">Interruptor de Feature Flag (Bandera de Característica)</h3>
              </div>
              <p className="text-slate-300 text-xs mt-1">
                Controla qué variante ven los usuarios en tiempo real sin necesidad de redesplegar el código.
              </p>
            </div>

            {/* BOTONES DE TOGGLE */}
            <div className="bg-slate-950/70 p-1.5 rounded-xl border border-slate-700 flex items-center gap-1">
              <button
                onClick={() => handleVariantToggle('A')}
                className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                  flagState.overrideVariant === 'A'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Forzar Variante A (Control)
              </button>

              <button
                onClick={() => handleVariantToggle('B')}
                className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                  flagState.overrideVariant === 'B'
                    ? 'bg-amber-500 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Forzar Variante B (Experimental)
              </button>

              <button
                onClick={() => handleVariantToggle('RANDOM')}
                className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                  !flagState.isOverridden
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🔀 50/50 Aleatorio (Producción)
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
            <span>
              Estado Activo Actual:{' '}
              <strong className="text-white">
                {flagState.isOverridden
                  ? `Forzado Manualmente → Variante ${flagState.overrideVariant}`
                  : `Asignación Automática → Variante ${flagState.currentVariant}`}
              </strong>
            </span>
            <span>Target: Hero CTA Button (`Inicio.jsx`)</span>
          </div>
        </div>

        {/* MÉTRICAS DE CONTROL (A) VS EXPERIMENTAL (B) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* VARIANTE A CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">
              Control (A)
            </div>
            
            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Variante A: Control</h3>
            <p className="text-xs text-gray-500 mb-4">Botón Azul Tradicional: "Cotizar"</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-blue-50/50 p-3 rounded-xl">
                <span className="text-xs text-gray-500 font-semibold block">Vistas</span>
                <span className="text-2xl font-bold text-gray-900">{A.views}</span>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-xl">
                <span className="text-xs text-gray-500 font-semibold block">Clics</span>
                <span className="text-2xl font-bold text-blue-600">{A.clicks}</span>
              </div>
              <div className="bg-blue-50/50 p-3 rounded-xl">
                <span className="text-xs text-gray-500 font-semibold block">CTR</span>
                <span className="text-2xl font-extrabold text-blue-700">{analysis.rateA}%</span>
              </div>
            </div>

            {/* Barra de progreso CTR */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>Tasa de Conversión (CTR)</span>
                <span>{analysis.rateA}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Number(analysis.rateA) * 2)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* VARIANTE B CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-amber-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase">
              Experimental (B)
            </div>

            <h3 className="text-xl font-extrabold text-gray-900 mb-1">Variante B: Experimental</h3>
            <p className="text-xs text-gray-500 mb-4">Botón Naranja: "⚡ Agendar Cita en 2 Minutos"</p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-amber-50/50 p-3 rounded-xl">
                <span className="text-xs text-gray-500 font-semibold block">Vistas</span>
                <span className="text-2xl font-bold text-gray-900">{B.views}</span>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-xl">
                <span className="text-xs text-gray-500 font-semibold block">Clics</span>
                <span className="text-2xl font-bold text-amber-600">{B.clicks}</span>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-xl">
                <span className="text-xs text-gray-500 font-semibold block">CTR</span>
                <span className="text-2xl font-extrabold text-amber-700">{analysis.rateB}%</span>
              </div>
            </div>

            {/* Barra de progreso CTR */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-gray-600">
                <span>Tasa de Conversión (CTR)</span>
                <span>{analysis.rateB}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Number(analysis.rateB) * 2)}%` }}
                ></div>
              </div>
            </div>
          </div>

        </div>

        {/* CÁLCULO DE SIGNIFICANCIA ESTADÍSTICA (P-VALUE / Z-SCORE) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Análisis Estadístico & Conclusión</h3>
              <p className="text-xs text-gray-500">Evaluación del p-value, Z-score e intervalo de confianza</p>
            </div>

            <div className={`px-4 py-1.5 rounded-full font-extrabold text-xs flex items-center gap-1.5 ${
              analysis.isSignificant
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}>
              <span>{analysis.isSignificant ? '✅ Estadsíticamente Significativo' : '⏳ En Acumulación de Datos'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <span className="text-xs text-gray-500 block mb-1 font-medium">Mejora Relativa</span>
              <span className={`text-2xl font-extrabold ${
                Number(analysis.relativeImprovement) >= 0 ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {Number(analysis.relativeImprovement) > 0 ? `+${analysis.relativeImprovement}%` : `${analysis.relativeImprovement}%`}
              </span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <span className="text-xs text-gray-500 block mb-1 font-medium">Nivel de Confianza</span>
              <span className="text-2xl font-extrabold text-blue-600">{analysis.confidenceLevel}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <span className="text-xs text-gray-500 block mb-1 font-medium">Z-Score</span>
              <span className="text-2xl font-extrabold text-purple-600">{analysis.zScore}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl text-center">
              <span className="text-xs text-gray-500 block mb-1 font-medium">P-Value</span>
              <span className="text-2xl font-extrabold text-slate-700">{analysis.pValue}</span>
            </div>
          </div>

          {/* RECOMENDACIÓN FINAL */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-blue-900">
            <h4 className="font-bold text-sm mb-1 flex items-center gap-2">
              💡 Conclusión del Experimento:
            </h4>
            <p className="text-sm leading-relaxed">{analysis.recommendation}</p>
          </div>
        </div>

        {/* LOG DE EVENTOS EN TIEMPO REAL */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Historial Reciente de Telemetría</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
                <tr>
                  <th className="p-3">ID Evento</th>
                  <th className="p-3">Variante</th>
                  <th className="p-3">Tipo de Evento</th>
                  <th className="p-3">Fecha / Hora</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {metrics.eventsLog && metrics.eventsLog.length > 0 ? (
                  metrics.eventsLog.slice(0, 10).map((evt) => (
                    <tr key={evt.id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono text-gray-500">{evt.id}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                          evt.variant === 'B' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          Variante {evt.variant}
                        </span>
                      </td>
                      <td className="p-3 capitalize font-semibold text-gray-800">{evt.type}</td>
                      <td className="p-3 text-gray-500">{new Date(evt.timestamp).toLocaleString('es-ES')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-400 italic">
                      No hay eventos registrados aún. Interactúa con la página de inicio o simula datos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

export default AdminABTesting;
