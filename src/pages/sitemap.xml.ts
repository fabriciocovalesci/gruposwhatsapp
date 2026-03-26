import type { APIRoute } from 'astro';
import { getGruposAprovados, todasCategorias } from '~/lib/grupos';

export const GET: APIRoute = async () => {
    const siteUrl = 'https://gruposwhatsapp.online';
    const grupos = await getGruposAprovados();

    const pages = [
        '',
        '/categorias',
        '/enviar-grupo',
    ];

    const categoryPages = todasCategorias.map(c => `/categorias/${c.slug}`);
    const groupPages = grupos.map(g => `/grupo/${g.id}`);

    const allPages = [...pages, ...categoryPages, ...groupPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
  <url>
    <loc>${siteUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
};
