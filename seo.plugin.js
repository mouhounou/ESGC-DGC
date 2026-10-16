// Plugin Vite : SEO, AEO (moteurs de réponse) et GEO (moteurs génératifs + géolocalisation).
// Tout est généré au build à partir de src/data/content.js pour rester synchronisé avec le site.
import { SITE_URL, ecole, formationsTexte, faq } from './src/data/content.js'

const TITLE = "ESGC Pointe-Noire | École Supérieure de Commerce et de Gestion"
const DESCRIPTION =
   "ESGC, école de commerce et de gestion à Pointe-Noire (Congo) depuis plus de 20 ans : comptabilité, RH, banque et assurance, relation client digitale, logistique et commerce international."
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const adresse = {
   '@type': 'PostalAddress',
   streetAddress: ecole.adresse.rue,
   addressLocality: ecole.adresse.ville,
   addressRegion: ecole.adresse.region,
   addressCountry: ecole.adresse.pays,
}

function jsonLd() {
   const org = `${SITE_URL}/#ecole`
   return {
      '@context': 'https://schema.org',
      '@graph': [
         { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, url: `${SITE_URL}/`, name: ecole.sigle, inLanguage: 'fr' },
         {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#page`,
            url: `${SITE_URL}/`,
            name: TITLE,
            description: DESCRIPTION,
            inLanguage: 'fr',
            isPartOf: { '@id': `${SITE_URL}/#site` },
            about: { '@id': org },
            primaryImageOfPage: OG_IMAGE,
         },
         {
            '@type': ['CollegeOrUniversity', 'LocalBusiness'],
            '@id': org,
            name: ecole.nom,
            alternateName: ecole.sigle,
            description: ecole.description,
            url: `${SITE_URL}/`,
            logo: `${SITE_URL}/logo512.png`,
            image: OG_IMAGE,
            email: ecole.email,
            telephone: ecole.telephones.map((t) => t.numero),
            address: adresse,
            geo: { '@type': 'GeoCoordinates', latitude: ecole.geo.latitude, longitude: ecole.geo.longitude },
            areaServed: { '@type': 'Country', name: ecole.adresse.paysNom },
            openingHoursSpecification: ecole.horaires.map((h) => ({
               '@type': 'OpeningHoursSpecification',
               dayOfWeek: h.schema,
               opens: h.ouverture,
               closes: h.fermeture,
            })),
            contactPoint: ecole.telephones.map((t) => ({
               '@type': 'ContactPoint',
               contactType: t.libelle,
               telephone: t.numero,
               email: ecole.email,
               availableLanguage: 'French',
            })),
            parentOrganization: { '@type': 'Organization', name: ecole.groupe },
            sameAs: ecole.reseaux,
         },
         ...formationsTexte.map((f) => ({
            '@type': 'Course',
            '@id': `${SITE_URL}/#${f.id}`,
            name: f.titre,
            description: f.description,
            teaches: f.modules,
            inLanguage: 'fr',
            provider: { '@id': org },
            hasCourseInstance: { '@type': 'CourseInstance', courseMode: 'Onsite', location: { '@type': 'Place', name: ecole.nom, address: adresse } },
         })),
         {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}/#faq`,
            mainEntity: faq.map((q) => ({
               '@type': 'Question',
               name: q.question,
               acceptedAnswer: { '@type': 'Answer', text: q.reponse },
            })),
         },
      ],
   }
}

function headTags() {
   const { latitude, longitude } = ecole.geo
   return `
    <title>${esc(TITLE)}</title>
    <meta name="description" content="${esc(DESCRIPTION)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
    <link rel="canonical" href="${SITE_URL}/" />
    <meta name="theme-color" content="#173a5e" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/logo192.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="fr_CG" />
    <meta property="og:site_name" content="${esc(ecole.sigle)} – ${esc(ecole.groupe)}" />
    <meta property="og:title" content="${esc(TITLE)}" />
    <meta property="og:description" content="${esc(DESCRIPTION)}" />
    <meta property="og:url" content="${SITE_URL}/" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${esc(ecole.nom)}, Pointe-Noire" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(TITLE)}" />
    <meta name="twitter:description" content="${esc(DESCRIPTION)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />

    <meta name="geo.region" content="CG-16" />
    <meta name="geo.placename" content="${esc(ecole.adresse.ville)}, ${esc(ecole.adresse.paysNom)}" />
    <meta name="geo.position" content="${latitude};${longitude}" />
    <meta name="ICBM" content="${latitude}, ${longitude}" />

    <link rel="alternate" type="text/plain" title="Résumé pour les IA" href="/llms.txt" />
    <script type="application/ld+json">${JSON.stringify(jsonLd()).replace(/</g, '\\u003c')}</script>`
}

// Contenu HTML statique dans #root : lu par les robots qui n'exécutent pas JavaScript,
// remplacé par l'application React dès son chargement.
function fallbackHtml() {
   const li = (items) => items.map((x) => `<li>${esc(x)}</li>`).join('')
   return `
      <div style="font-family:system-ui,sans-serif;max-width:760px;margin:0 auto;padding:32px 20px;color:#0e2432;line-height:1.6">
        <h1>${esc(ecole.nom)} (${esc(ecole.sigle)})</h1>
        <p>${esc(ecole.description)}</p>
        <h2>Nos formations</h2>
        ${formationsTexte.map((f) => `<h3>${esc(f.titre)}</h3><p>${esc(f.description)}</p><p>Modules :</p><ul>${li(f.modules)}</ul><p>Débouchés :</p><ul>${li(f.debouches)}</ul>`).join('')}
        <h2>Questions fréquentes</h2>
        ${faq.map((q) => `<h3>${esc(q.question)}</h3><p>${esc(q.reponse)}</p>`).join('')}
        <h2>Contact</h2>
        <address>${esc(ecole.adresse.rue)}, ${esc(ecole.adresse.ville)}, ${esc(ecole.adresse.paysNom)}<br>
          ${ecole.telephones.map((t) => `${esc(t.libelle)} : <a href="tel:${t.tel}">${esc(t.numero)}</a>`).join('<br>')}<br>
          Email : <a href="mailto:${ecole.email}">${ecole.email}</a></address>
      </div>`
}

function llmsTxt() {
   return `# ${ecole.nom} (${ecole.sigle})

> ${ecole.description}

- Site : ${SITE_URL}/
- Établissement du ${ecole.groupe}
- Adresse : ${ecole.adresse.rue}, ${ecole.adresse.ville}, ${ecole.adresse.paysNom}
- Téléphone : ${ecole.telephones.map((t) => `${t.numero} (${t.libelle})`).join(', ')}
- Email : ${ecole.email}
- Horaires : ${ecole.horaires.map((h) => `${h.jours} ${h.ouverture}-${h.fermeture}`).join(', ')}

## Formations

${formationsTexte.map((f) => `### ${f.titre}\n\n${f.description}\n\n- Modules : ${f.modules.join(' ; ')}\n- Débouchés : ${f.debouches.join(', ')}\n- Secteurs employeurs : ${f.secteurs_employeurs.join(', ')}`).join('\n\n')}

## Questions fréquentes

${faq.map((q) => `### ${q.question}\n\n${q.reponse}`).join('\n\n')}

## Pages

- [Formations](${SITE_URL}/#filiere)
- [Débouchés](${SITE_URL}/#debouches)
- [FAQ](${SITE_URL}/#faq)
- [Contact](${SITE_URL}/#contact)
`
}

const robotsTxt = () => `# Moteurs de recherche et assistants IA autorisés
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`

const sitemapXml = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image><image:loc>${OG_IMAGE}</image:loc></image:image>
  </url>
</urlset>
`

const manifest = () =>
   JSON.stringify(
      {
         name: ecole.nom,
         short_name: ecole.sigle,
         lang: 'fr',
         start_url: '/',
         display: 'standalone',
         background_color: '#ffffff',
         theme_color: '#173a5e',
         icons: [
            { src: '/logo192.png', sizes: '192x192', type: 'image/png' },
            { src: '/logo512.png', sizes: '512x512', type: 'image/png' },
         ],
      },
      null,
      2,
   )

export default function seo() {
   return {
      name: 'esgc-seo',
      transformIndexHtml(html) {
         return html
            .replace('<!-- seo:head -->', headTags())
            .replace('<div id="root"></div>', `<div id="root">${fallbackHtml()}</div>`)
      },
      generateBundle() {
         const files = { 'robots.txt': robotsTxt(), 'sitemap.xml': sitemapXml(), 'llms.txt': llmsTxt(), 'site.webmanifest': manifest() }
         for (const [fileName, source] of Object.entries(files)) this.emitFile({ type: 'asset', fileName, source })
      },
   }
}
