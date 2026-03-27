const BREVO_API_KEY = import.meta.env.BREVO_API_KEY || (typeof process !== 'undefined' ? process.env.BREVO_API_KEY : '');

export async function enviarEmailNotificacao(status: 'aprovado' | 'rejeitado' | 'recebido', paraEmail: string, nomeGrupo: string) {
    if (!paraEmail || !BREVO_API_KEY) {
        console.warn('Falta email ou API Key do Brevo', { paraEmail, hasApiKey: !!BREVO_API_KEY });
        return;
    }

    const isAprovado = status === 'aprovado';
    const isRecebido = status === 'recebido';

    let assunto = '';
    if (isRecebido) {
        assunto = `📩 Recebemos seu grupo "${nomeGrupo}" para análise`;
    } else if (isAprovado) {
        assunto = `✅ Boas notícias! Seu grupo "${nomeGrupo}" foi aprovado`;
    } else {
        assunto = `⚠️ Atualização sobre seu grupo "${nomeGrupo}"`;
    }

    const html = `
    <div style="font-family: 'Inter', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a; background-color: #f9fafb;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e5e7eb;">
            <div style="margin-bottom: 32px; text-align: center;">
                <h1 style="color: #028b3a; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.025em;">gruposwhatsapp.online</h1>
            </div>
            
            <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 24px; color: #111827;">Olá!</h2>
            
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 24px;">
                Temos uma atualização sobre o grupo <strong>"${nomeGrupo}"</strong> que você enviou ao nosso diretório.
            </p>

            ${isRecebido ? `
            <div style="background-color: #f0fdf4; border: 1px solid #dcfce7; padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                <p style="font-size: 16px; font-weight: 600; color: #166534; margin: 0;">
                    ⏳ Seu grupo foi RECEBIDO com sucesso e está na nossa fila de moderação!
                </p>
            </div>
            <p style="font-size: 15px; color: #6b7280; margin-bottom: 32px;">
                Nossa equipe analisará se as regras estão sendo cumpridas. Em breve, você receberá um novo e-mail com o status final (Aprovado ou Rejeitado).
            </p>
            ` : `
            <div style="background-color: ${isAprovado ? '#f0fdf4' : '#fef2f2'}; border: 1px solid ${isAprovado ? '#dcfce7' : '#fee2e2'}; padding: 24px; border-radius: 16px; margin-bottom: 32px;">
                <p style="font-size: 16px; font-weight: 600; color: ${isAprovado ? '#166534' : '#991b1b'}; margin: 0;">
                    ${isAprovado
            ? '✨ Seu grupo foi APROVADO e já está disponível para milhares de usuários!'
            : '❌ Infelizmente seu grupo não foi aprovado na nossa moderação.'}
                </p>
            </div>

            ${isAprovado ? `
            <p style="font-size: 15px; color: #6b7280; margin-bottom: 32px;">
                Seu link agora está ativo em nossa plataforma. Recomendamos que você acompanhe as estatísticas e mantenha seu link sempre atualizado.
            </p>
            <div style="text-align: center;">
                <a href="https://gruposwhatsapp.online/meus-grupos" style="display: inline-block; background-color: #028b3a; color: #ffffff; padding: 16px 32px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 16px;">Ver Meus Grupos</a>
            </div>
            ` : `
            <p style="font-size: 15px; color: #6b7280; margin-bottom: 24px;">
                Certifique-se de que o grupo cumpre todas as nossas regras (não permitido conteúdo adulto, links quebrados ou agressividade) e tente enviá-lo novamente no futuro.
            </p>
            `}
            `}

            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 40px 0;">
            
            <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
                Atenciosamente,<br>
                <strong>Equipe gruposwhatsapp.online</strong>
            </p>
        </div>
        
        <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 24px;">
            Este é um e-mail automático enviado pelo sistema de moderação.<br>
            Suporte: <a href="mailto:suporte@gruposwhatsapp.online" style="color: #028b3a; text-decoration: none;">suporte@gruposwhatsapp.online</a>
        </p>
    </div>
    `;

    try {
        console.log(`Enviando email de ${status} para: ${paraEmail}`);
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': BREVO_API_KEY,
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                sender: {
                    name: "Suporte Grupos WhatsApp",
                    email: "suporte@gruposwhatsapp.online"
                },
                to: [{ email: paraEmail }],
                subject: assunto,
                htmlContent: html,
            })
        });

        if (!response.ok) {
            const err = await response.json();
            console.error('Brevo Error:', err);
        } else {
            console.log(`Email de ${status} enviado com sucesso para ${paraEmail}!`);
        }
    } catch (e) {
        console.error('Email Fail:', e);
    }
}
