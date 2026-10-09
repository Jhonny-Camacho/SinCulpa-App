# SinCulpa · A tu ritmo

Micro App en español para adultos latinoamericanos: alimentación flexible, movimiento gradual y hábitos cotidianos. HTML, JavaScript modular y Tailwind CSS 4, con Vite. Sin backend ni base de datos.

## Ejecutar

Requiere Node.js 20.19+ o 22.12+ y npm (validado con Node 24).

```sh
npm ci --cache /workspace/.npm-cache
npm run dev -- --port 5173
```

```sh
npm run build
npm run preview
npm test
npm exec playwright test
```

Las pruebas de navegador usan Chromium del sistema (`/usr/bin/chromium`); otra ruta puede indicarse con `CHROMIUM_PATH`. En otras máquinas, instala Chromium o los navegadores de Playwright y adapta la ruta. El resultado de producción está en `dist/` y puede publicarse en un alojamiento estático. El servidor de desarrollo no es un servidor de producción.

## Funciones

- Onboarding en cinco pasos con nombre, edad, estatura, peso y nivel de actividad; validación para adultos.
- Panel, menú diario, movimiento y bonos; barra lateral en escritorio y navegación inferior móvil.
- Treinta combinaciones diarias de desayunos, almuerzos y cenas a partir de recetas reutilizables, con ingredientes y preparación. Porciones orientativas para una persona, sin cálculo de déficit calórico.
- Treinta sesiones en casa o gimnasio, recuperación programada y progresión gradual. El nivel de actividad y edad adaptan rondas y descansos; estatura y peso completan el perfil, sin inferir cargas ni restricciones.
- Semáforo de antojos con orientación según hambre y estado emocional, sin prohibiciones ni diagnóstico clínico.
- Despensa persistente, lista de faltantes del día, descarga TXT, copia e impresión.
- Registro de vasos (250 ml), referencia de ocho vasos, progreso y avisos visuales. Registro separado por fecha local; no envía avisos en segundo plano.
- Modo oscuro, días completados, perfil y reinicio con confirmación. El reinicio también está disponible desde el perfil en móvil.
- Persistencia local (`sinculpa-v1`). Si el navegador bloquea almacenamiento, se informa que el progreso no sobrevivirá al cierre.

## Referencias visuales

Los botones de ejercicios abren búsquedas externas en YouTube y Pinterest. Se puede guardar una URL HTTPS de Pinterest o `pin.it` por ejercicio. No se insertan reproductores ni se garantiza la disponibilidad o calidad de contenido de terceros. Las fotos de ambiente no son demostraciones de técnica; se acompañan de instrucciones y referencias. Si las fotos externas no cargan, hay una presentación alternativa. Las tipografías y la imagen editorial de alimentación generada para esta app están incluidas localmente. Las imágenes de recetas son ilustrativas, no fotos de cada plato.

El plan es orientación general, no tratamiento, prescripción individual ni promesa de pérdida de peso. Adapta porciones, alergias e intensidad; solicita orientación profesional ante condiciones médicas o lesiones.

## Modificar

- `src/data.js`: recetas, lista de compras, sesiones y consejos.
- `src/main.js`: interfaz, estado local y eventos.
- `src/style.css`: Tailwind, diseño adaptable y temas.
- `tests/data.test.js`: integridad del programa de 30 días.
- `tests/browser/app.spec.js`: flujos reales de escritorio y móvil.

No se envían los datos del perfil a un servidor. Los sitios de referencias reciben solicitudes cuando se abren sus enlaces; las imágenes externas reciben solicitudes al mostrarse. Limpiar los datos del navegador también elimina el progreso local.

## Publicar desde GitHub

El repositorio incluye configuración para Vercel y Netlify. En cualquiera de las dos plataformas, inicia sesión con GitHub e importa `Jhonny-Camacho/SinCulpa-App`, rama `main`. Usa la raíz del repositorio como directorio del proyecto, `npm run build` como comando de compilación y `dist` como directorio de salida. Elige Node.js 24. No necesitas variables de entorno. Tras el primer despliegue, cada actualización de `main` podrá generar un nuevo despliegue automáticamente.

En Vercel: **Add New → Project → Import Git Repository → Deploy**.
En Netlify: **Add new project → Import an existing project → GitHub → Publish/Deploy** (los nombres pueden variar según la interfaz).
