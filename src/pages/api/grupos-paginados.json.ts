import type { APIRoute } from 'astro';
import { getGruposPaginados } from '~/lib/grupos';

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const lastId = url.searchParams.get('lastId') || undefined;
    const limitNum = parseInt(url.searchParams.get('limit') || '10');

    try {
        const result = await getGruposPaginados(limitNum, lastId);

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Erro ao buscar grupos paginados:', error);
        return new Response(JSON.stringify({ error: 'Erro interno' }), { status: 500 });
    }
};
