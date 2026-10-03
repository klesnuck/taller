# INFORME FINAL: DISEÑO, IMPLEMENTACIÓN Y ANÁLISIS DE PRUEBA A/B
## Proyecto: Autoservicio San Jorge (Taller Automotriz)
**Asignatura:** Desarrollo Web & Experimentos Controlados  
**Fecha:** Octubre 2026  
**Autores:** Equipo de Desarrollo Taller San Jorge  

---

## PASO 1: DISEÑO DE LA PRUEBA A/B

### 1. Elemento a Mejorar
Se seleccionó el botón principal de **Llamado a la Acción (CTA - Call To Action)** en la sección Hero de la página de inicio del sistema web de **Autoservicio San Jorge** (`Inicio.jsx`).

- **Línea Base Original:** Un botón simple azul de texto plano `"Cotizar"`.
- **Área de Oportunidad:** Reducir la ambigüedad en el proceso de reserva, aumentar el contraste visual y transmitir rapidez para incentivar la conversión.

### 2. Formulación de Hipótesis Clara
> **"Creemos que** sustituir el botón azul plano `'Cotizar'` por un botón naranja de alto contraste con icono y texto directo `'⚡ Agendar Cita en 2 Minutos (Sin Esperas)'` **resultará en** un incremento de al menos **15% a 20% en la Tasa de Clics (CTR / Conversión)**, **porque** elimina la incertidumbre del usuario respecto al tiempo del proceso, crea un llamado visual urgente y destaca sobre la imagen de fondo del taller."

### 3. Definición de las Variantes (A y B)
- **Versión A (Control):** 
  - Estilo: Botón azul tradicional (`bg-blue-600`).
  - Texto: `"Cotizar"`.
  - Comportamiento: Redirige a `/servicios`.
- **Versión B (Experimental):** 
  - Estilo: Botón degradado de alta visibilidad (`from-amber-500 to-orange-600`) con micro-badge visual `"Sin Esperas"` y animación sutil de pulso.
  - Texto: `"⚡ Agendar Cita en 2 Minutos"`.
  - Comportamiento: Redirige a `/servicios` registrando telemetría avanzada.

### 4. Métrica Clave de Éxito
- **Métrica Principal:** Tasa de Clics por Impresión (CTR - Click-Through Rate):
  $$\text{CTR} = \left( \frac{\text{Número de Clics en Variante}}{\text{Número de Vistas/Impresiones de Variante}} \right) \times 100\%$$
- **Métricas Secundarias (Monitoreo de Impacto Negativo):**
  - Tasa de Errores en la interfaz (`errors`).
  - Tiempo de permanencia y conversiones completas en la sección de agendamiento.

### 5. Audiencia y Duración
- **Segmentación de Audiencia:** 50% de usuarios asignados a Variante A y 50% a Variante B.
- **Mecanismo de Consistencia:** La asignación se mantiene guardada por usuario (`localStorage`) para garantizar que la misma persona experimente la misma versión en visitas posteriores.
- **Duración del Experimento:** 14 días en ambiente de producción simulado (600 interacciones de muestra).

---

## PASO 2: IMPLEMENTACIÓN Y EJECUCIÓN

### 1. Modificación del Código
Se modificó el componente `src/pages/Inicio.jsx` integrando la renderización condicional basada en banderas de características:

```jsx
{abVariant === 'B' ? (
  <Link to="/servicios" onClick={handleCTAClick} className="bg-gradient-to-r from-amber-500 to-orange-600 ...">
    <span>⚡ Agendar Cita en 2 Minutos</span>
    <span className="text-xs bg-black/30 px-2.5 py-1 rounded-full font-normal">Sin Esperas</span>
  </Link>
) : (
  <Link to="/servicios" onClick={handleCTAClick} className="bg-blue-600 hover:bg-blue-700 ...">
    Cotizar
  </Link>
)}
```

### 2. Manejo de Variantes mediante Feature Flags (`featureFlags.js`)
Se desarrolló un módulo de Feature Flags en `src/utils/featureFlags.js` que permite:
- Asignar variantes de forma aleatoria y consistente (50/50).
- Activar overrides manuales desde el **Panel de Administración (`AdminABTesting.jsx`)** para pruebas en tiempo real sin desplegar nuevo código.

### 3. Sistema de Telemetría y Monitoreo (`abAnalytics.js` y Backend API)
- Cada vista del Hero emite un evento `view`.
- Cada interacción emite un evento `click`.
- Los datos se almacenan localmente y se envían a `/api/ab-testing/event` en el backend Express.

---

## PASO 3: ANÁLISIS DE RESULTADOS

### 1. Recopilación de Datos Muestra (14 Días)

| Métrica | Variante A (Control) | Variante B (Experimental) | Diferencia |
| :--- | :---: | :---: | :---: |
| **Impresiones (Vistas)** | 320 | 325 | +5 vistas |
| **Clics Registrados** | 35 | 64 | +29 clics |
| **Tasa de Clics (CTR)** | **10.94%** | **19.69%** | **+8.75% (Absoluta)** |
| **Tasa de Errores** | 1.25% (4) | 0.61% (2) | Sin impacto negativo |

### 2. Cálculo de Significancia Estadística
Utilizando el método de **Prueba Z para dos proporciones (Z-Score & P-Value)**:

- **Mejora Relativa de CTR:**
  $$\text{Mejora Relativa} = \frac{19.69\% - 10.94\%}{10.94\%} \times 100\% = +79.98\%$$
- **Z-Score Obtenido:** $z = 3.142$
- **P-Value Obtenido:** $p = 0.00167$ ($p < 0.05$)
- **Nivel de Confianza:** **99.83%**

---

## PASO 4: DOCUMENTACIÓN DE LECCIONES APRENDIDAS

### 1. Conclusiones
1. **La Hipótesis fue Validada:** La Variante B superó a la Variante A con una mejora relativa de CTR del **+79.98%** y un nivel de confianza estadística superior al 99%.
2. **Claridad del CTA:** El texto directo `"Agendar Cita en 2 Minutos"` con la señalización `"Sin Esperas"` elimina la fricción cognitiva del usuario frente al término genérico `"Cotizar"`.
3. **Estabilidad Técnica:** El Feature Flag funcionó de manera transparente sin generar interrupciones ni aumentar la tasa de errores.

### 2. Lecciones Aprendidas
- **Los cambios pequeños en micro-copy y contraste producen impactos masivos en conversión.**
- **La consistencia de sesión mediante Feature Flags es crítica:** evita confundir a usuarios recurrentes.
- **El monitoreo de errores secundarios es fundamental:** confirma que el incremento en conversiones no fue a costa de fallas en la interfaz.

### 3. Recomendaciones Finales
- **Despliegue al 100%:** Promover la Variante B (Naranja / "Agendar Cita en 2 Minutos") al 100% del tráfico de producción.
- **Siguiente Experimento:** Diseñar una nueva prueba A/B en el formulario de selección de servicios (`FormularioCarro.jsx`) para optimizar el embudo de agendamiento completo.
