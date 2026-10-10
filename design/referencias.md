# Referências e direção visual

- Imagem fornecida: **Modern Dental Care Website Design – Dentora.jpg**. Referência para respiro editorial, cartões arredondados, hierarquia, seção institucional, tratamento e rodapé.
- Prompt fornecido: base técnica React + Vite + TypeScript + Tailwind, tipografia Open Sauce One, fotos, mosaicos com imagem compartilhada, splash, navegação fixa e três áreas visuais principais.
- Figma: https://www.figma.com/design/QjM2BZaILsesbzrJWg5jIt
- Animações: https://naocodei.com/free-code-css/ (consultado em 04/10/2026).

O pedido de mesclar as referências foi interpretado como autorização para adaptar a estrutura: os três blocos principais do prompt foram preservados e complementados com apresentação da clínica, filosofia, FAQ e contato. Todos os textos foram adaptados para português. A base neutra ganha um discreto verde acinzentado nos destaques; as cores mais vivas vêm das próprias fotos do prompt.

## Movimento

Implementação própria baseada nos padrões demonstrados no Não Codei: aparecer e subir 24 px, entrada em cascata com 120 ms entre elementos, elevação no hover, sublinhado que cresce, contador e sanfona com CSS Grid. Não há biblioteca de animação ou ícones. As setas e a marca são SVG inline. Movimento reduzido remove animações não essenciais.

## Imagens originais

As cinco fotos foram baixadas das URLs exatas do prompt e mantidas localmente. O retrato vertical foi otimizado para WebP com 1100 px de largura, mantendo sua proporção. Para o Figma, algumas imagens foram convertidas a JPEG porque a prévia do editor não renderizou os WebP iniciais.

1. Hero: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_113640_ccf3cf97-d447-425b-a134-d7b09fc743fc.png&w=1280&q=85
2. Galeria: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114219_414dfe80-f15c-4e25-bf52-b13721f4bd88.png&w=1280&q=85
3. Implante: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115253_c19ab167-8dd5-48b4-967d-b9f0d9d6e8fb.png&w=1280&q=85
4. Restauração: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_115237_fc519057-6e87-4abf-999a-9610b8b085b4.png&w=1280&q=85
5. Retrato: https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260624_114355_752ba9e6-0942-4abb-9047-5d9bb16632e9.png&w=1280&q=85

As imagens não são apresentadas como pacientes, equipe ou resultados da clínica fictícia.

As fontes Open Sauce One do briefing foram copiadas localmente em WOFF2 para eliminar as requisições bloqueantes ao serviço externo. O crédito OnlineWebFonts e a referência à licença CC BY 4.0 aparecem no rodapé. O retrato ganhou versões menores para telas estreitas; a composição e a imagem original foram mantidas.
