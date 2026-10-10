# Publicar la semana gratuita y activar las conexiones

Las páginas funcionan sin cuentas externas:

- `/semana/`: página de captación, en vista previa hasta conectar el formulario.
- `/semana/guia/`: guía interactiva gratuita de siete días.
- `/semana/oferta/`: oferta del programa de 30 días por US$19, sin cobros hasta conectar el checkout.
- `/downloads/SinCulpa-7-dias.pdf`: ebook compañero, descargable e imprimible.
- `/`: aplicación existente de 30 días. Sus datos y funcionamiento se conservan.

Si tu app está en `https://tu-dominio`, añade cada ruta al final de ese dominio. No necesitas otro proyecto en Vercel.

## 1. Formulario y entrega con Brevo (o MailerLite)

1. Crea tu cuenta de Brevo o MailerLite y verifica la dirección desde la que enviarás correos.
2. Crea una lista para quienes solicitan la guía, y una lista o segmento separado para promociones.
3. Crea un formulario alojado con nombre y correo. Explica que los datos se usarán para entregar la guía. Añade tu identidad, correo de contacto y aviso de privacidad. El permiso para promociones debe ser opcional y estar desmarcado. No obligues a aceptarlo para recibir el regalo.
4. Activa la confirmación de correo y la protección contra spam del proveedor. Configura el correo de entrega con enlaces a `/semana/guia/` y al PDF. Prueba un registro con tu propia dirección antes de hacer campañas.
5. Copia el enlace HTTPS público del formulario. No copies un fragmento HTML ni una clave API. El formulario se incrusta en la página; si el proveedor impide la incrustación, el visitante tiene un enlace para abrirlo directamente.
6. En Vercel abre **Settings → Environment Variables** y añade `VITE_LEAD_FORM_URL` con ese enlace. Añade también `VITE_CONTACT_EMAIL`, tu correo público de contacto. Selecciona el entorno de producción y vuelve a desplegar.
7. La página mostrará el formulario real en lugar de la vista previa. Comprueba que un contacto aparece en tu lista, recibe el correo, abre la guía y puede darse de baja de promociones.

El sitio no simula envíos ni guarda correos en localStorage. El formulario externo recoge los datos y el proveedor conserva consentimientos y gestiona envíos. Cuando el registro no está conectado, la guía se ofrece en vista previa sin pedir datos.

## 2. Checkout con Hotmart (o Gumroad)

1. Crea tu cuenta de vendedor y completa los requisitos que te pida la plataforma para cobrar y retirar dinero en tu país.
2. Crea el producto SinCulpa, con precio de lanzamiento **US$19**, pago único. Describe exactamente qué incluye y configura condiciones de compra, entrega, soporte, impuestos y devoluciones. No se ha inventado una garantía ni un plazo de devolución.
3. Define cómo se entrega y se restringe el acceso al producto. **La app existente es un sitio estático público, no tiene usuarios ni verificación de compra. Un enlace de pago por sí solo no protege la app ni desbloquea automáticamente acceso.** Si necesitas acceso exclusivo para compradores, hay que añadir autenticación y verificación de compra o alojar la experiencia en un entorno que controle ese acceso. No actives el checkout sin resolver la entrega que prometas.
4. Cuando el checkout y la entrega estén probados, copia su enlace HTTPS público y guárdalo en Vercel como `VITE_CHECKOUT_URL`. Vuelve a desplegar. Los botones abrirán ese checkout real; nunca piden tarjetas dentro de SinCulpa.
5. Haz una compra de prueba con el método de pruebas de tu plataforma, verifica el importe final y la entrega. No se han realizado compras ni configurado cobros desde este proyecto.

Antes de configurar `VITE_CHECKOUT_URL`, los botones de compra permanecen desactivados y explican que las ventas abrirán próximamente.

## 3. Correos de seguimiento

En `docs/SECUENCIA-DE-CORREOS.md` hay textos listos para adaptar. El correo de entrega se dirige a quien pide la guía. Envía seguimiento y ofertas solo a quienes den el permiso correspondiente y, si utilizas doble confirmación, lo confirmen. Incluye identidad del remitente y enlace de baja del proveedor. Los textos preparados no están enviados ni programados.

## 4. Variables públicas y PDF

`VITE_` significa que la variable se incluye en el navegador. Aquí se usan exclusivamente enlaces públicos y el correo de contacto. **No introduzcas contraseñas, claves API, tokens o secretos en estas variables.** `.env.example` muestra sus nombres; los valores reales pueden configurarse en Vercel.

El PDF se entrega como archivo ya generado, por lo que Vercel no necesita instalar Chromium. Para regenerarlo localmente con enlaces absolutos de tu dominio:

```sh
VITE_PUBLIC_SITE_URL=https://tu-dominio node scripts/generate-ebook.mjs
```

Requiere Chromium (`/usr/bin/chromium` por defecto, modificable con `CHROMIUM_PATH`). Si el dominio no está configurado, el PDF invita a usar el enlace recibido y no contiene direcciones inventadas. La guía web siempre enlaza correctamente sus páginas con rutas relativas al sitio.

Cambiar variables en Vercel requiere un nuevo despliegue. Cambiar el dominio del PDF requiere regenerar y subir el PDF actualizado. El sitio todavía no tiene analítica ni almacenamiento de leads propio; usa las métricas de formularios y ventas de tus proveedores.
