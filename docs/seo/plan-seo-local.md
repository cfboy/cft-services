# Plan de SEO local — CFT Services

Lo que ya hace el sitio (código) y lo que falta hacer fuera del código para
rankear en Google en Puerto Rico y San Juan. Actualizado 2026-11-13.

## 1. Lo que el sitio ya tiene

| Pieza | Detalle |
|-------|---------|
| **16 páginas indexables** | Inicio, índice de servicios y 6 servicios, en inglés (`/…`) y español (`/es/…`). Cada una es HTML pre-generado con su propio contenido, así Google la lee sin ejecutar JavaScript. |
| **URLs con palabras clave** | `/es/servicios/diseno-de-paginas-web/`, `/es/servicios/automatizacion-de-procesos/`, `/services/web-design/`, etc. |
| **Títulos y descripciones únicos** | Cada página apunta a su búsqueda: "Diseño de Páginas Web en Puerto Rico", "Implementación de CRM en Puerto Rico", etc. ≤ 60 / ≤ 160 caracteres. |
| **hreflang** | Cada página enlaza su versión en el otro idioma (`es` / `en` / `x-default`), en el `<head>` y en el sitemap. |
| **Datos estructurados** | `ProfessionalService` con teléfono, correo y `areaServed` (Puerto Rico + San Juan, Guaynabo, Bayamón, Carolina, Caguas, Dorado, Ponce, Mayagüez, Arecibo), `Service`, `FAQPage` y `BreadcrumbList` en cada servicio. |
| **Contenido real** | Cada servicio: qué incluye, para quién es, cómo trabajamos, proyectos reales relacionados y 5 preguntas frecuentes. |
| **Enlaces internos** | Navbar, footer (los 6 servicios en cada página), "otros servicios" al pie de cada servicio, breadcrumbs, y la portada enlaza cada servicio. |
| **Sitemap** | `https://cftservicespr.com/sitemap.xml`, generado en cada build. |
| **Leads con origen** | El formulario envía `page` al webhook de Make, así sabes desde qué página de servicio llegó cada cliente. |

## 2. Lo que tienes que hacer tú (en orden de impacto)

### A. Google Business Profile — lo más importante para "San Juan"

El "map pack" (los 3 negocios con mapa arriba de los resultados) sale de
Google Business Profile, no de la página web.

1. Crea o reclama el perfil en <https://business.google.com>.
2. Si no recibes clientes en un local, configúralo como **negocio de área de
   servicio**: oculta la dirección y pon como áreas San Juan, Guaynabo,
   Bayamón, Carolina, etc. (igual que `src/lib/site.ts`).
3. Categoría principal: *Diseñador de sitios web*. Secundarias: *Servicio de
   consultoría informática*, *Desarrollador de software*, *Agencia de
   marketing* (solo si aplica).
4. Nombre, teléfono y web **idénticos** al sitio: `CFT Services`,
   `787-218-2447`, `https://cftservicespr.com/es/`.
5. Añade cada servicio con su descripción y enlace a su página
   (`/es/servicios/...`).
6. Sube fotos reales (equipo, trabajo, eventos) y publica una actualización
   al mes, por ejemplo un proyecto lanzado.

> **Si tienes una dirección física** en San Juan, dímelo: se añade a
> `src/lib/site.ts` y al schema (`streetAddress`, `addressLocality`,
> `postalCode`, `geo`). Ahora mismo solo dice "Puerto Rico" porque no la
> tenemos. Nunca inventes una dirección: Google suspende perfiles por eso.

### B. Reseñas

Son el factor #1 del map pack después de la cercanía. Pídele una reseña en
Google a cada cliente satisfecho: Masterspace, Clínica Dorsal, MAC Educando,
Clínica Libélula, Titi Amanda. Un enlace directo para reseñar sale del
perfil de Business Profile. Responde todas.

### C. Google Search Console

1. Verifica `cftservicespr.com` como propiedad de dominio (registro DNS TXT).
2. Envía `https://cftservicespr.com/sitemap.xml`.
3. Pide indexación de `/es/` y de las 6 páginas `/es/servicios/...`.
4. Revisa en 2–4 semanas: *Rendimiento → Consultas* para ver por qué
   búsquedas apareces.
5. Las URLs viejas `/?lang=es` se redirigen solas a `/es/`; Google las
   dejará de mostrar con el tiempo.

### D. Citas y enlaces (NAP consistente)

Mismo nombre, teléfono y web en todos lados:

- Instagram (bio con enlace a `/es/`), Facebook, LinkedIn de la empresa
- Directorios: Bing Places, Apple Business Connect, Yelp, Páginas Amarillas PR
- Cámara de Comercio de PR / asociaciones de la industria si eres miembro
- **Pide a tus clientes un enlace "Sitio por CFT Services"** en el footer de
  sus páginas (Masterspace, Clínica Dorsal, MAC Educando, Libélula, Titi
  Amanda). Enlaces de negocios locales reales pesan mucho.

### E. Contenido (mes 2 en adelante)

Lo próximo que más ayudaría, en este orden:

1. **Páginas de caso de estudio** por proyecto (`/es/proyectos/clinica-dorsal/`):
   el problema, lo que se hizo y el resultado. Captan búsquedas como
   "página web para clínica en Puerto Rico".
2. **Páginas por industria** donde haya trabajo real que mostrar: salud,
   construcción, educación.
3. **Artículos que contestan preguntas reales**: "¿Cuánto cuesta una página
   web en Puerto Rico?", "Zoho vs HubSpot para pymes en PR",
   "Cómo automatizar reportes de ATH Móvil y Clover".

No crees páginas por pueblo ("diseño web en Bayamón", "diseño web en
Caguas"…) con el mismo texto cambiando el nombre: Google las trata como
*doorway pages* y penaliza el sitio entero. San Juan y el resto de la isla ya
están cubiertos en el contenido y en el schema.

## 3. Cómo medir

| Qué | Dónde | Cuándo |
|-----|-------|--------|
| Páginas indexadas | Search Console → Páginas | Semana 1–2 |
| Impresiones / clics por consulta | Search Console → Rendimiento | Mensual |
| Llamadas, visitas web, direcciones | Business Profile → Rendimiento | Mensual |
| Leads por página de servicio | Campo `page` en el webhook de Make | Por lead |

El SEO local tarda: espera movimiento en 4–8 semanas y resultados sólidos en
3–6 meses, más rápido cuanto antes estén el perfil de Google y las reseñas.
