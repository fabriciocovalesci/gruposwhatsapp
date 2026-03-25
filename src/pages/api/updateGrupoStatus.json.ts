import type { APIRoute } from 'astro';
import { atualizarStatus } from '~/lib/grupos';

export const POST: APIRoute = async ({ request }) => {
    try {
        // Check Content-Type
        if (request.headers.get("Content-Type") !== "application/json") {
            return new Response(JSON.stringify({ error: 'Content-Type must be application/json' }), { status: 400 });
        }

        const body = await request.json();
        const { id, status } = body;

        if (!id) {
            return new Response(JSON.stringify({ error: 'Faltando o ID do grupo' }), { status: 400 });
        }

        if (!status || !['aprovado', 'rejeitado'].includes(status)) {
            return new Response(JSON.stringify({ error: 'Status inválido para atualização' }), { status: 400 });
        }

        await atualizarStatus(id, status);

        return new Response(JSON.stringify({ success: true, id, status }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar status do grupo:', error);
        return new Response(JSON.stringify({ error: 'Erro interno ao atualizar o status' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
