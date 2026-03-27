import type { APIRoute } from 'astro';
import * as cheerio from 'cheerio';

export const GET: APIRoute = async ({ url }) => {
    const targetUrl = url.searchParams.get('url');

    if (!targetUrl) {
        return new Response(JSON.stringify({ success: false, error: "Link não fornecido." }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao acessar WhatsApp: ${response.status}`);
        }

        const html = await response.text();
        const $ = cheerio.load(html);

        // Extrai dados usando os seletores do WhatsApp (ou os fornecidos pelo usuário)
        const name = $('h3._9vd5._9scr').text().trim() || $('h1').first().text().trim() || $('title').text().split('-')[0].trim();
        const image = $('#main_block img[src*="pps.whatsapp.net"]').attr('src') || $('img').first().attr('src') || "";
        const description = $('div._9vd6._9scs').text().trim() || "";

        if (!name || name.toLowerCase().includes("whatsapp")) {
            // Fallback se os seletores específicos falharem (WhatsApp muda as classes as vezes)
            return new Response(JSON.stringify({ status: "error", error: "Grupo não encontrado ou link privado." }), {
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({
            status: "active",
            name: name,
            thumb: image,
            description: description
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e) {
        return new Response(JSON.stringify({ status: "error", error: "Não foi possível validar o link." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
