import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Privacidade = () => {
  return (
    <>
      <SEO
        title="Política de Privacidade | Andorinha Marketing"
        description="Conheça nossa política de privacidade e como tratamos seus dados pessoais em conformidade com a LGPD."
        keywords="política de privacidade, LGPD, proteção de dados, privacidade"
        url="https://andorinha.roilabs.com.br/privacidade"
      />

      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 bg-gradient-to-b from-background to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Política de Privacidade
              </h1>
              <p className="text-xl text-muted-foreground">
                Última atualização: 19 de novembro de 2025
              </p>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto prose prose-lg">

              {/* Introdução */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  1. Introdução
                </h2>
                <p className="text-muted-foreground mb-4">
                  A Andorinha Marketing ("nós", "nosso" ou "empresa") está comprometida em proteger
                  a privacidade dos visitantes do nosso site e clientes. Esta Política de Privacidade
                  explica como coletamos, usamos, armazenamos e protegemos suas informações pessoais
                  em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
                <p className="text-muted-foreground">
                  Ao utilizar nosso site ou contratar nossos serviços, você concorda com as práticas
                  descritas nesta política.
                </p>
              </div>

              {/* Dados Coletados */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  2. Dados que Coletamos
                </h2>
                <p className="text-muted-foreground mb-4">
                  Coletamos os seguintes tipos de dados pessoais:
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2.1 Dados fornecidos por você:
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Nome completo</li>
                  <li>Endereço de e-mail</li>
                  <li>Número de telefone</li>
                  <li>Nome da empresa</li>
                  <li>Informações sobre seu negócio e necessidades de marketing</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  2.2 Dados coletados automaticamente:
                </h3>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Endereço IP</li>
                  <li>Tipo de navegador e dispositivo</li>
                  <li>Páginas visitadas e tempo de permanência</li>
                  <li>Data e hora de acesso</li>
                  <li>Origem do tráfego (como você chegou ao nosso site)</li>
                </ul>
              </div>

              {/* Como Usamos */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  3. Como Usamos Seus Dados
                </h2>
                <p className="text-muted-foreground mb-4">
                  Utilizamos seus dados pessoais para as seguintes finalidades:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Responder às suas solicitações de contato e orçamento</li>
                  <li>Prestar os serviços contratados</li>
                  <li>Enviar comunicações sobre nossos serviços (quando autorizado)</li>
                  <li>Melhorar nosso site e experiência do usuário</li>
                  <li>Analisar o desempenho das nossas campanhas</li>
                  <li>Cumprir obrigações legais e regulatórias</li>
                </ul>
              </div>

              {/* Compartilhamento */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  4. Compartilhamento de Dados
                </h2>
                <p className="text-muted-foreground mb-4">
                  Não vendemos, alugamos ou comercializamos seus dados pessoais. Podemos compartilhar
                  suas informações apenas nas seguintes situações:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Prestadores de serviço:</strong> Empresas que nos auxiliam na operação
                    do site e prestação de serviços (hospedagem, e-mail marketing, analytics)
                  </li>
                  <li>
                    <strong>Obrigações legais:</strong> Quando exigido por lei, ordem judicial ou
                    autoridade competente
                  </li>
                  <li>
                    <strong>Proteção de direitos:</strong> Para proteger nossos direitos,
                    propriedade ou segurança
                  </li>
                </ul>
              </div>

              {/* Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  5. Cookies e Tecnologias de Rastreamento
                </h2>
                <p className="text-muted-foreground mb-4">
                  Utilizamos cookies e tecnologias similares para:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                  <li>Manter você conectado durante a navegação</li>
                  <li>Lembrar suas preferências</li>
                  <li>Analisar o tráfego e comportamento no site</li>
                  <li>Medir a eficácia das campanhas de marketing</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  <strong>Tipos de cookies que utilizamos:</strong>
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Cookies essenciais:</strong> Necessários para o funcionamento do site
                  </li>
                  <li>
                    <strong>Cookies de análise:</strong> Google Analytics para entender o uso do site
                  </li>
                  <li>
                    <strong>Cookies de marketing:</strong> Para campanhas publicitárias direcionadas
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Você pode gerenciar suas preferências de cookies através do banner exibido em sua
                  primeira visita ou nas configurações do seu navegador.
                </p>
              </div>

              {/* Direitos LGPD */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  6. Seus Direitos (LGPD)
                </h2>
                <p className="text-muted-foreground mb-4">
                  De acordo com a LGPD, você tem os seguintes direitos:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>Confirmação e acesso:</strong> Saber se tratamos seus dados e acessá-los
                  </li>
                  <li>
                    <strong>Correção:</strong> Solicitar a correção de dados incompletos ou incorretos
                  </li>
                  <li>
                    <strong>Anonimização ou eliminação:</strong> Solicitar a anonimização ou exclusão
                    de dados desnecessários
                  </li>
                  <li>
                    <strong>Portabilidade:</strong> Receber seus dados em formato estruturado
                  </li>
                  <li>
                    <strong>Revogação do consentimento:</strong> Retirar seu consentimento a qualquer momento
                  </li>
                  <li>
                    <strong>Oposição:</strong> Opor-se ao tratamento de dados
                  </li>
                  <li>
                    <strong>Informação:</strong> Saber com quem compartilhamos seus dados
                  </li>
                </ul>
              </div>

              {/* Como Exercer Direitos */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  7. Como Exercer Seus Direitos
                </h2>
                <p className="text-muted-foreground mb-4">
                  Para exercer qualquer um dos seus direitos, entre em contato conosco através de:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>
                    <strong>E-mail:</strong>{" "}
                    <a href="mailto:privacidade@andorinha.roilabs.com.br" className="text-primary hover:underline">
                      privacidade@andorinha.roilabs.com.br
                    </a>
                  </li>
                  <li>
                    <strong>Formulário:</strong>{" "}
                    <a href="/contato" className="text-primary hover:underline">
                      Página de Contato
                    </a>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  Responderemos sua solicitação em até 15 dias úteis, conforme previsto na LGPD.
                </p>
              </div>

              {/* Segurança */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  8. Segurança dos Dados
                </h2>
                <p className="text-muted-foreground">
                  Implementamos medidas técnicas e organizacionais apropriadas para proteger seus
                  dados pessoais contra acesso não autorizado, perda, destruição ou alteração.
                  Isso inclui criptografia SSL, controle de acesso restrito e backups regulares.
                  No entanto, nenhum método de transmissão pela internet é 100% seguro.
                </p>
              </div>

              {/* Retenção */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  9. Retenção de Dados
                </h2>
                <p className="text-muted-foreground">
                  Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as
                  finalidades para as quais foram coletados, incluindo obrigações legais,
                  contratuais e regulatórias. Dados de leads são mantidos por até 2 anos após
                  o último contato. Dados de clientes são mantidos por 5 anos após o término
                  do contrato, conforme legislação fiscal.
                </p>
              </div>

              {/* Menores */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  10. Dados de Menores
                </h2>
                <p className="text-muted-foreground">
                  Nossos serviços são destinados a empresas e profissionais maiores de 18 anos.
                  Não coletamos intencionalmente dados de menores de idade. Se tomarmos
                  conhecimento de que coletamos dados de um menor, excluiremos essas informações
                  imediatamente.
                </p>
              </div>

              {/* Alterações */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  11. Alterações nesta Política
                </h2>
                <p className="text-muted-foreground">
                  Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos
                  alterações significativas, notificaremos você através do site ou por e-mail.
                  Recomendamos revisar esta página regularmente para se manter informado sobre
                  como protegemos seus dados.
                </p>
              </div>

              {/* Contato */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  12. Contato
                </h2>
                <p className="text-muted-foreground mb-4">
                  Se você tiver dúvidas sobre esta Política de Privacidade ou sobre o tratamento
                  dos seus dados, entre em contato:
                </p>
                <div className="bg-muted/50 p-6 rounded-lg">
                  <p className="text-foreground font-semibold mb-2">
                    Andorinha Marketing
                  </p>
                  <p className="text-muted-foreground">
                    E-mail:{" "}
                    <a href="mailto:contato@andorinha.roilabs.com.br" className="text-primary hover:underline">
                      contato@andorinha.roilabs.com.br
                    </a>
                  </p>
                  <p className="text-muted-foreground">
                    WhatsApp:{" "}
                    <a href="https://wa.me/5511999999999" className="text-primary hover:underline">
                      (11) 99999-9999
                    </a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Privacidade;
