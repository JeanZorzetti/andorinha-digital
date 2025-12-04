/**
 * Email Service
 *
 * Sistema de envio de emails transacionais usando Resend API
 */

import { Resend } from 'resend';

// Inicializar cliente Resend
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// Email padrão do remetente
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@andorinha.com.br';
const FROM_NAME = 'Andorinha Digital';

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

/**
 * Envia um email usando Resend API
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendEmailOptions): Promise<{ success: boolean; id?: string; error?: string }> {
  // Validar se o Resend está configurado
  if (!resend) {
    console.warn('⚠️ Resend API key not configured. Email not sent.');
    return {
      success: false,
      error: 'Email service not configured',
    };
  }

  try {
    const response = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      text,
      replyTo,
    });

    if (response.error) {
      console.error('❌ Error sending email:', response.error);
      return {
        success: false,
        error: response.error.message,
      };
    }

    console.log('✅ Email sent successfully:', response.data?.id);
    return {
      success: true,
      id: response.data?.id,
    };
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Templates de email pré-definidos
 */
export const EmailTemplates = {
  /**
   * Email de boas-vindas para novo usuário
   */
  welcome: (name: string, email: string, temporaryPassword?: string) => ({
    subject: 'Bem-vindo à Andorinha Digital',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .button { display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .credentials { background: #fff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 Bem-vindo à Andorinha Digital!</h1>
            </div>
            <div class="content">
              <p>Olá <strong>${name}</strong>,</p>
              <p>Sua conta foi criada com sucesso! Estamos felizes em tê-lo(a) conosco.</p>

              ${temporaryPassword ? `
                <div class="credentials">
                  <h3>Suas credenciais de acesso:</h3>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Senha temporária:</strong> ${temporaryPassword}</p>
                  <p style="color: #dc2626; font-size: 14px;">⚠️ Por favor, altere sua senha no primeiro login.</p>
                </div>
              ` : ''}

              <p>Você já pode acessar o painel administrativo:</p>
              <a href="${process.env.NEXTAUTH_URL}/admin" class="button">Acessar Painel</a>

              <p>Se você tiver alguma dúvida, não hesite em nos contatar.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Andorinha Digital. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Bem-vindo à Andorinha Digital, ${name}!\n\nSua conta foi criada com sucesso.\n\n${temporaryPassword ? `Credenciais:\nEmail: ${email}\nSenha temporária: ${temporaryPassword}\n\n⚠️ Por favor, altere sua senha no primeiro login.\n\n` : ''}Acesse o painel: ${process.env.NEXTAUTH_URL}/admin`,
  }),

  /**
   * Email de confirmação de alteração de senha
   */
  passwordChanged: (name: string) => ({
    subject: 'Senha alterada com sucesso',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #10b981; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .alert { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Senha Alterada</h1>
            </div>
            <div class="content">
              <p>Olá <strong>${name}</strong>,</p>
              <p>Sua senha foi alterada com sucesso.</p>

              <div class="alert">
                <p><strong>⚠️ Você não fez esta alteração?</strong></p>
                <p>Se você não solicitou esta mudança, entre em contato com nossa equipe imediatamente.</p>
              </div>

              <p>Data e hora: ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Andorinha Digital. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Olá ${name},\n\nSua senha foi alterada com sucesso.\n\n⚠️ Você não fez esta alteração? Entre em contato conosco imediatamente.\n\nData e hora: ${new Date().toLocaleString('pt-BR')}`,
  }),

  /**
   * Email de notificação de mudança de role
   */
  roleChanged: (name: string, oldRole: string, newRole: string) => ({
    subject: 'Suas permissões foram atualizadas',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #8b5cf6; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9fafb; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .role-change { background: #fff; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; margin: 15px 0; text-align: center; }
            .role { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 0 10px; }
            .old-role { background: #fecaca; color: #991b1b; }
            .new-role { background: #bbf7d0; color: #166534; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Permissões Atualizadas</h1>
            </div>
            <div class="content">
              <p>Olá <strong>${name}</strong>,</p>
              <p>Suas permissões no sistema foram atualizadas por um administrador.</p>

              <div class="role-change">
                <span class="role old-role">${oldRole}</span>
                <span>→</span>
                <span class="role new-role">${newRole}</span>
              </div>

              <p>Suas novas permissões estão ativas a partir de agora.</p>
              <p>Data e hora: ${new Date().toLocaleString('pt-BR')}</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Andorinha Digital. Todos os direitos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `Olá ${name},\n\nSuas permissões foram atualizadas:\n${oldRole} → ${newRole}\n\nData e hora: ${new Date().toLocaleString('pt-BR')}`,
  }),
};

/**
 * Helpers para envio de emails específicos
 */
export const EmailHelpers = {
  sendWelcomeEmail: async (
    email: string,
    name: string,
    temporaryPassword?: string
  ) => {
    const template = EmailTemplates.welcome(name, email, temporaryPassword);
    return sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  },

  sendPasswordChangedEmail: async (email: string, name: string) => {
    const template = EmailTemplates.passwordChanged(name);
    return sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  },

  sendRoleChangedEmail: async (
    email: string,
    name: string,
    oldRole: string,
    newRole: string
  ) => {
    const template = EmailTemplates.roleChanged(name, oldRole, newRole);
    return sendEmail({
      to: email,
      subject: template.subject,
      html: template.html,
      text: template.text,
    });
  },
};
