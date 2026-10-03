/**
 * Rutas de la API de A/B Testing
 * Endpoint para registrar impresiones, clics y conversiones, y servir métricas agrupadas.
 */

const express = require('express');
const router = express.Router();

// Almacenamiento en memoria para telemetría backend
let abMetrics = {
  A: { views: 0, clicks: 0, conversions: 0, errors: 0 },
  B: { views: 0, clicks: 0, conversions: 0, errors: 0 },
  events: [],
};

// POST /api/ab-testing/event - Registrar un evento
router.post('/event', (req, res) => {
  const { variant, type, metadata, timestamp } = req.body;
  if (!variant || (variant !== 'A' && variant !== 'B')) {
    return res.status(400).json({ error: 'Variante no válida (debe ser A o B)' });
  }

  if (type === 'view') abMetrics[variant].views += 1;
  else if (type === 'click') abMetrics[variant].clicks += 1;
  else if (type === 'conversion') abMetrics[variant].conversions += 1;
  else if (type === 'error') abMetrics[variant].errors += 1;

  const eventRecord = {
    id: Date.now() + Math.random().toString(36).substr(2, 4),
    variant,
    type,
    timestamp: timestamp || new Date().toISOString(),
    metadata: metadata || {},
  };

  abMetrics.events.unshift(eventRecord);
  if (abMetrics.events.length > 500) abMetrics.events.pop();

  res.json({ success: true, event: eventRecord });
});

// GET /api/ab-testing/stats - Obtener métricas consolidadas
router.get('/stats', (req, res) => {
  res.json({
    success: true,
    data: abMetrics,
  });
});

// POST /api/ab-testing/reset - Reiniciar métricas
router.post('/reset', (req, res) => {
  abMetrics = {
    A: { views: 0, clicks: 0, conversions: 0, errors: 0 },
    B: { views: 0, clicks: 0, conversions: 0, errors: 0 },
    events: [],
  };
  res.json({ success: true, message: 'Métricas reiniciadas en backend' });
});

module.exports = router;
