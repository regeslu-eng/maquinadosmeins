# MEINS — Maquinados y fabricación industrial

Proyecto estático completo: HTML, CSS, JavaScript, fotografías y logos locales.
Dominio configurado: https://www.maquinadosmeins.com/

## Publicar en GitHub y Vercel

1. Descomprime el ZIP. Sube su CONTENIDO a la raíz del repositorio: index.html, sitemap.xml, robots.txt y vercel.json deben quedar al mismo nivel. No subas el ZIP ni una carpeta adicional que los envuelva.
2. Sustituye los archivos de la versión anterior con esta versión. Ya no se utilizan public/, dist/, scripts/ ni site.config.json. Conserva cualquier archivo ajeno al sitio que necesites.
3. En Vercel, Settings > Build and Deployment: Framework Preset = Other; Root Directory = raíz del repositorio (campo vacío); Build Command = vacío; Output Directory = .; Install Command = vacío. El vercel.json incluido fija los comandos vacíos y la salida en la raíz. Quita cualquier configuración anterior que apunte a public o dist.
4. Guarda y publica un nuevo despliegue de producción desde el commit actualizado. En Settings > Domains comprueba que www.maquinadosmeis.com apunta a este proyecto.

Referencia de Vercel: https://vercel.com/docs/builds/configure-a-build

## Google Search Console

La etiqueta de verificación ya está dentro del head de index.html:
<meta name="google-site-verification" content="WIoNmuCgTUKDzxXk1MJ4XFv8nfjxHU3YnypSkOa1YI0" />

1. Tras publicar, abre https://www.maquinadosmeins.com/sitemap.xml en el navegador. Debe aparecer un XML con la URL https://www.maquinadosmeins.com/; no la portada ni un error 404.
2. Abre https://www.maquinadosmeins.com/robots.txt y comprueba que muestra Allow: / y la dirección del sitemap.
3. En la propiedad https://www.maquinadosmeins.com/ de Search Console, verifica la propiedad si todavía está pendiente. En Sitemaps, escribe sitemap.xml en el campo que ya incluye el dominio y envíalo de nuevo.
4. En Inspección de URL, inspecciona la portada y solicita indexación si procede. Google decide cuándo rastrear e indexar: publicar la etiqueta y el sitemap no garantiza aparecer de inmediato.

El sitemap contiene una URL porque el sitio es una sola página con secciones; sus anclas no son páginas separadas.
Si sigue sin poder obtenerse, revisa el dominio, el último despliegue y que la web pública no solicite inicio de sesión. Un XML que abre correctamente permite descartar la ubicación local del archivo como causa.

## Editar o ver localmente

Edita directamente index.html, style.css y app.js. No necesitas npm ni compilar.
Abre index.html o ejecuta python3 -m http.server 8000 desde esta carpeta.
Los logos están en assets/clientes; sus fuentes se conservan en FUENTES_LOGOS.json.
El formulario prepara un mensaje de WhatsApp; no almacena ni envía solicitudes por un servidor.
Conserva la etiqueta de verificación. Si cambia el dominio, actualiza index.html, sitemap.xml y robots.txt.
