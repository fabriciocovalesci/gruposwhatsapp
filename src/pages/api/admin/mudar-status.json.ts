import type { APIRoute } from 'astro';
import { enviarEmailNotificacao } from '~/lib/email';
import { getGrupoById, atualizarStatus } from '~/lib/grupos';

export const POST: APIRoute = async ({ request }) => {
    try {
        const { id, status } = await request.json();

        if (!id || !status) {
            return new Response(JSON.stringify({ error: "Dados incompletos" }), { status: 400 });
        }

        // 1. Busca dados do grupo para pegar o e-mail
        const grupo = await getGrupoById(id);
        if (!grupo) {
            return new Response(JSON.stringify({ error: "Grupo não encontrado" }), { status: 404 });
        }

        // 2. Atualiza o status no Firestore
        await atualizarStatus(id, status);

        // 3. Notifica o usuário por e-mail se houver e-mail cadastrado
        if (grupo.email) {
            console.log(`Enviando notificação para ${grupo.email}`);
            await enviarEmailNotificacao(status, grupo.email, grupo.nome);
        }

        return new Response(JSON.stringify({
            success: true,
            message: `Grupo ${status === 'aprovado' ? 'aprovado' : 'rejeitado'} e usuário notificado.`
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
