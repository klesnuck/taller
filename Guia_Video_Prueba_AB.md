# GUÍA Y GUIÓN PASO A PASO PARA EL VIDEO (MÁXIMO 5 MINUTOS)
## Demostración de la Prueba A/B en Autoservicio San Jorge

Esta guía contiene la estructura exacta y el texto sugerido para grabar el video de la tarea.

---

### ESTRUCTURA DE TIEMPOS (5 MINUTOS TOTAL)

| Tiempo | Sección | Qué mostrar en pantalla | Qué decir (Guión) |
| :--- | :--- | :--- | :--- |
| **0:00 - 0:45** | **1. Introducción e Hipótesis** | Portada / Página de inicio del Taller San Jorge. | *"Hola, en este video presentaré los resultados del experimento A/B realizado para Autoservicio San Jorge. Elegimos como elemento a optimizar el botón principal de llamado a la acción (CTA) del Hero en la página de inicio..."* |
| **0:45 - 2:00** | **2. Demostración en Vivo de Variantes y Feature Flags** | Navegador mostrando la vista principal y luego el panel de `/admin/ab-testing`. | *"Implementamos un sistema de Feature Flags con asignación 50/50. En este momento vemos la Variante A (Control) con el botón azul 'Cotizar'. Ahora, desde nuestro panel de Feature Flags, activamos la Variante B..."* |
| **2:00 - 3:30** | **3. Monitoreo y Telemetría en Tiempo Real** | Panel de Monitoreo `/admin/ab-testing` con datos simulados y tabla de eventos. | *"En el panel de monitoreo estilo Grafana rastreamos impresiones y clics de forma independiente. Con una muestra de 600 usuarios, observamos los siguientes datos..."* |
| **3:30 - 4:30** | **4. Análisis de Significancia Estadística** | Cuadro de Análisis Estadístico (CTR, Z-score, P-value, Confianza). | *"Calculamos la tasa de conversión: la Variante A obtuvo un 10.9% de CTR, mientras que la Variante B alcanzó un 19.7%, lo que representa un +79.9% de mejora relativa. Con un Z-score de 3.14 y un P-value de 0.0016, tenemos más del 99% de confianza estadística..."* |
| **4:30 - 5:00** | **5. Conclusión y Recomendación** | Muestra del reporte PDF exportado o vista final. | *"En conclusión, la hipótesis fue completamente validada. La recomendación basada en datos es desplegar la Variante B al 100% de los usuarios..."* |

---

### PASOS PARA PREPARAR Y GRABAR EL VIDEO

1. **Abrir el sistema:**
   - Inicia el servidor frontend (`npm run dev` en `taller-frontend`) y backend si lo deseas.
   - Abre la aplicación en el navegador (`http://localhost:5173`).
2. **Iniciar Grabación de Pantalla:**
   - Puedes usar OBS Studio, PowerPoint (Grabar pantalla), Loom o la barra de juegos de Windows (`Win + G`).
3. **Durante la grabación:**
   - Muestra la página principal `/`.
   - Navega al panel `/admin/ab-testing`.
   - Presiona **"Forzar Variante A"** y regresa a `/` para mostrar el botón azul original.
   - Regresa al panel, presiona **"Forzar Variante B"** y regresa a `/` para mostrar el botón naranja destacado `"⚡ Agendar Cita en 2 Minutos"`.
   - Presiona el botón **"🚀 Simular 600 Usuarios"** para cargar los datos completos y mostrar las métricas, Z-score, P-value y gráfico de CTR en vivo.
   - Muestra cómo presionar **"📄 Imprimir / Exportar PDF"** para generar el informe.
