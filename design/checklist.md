# Checklist de entrega

Escopo: portfólio de clínica fictícia, sem publicação e sem atendimento real.

| Nº | Requisito | Estado | Evidência / justificativa |
|---|---|---|---|
| 1 | 404 personalizada | Pendente | Tela no app e `dist/404.html` criadas. Status HTTP depende da configuração da futura hospedagem. |
| 2 | CTAs claros | Implementado | Botões abrem a simulação de agendamento; links navegam pelas seções. |
| 3 | Links personalizados | Implementado | Âncoras legíveis: clinica, tratamentos, cuidado, duvidas, contato. Sem contatos fictícios com destinatários reais. |
| 4 | Cases | Não aplicável | Clínica fictícia, sem casos reais. Fotos são identificadas como ilustrativas. |
| 5 | Agradecimento | Não aplicável | Não há envio a serviço real. A simulação mostra resumo e explica que não houve reserva. |
| 6 | Breadcrumbs | Não aplicável | Landing page única, sem hierarquia interna. |
| 7 | FAQ com cinco perguntas | Implementado | Cinco controles com aria-expanded e regiões relacionadas, testados no navegador. |
| 8 | Promessa de resposta | Não aplicável | Não há equipe nem atendimento real. Nenhum prazo inventado. |
| 9 | CTA fixo móvel | Implementado | Barra inferior responsiva com safe-area e espaço reservado ao rodapé. |
| 10 | robots.txt | Implementado | Prévia bloqueada para rastreamento; sem domínio para sitemap definitivo. |
| 11 | Títulos únicos | Implementado | Título em português na landing page e na 404 estática. |
| 12 | Meta descriptions | Implementado | Descrições na página principal e 404. |
| 13 | Compartilhamento social | Pendente | Título, descrição, idioma e imagem definidos; URL absoluta e validação externa aguardam domínio. |
| 14 | Mapas e rotas | Não aplicável | Não existe endereço físico real. |
| 15 | Avaliações reais | Não aplicável | Não foram inventados depoimentos, notas ou totais de pacientes. |
| 16 | Texto alternativo | Implementado | Fotos informativas com alt; fundos decorativos em CSS. |
| 17 | Marcação de negócio local | Não aplicável | Não há estabelecimento real a representar em LocalBusiness. |
| 18 | Privacidade | Implementado | Janela no rodapé descreve armazenamento de sessão, fontes externas e ausência de envio/coleta. |
| 19 | Google Analytics | Não aplicável | Sem identificador ou pedido de rastreamento; nenhum dado enviado. |
| 20 | Fotos da equipe | Não aplicável | Não existe equipe real. Fotografias não são identificadas como profissionais da clínica. |

## Para a publicação manual

- Configurar domínio, canonical, sitemap e URL absoluta de Open Graph.
- Ajustar `noindex` e `robots.txt` somente se desejar indexação do portfólio.
- Configurar `404.html` com status HTTP 404 na hospedagem.
- Se a clínica deixar de ser fictícia, substituir conteúdos ilustrativos por informações confirmadas e integrar agendamento real antes de anunciá-lo como funcional.

Nenhum desses pontos autoriza publicação automática. O ZIP é entregue para upload manual pelo usuário.
