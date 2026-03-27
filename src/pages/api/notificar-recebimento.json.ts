import type { APIRoute } from 'astro';
import { enviarEmailNotificacao } from '~/lib/email';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { email, nome } = await request.json();

        if (!email || !nome) {
            return new Response(JSON.stringify({ error: "Dados incompletos" }), { status: 400 });
        }

        await enviarEmailNotificacao('recebido', email, nome);

        return new Response(JSON.stringify({ success: true, message: 'Email de recebimento enviado' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e: any) {
        console.error('Erro ao enviar email de recebimento:', e);
        return new Response(JSON.stringify({ error: e.message || "Erro interno" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
