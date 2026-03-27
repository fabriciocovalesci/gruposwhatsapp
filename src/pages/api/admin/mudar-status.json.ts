import type { APIRoute } from 'astro';
import { enviarEmailNotificacao } from '~/lib/email';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { id, status, email, nome } = await request.json();

        if (!id || !status) {
            return new Response(JSON.stringify({ error: "Dados incompletos" }), { status: 400 });
        }

        // A atualização no Firestore já foi feita pelo client (PainelAdmin.astro).
        // Aqui enviamos apenas a notificação por e-mail, caso exista o e-mail:
        if (email) {
            console.log(`Enviando notificação para ${email} (status: ${status})`);
            await enviarEmailNotificacao(status, email, nome || 'Grupo de WhatsApp');
        }

        return new Response(JSON.stringify({
            success: true,
            message: `Email processado.`
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (e: any) {
        console.error('Erro na API de status:', e);
        return new Response(JSON.stringify({ error: e.message || "Erro interno" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
