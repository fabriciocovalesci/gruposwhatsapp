import type { APIRoute } from 'astro';
import { getGruposPorStatus } from '~/lib/grupos';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const statusParam = url.searchParams.get('status');

    if (!statusParam || !['pendente', 'aprovado', 'rejeitado'].includes(statusParam)) {
        return new Response(JSON.stringify({ error: 'Status inválido. Use pendente, aprovado ou rejeitado.' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    try {
        const grupos = await getGruposPorStatus(statusParam);

        return new Response(JSON.stringify(grupos), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Erro ao buscar grupos:', error);
        return new Response(JSON.stringify({ error: 'Erro interno ao buscar grupos' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
