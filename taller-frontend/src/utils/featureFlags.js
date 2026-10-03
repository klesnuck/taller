/**
 * Feature Flags Utility for A/B Testing
 * Gestor de banderas de características con asignación aleatoria 50/50,
 * persistencia por usuario y capacidad de override manual para demos y testing.
 */

const STORAGE_PREFIX = 'ab_feature_flag_';
const OVERRIDE_PREFIX = 'ab_override_';

/**
 * Obtiene o asigna de forma consistente la variante para un Feature Flag.
 * @param {string} flagKey - Identificador del Feature Flag (ej. 'ab_cta_button')
 * @returns {'A' | 'B'} Variante asignada ('A' = Control, 'B' = Experimental)
 */
export function getFeatureFlag(flagKey = 'ab_cta_button') {
  // 1. Verificar si hay un override manual activo (útil para el admin o video de demostración)
  const override = localStorage.getItem(`${OVERRIDE_PREFIX}${flagKey}`);
  if (override === 'A' || override === 'B') {
    return override;
  }

  // 2. Verificar si ya existe una asignación guardada para este usuario
  const existing = localStorage.getItem(`${STORAGE_PREFIX}${flagKey}`);
  if (existing === 'A' || existing === 'B') {
    return existing;
  }

  // 3. Si es la primera vez, asignar 50/50 aleatoriamente y guardar
  const assigned = Math.random() < 0.5 ? 'A' : 'B';
  localStorage.setItem(`${STORAGE_PREFIX}${flagKey}`, assigned);
  return assigned;
}

/**
 * Fuerza el uso de una variante específica (para pruebas, admin dashboard o demostraciones).
 * @param {string} flagKey - Identificador del Feature Flag
 * @param {'A' | 'B' | null} variant - Variante deseada o null para quitar override
 */
export function setFeatureFlagOverride(flagKey = 'ab_cta_button', variant) {
  if (variant === 'A' || variant === 'B') {
    localStorage.setItem(`${OVERRIDE_PREFIX}${flagKey}`, variant);
  } else {
    localStorage.removeItem(`${OVERRIDE_PREFIX}${flagKey}`);
  }
  // Notificar a la app del cambio de variante si hay listeners
  window.dispatchEvent(new CustomEvent('ab_flag_updated', { detail: { flagKey, variant } }));
}

/**
 * Reinicia la asignación del usuario para permitir nuevas simulaciones.
 */
export function resetFeatureFlag(flagKey = 'ab_cta_button') {
  localStorage.removeItem(`${STORAGE_PREFIX}${flagKey}`);
  localStorage.removeItem(`${OVERRIDE_PREFIX}${flagKey}`);
  window.dispatchEvent(new CustomEvent('ab_flag_updated', { detail: { flagKey } }));
}

/**
 * Obtiene el estado actual de todas las banderas activas.
 */
export function getFeatureFlagState(flagKey = 'ab_cta_button') {
  const currentVariant = getFeatureFlag(flagKey);
  const override = localStorage.getItem(`${OVERRIDE_PREFIX}${flagKey}`);
  return {
    flagKey,
    currentVariant,
    isOverridden: Boolean(override),
    overrideVariant: override || null,
  };
}
