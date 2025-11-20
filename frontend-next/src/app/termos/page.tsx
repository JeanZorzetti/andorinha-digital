import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Andorinha Marketing",
  description: "Leia os termos e condições de uso do site da Andorinha Marketing.",
  keywords: "termos de uso, condições, regras, uso do site",
  openGraph: {
    url: "https://andorinha.roilabs.com.br/termos",
  },
};

export default function TermosPage() {
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-background to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Termos de Uso
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
            {/* Aceitação */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Aceitação dos Termos
              </h2>
              <p className="text-muted-foreground mb-4">
                Ao acessar e usar o site da Andorinha Marketing ("Site"), você
                concorda em cumprir e estar vinculado a estes Termos de Uso. Se
                você não concordar com qualquer parte destes termos, não deve
                usar nosso Site.
              </p>
              <p className="text-muted-foreground">
                Estes termos constituem um acordo legal entre você ("Usuário") e
                a Andorinha Marketing ("nós", "nosso" ou "Empresa").
              </p>
            </div>

            {/* Uso do Site */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Uso do Site
              </h2>
              <p className="text-muted-foreground mb-4">
                Você concorda em usar o Site apenas para fins legais e de
                maneira que não infrinja os direitos de terceiros ou restrinja o
                uso do Site por outros.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                2.1 É proibido:
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>
                  Usar o Site de forma que viole leis ou regulamentos aplicáveis
                </li>
                <li>Transmitir vírus, malware ou código malicioso</li>
                <li>
                  Tentar acessar áreas restritas do Site sem autorização
                </li>
                <li>
                  Coletar informações de outros usuários sem consentimento
                </li>
                <li>
                  Usar bots, scrapers ou ferramentas automatizadas não
                  autorizadas
                </li>
                <li>Interferir no funcionamento adequado do Site</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                2.2 Requisitos de idade:
              </h3>
              <p className="text-muted-foreground">
                O Site é destinado a usuários maiores de 18 anos. Ao usar o
                Site, você declara ter capacidade legal para celebrar este
                acordo.
              </p>
            </div>

            {/* Propriedade Intelectual */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Propriedade Intelectual
              </h2>
              <p className="text-muted-foreground mb-4">
                Todo o conteúdo do Site, incluindo textos, gráficos, logos,
                ícones, imagens, vídeos, áudio e software, é de propriedade
                exclusiva da Andorinha Marketing ou de seus licenciadores e está
                protegido por leis de direitos autorais e propriedade
                intelectual.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                3.1 Uso permitido:
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Visualizar e navegar pelo Site para uso pessoal</li>
                <li>Compartilhar links do Site em redes sociais</li>
                <li>Imprimir páginas para referência pessoal</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                3.2 Uso proibido:
              </h3>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Copiar, modificar ou distribuir conteúdo sem autorização
                </li>
                <li>Usar nossa marca ou logo sem permissão expressa</li>
                <li>Remover avisos de direitos autorais ou propriedade</li>
                <li>Criar obras derivadas sem autorização</li>
              </ul>
            </div>

            {/* Serviços */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Serviços e Contratação
              </h2>
              <p className="text-muted-foreground mb-4">
                As informações sobre nossos serviços no Site são de caráter
                informativo. A contratação efetiva de serviços está sujeita a:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Proposta comercial específica para cada projeto</li>
                <li>
                  Contrato de prestação de serviços assinado pelas partes
                </li>
                <li>Termos e condições específicos de cada serviço</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                Os preços exibidos no Site são referenciais e podem variar
                conforme a complexidade e escopo de cada projeto.
              </p>
            </div>

            {/* Limitação de Responsabilidade */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Limitação de Responsabilidade
              </h2>
              <p className="text-muted-foreground mb-4">
                O Site é fornecido "como está" e "conforme disponível". Não
                garantimos que:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>O Site estará sempre disponível ou livre de erros</li>
                <li>
                  Os resultados obtidos pelo uso do Site serão precisos
                </li>
                <li>Defeitos serão corrigidos em prazo determinado</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Na máxima extensão permitida por lei, não seremos responsáveis
                por:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Danos indiretos, incidentais ou consequenciais</li>
                <li>Perda de dados, lucros ou oportunidades de negócio</li>
                <li>Interrupção de negócios ou atividades</li>
                <li>Ações de terceiros, incluindo hackers ou malware</li>
              </ul>
            </div>

            {/* Links Externos */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Links Externos
              </h2>
              <p className="text-muted-foreground mb-4">
                O Site pode conter links para sites de terceiros. Estes links
                são fornecidos apenas para sua conveniência e não implicam
                endosso ou responsabilidade pelo conteúdo desses sites.
              </p>
              <p className="text-muted-foreground">
                Não temos controle sobre o conteúdo, políticas de privacidade ou
                práticas de sites de terceiros e não assumimos responsabilidade
                por eles. Recomendamos que você revise os termos e políticas de
                qualquer site que visitar.
              </p>
            </div>

            {/* Indenização */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Indenização
              </h2>
              <p className="text-muted-foreground">
                Você concorda em indenizar e isentar a Andorinha Marketing, seus
                diretores, funcionários e parceiros de qualquer reclamação,
                dano, perda ou despesa (incluindo honorários advocatícios)
                decorrentes de: (a) seu uso do Site; (b) violação destes Termos;
                (c) violação de direitos de terceiros.
              </p>
            </div>

            {/* Modificações */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Modificações nos Termos
              </h2>
              <p className="text-muted-foreground mb-4">
                Reservamos o direito de modificar estes Termos a qualquer
                momento. As alterações entram em vigor imediatamente após a
                publicação no Site.
              </p>
              <p className="text-muted-foreground">
                O uso continuado do Site após alterações constitui aceitação dos
                novos termos. Recomendamos que você revise esta página
                periodicamente.
              </p>
            </div>

            {/* Rescisão */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Rescisão
              </h2>
              <p className="text-muted-foreground">
                Podemos suspender ou encerrar seu acesso ao Site a qualquer
                momento, sem aviso prévio, se acreditarmos que você violou estes
                Termos ou por qualquer outro motivo a nosso critério. Após a
                rescisão, todas as disposições que por sua natureza devam
                sobreviver continuarão em vigor.
              </p>
            </div>

            {/* Lei Aplicável */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Lei Aplicável e Foro
              </h2>
              <p className="text-muted-foreground mb-4">
                Estes Termos são regidos pelas leis da República Federativa do
                Brasil.
              </p>
              <p className="text-muted-foreground">
                Qualquer disputa relacionada a estes Termos será resolvida no
                foro da comarca de São Paulo, SP, com exclusão de qualquer
                outro, por mais privilegiado que seja.
              </p>
            </div>

            {/* Disposições Gerais */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                11. Disposições Gerais
              </h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  <strong>Acordo integral:</strong> Estes Termos constituem o
                  acordo completo entre você e a Andorinha Marketing
                </li>
                <li>
                  <strong>Renúncia:</strong> A falha em exercer qualquer direito
                  não constitui renúncia a ele
                </li>
                <li>
                  <strong>Divisibilidade:</strong> Se qualquer disposição for
                  considerada inválida, as demais permanecerão em vigor
                </li>
                <li>
                  <strong>Cessão:</strong> Você não pode ceder seus direitos sob
                  estes Termos sem nosso consentimento
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                12. Contato
              </h2>
              <p className="text-muted-foreground mb-4">
                Se você tiver dúvidas sobre estes Termos de Uso, entre em
                contato:
              </p>
              <div className="bg-muted/50 p-6 rounded-lg">
                <p className="text-foreground font-semibold mb-2">
                  Andorinha Marketing
                </p>
                <p className="text-muted-foreground">
                  E-mail:{" "}
                  <a
                    href="mailto:contato@andorinha.roilabs.com.br"
                    className="text-primary hover:underline"
                  >
                    contato@andorinha.roilabs.com.br
                  </a>
                </p>
                <p className="text-muted-foreground">
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/5511999999999"
                    className="text-primary hover:underline"
                  >
                    (11) 99999-9999
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
