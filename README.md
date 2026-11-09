# setos-analises

Repositório da **Setos Consultoria** com:

1. **Páginas de análise**: estudos usados para apresentar a clientes e para a Setos tomar decisões.
2. **Dashboard da Setos** (futuro): o escopo **ainda precisa ser planejado em conjunto** (Matheus e Lucas). O planejamento fica no GitHub Project **"Setos Dashboard"**. Até lá, o repositório guarda só as análises.

## Análises

| Data | Análise | Arquivo |
|---|---|---|
| 09/11/2026 | Gateways de pagamento online no Brasil (13 provedores, simulador de custo, recomendação para o Snack) | [`analises/2026-11-09-gateways-de-pagamento/`](analises/2026-11-09-gateways-de-pagamento/index.html) |

## Como ver

São páginas HTML estáticas, sem build: abra `index.html` no navegador (ou sirva a pasta com qualquer servidor estático, por exemplo `npx serve .`).

## Convenções

- Uma pasta por análise em `analises/AAAA-MM-DD-assunto/`, com um `index.html` autocontido.
- Toda análise mostra **a data em que foi feita**, as **fontes** e as **ressalvas** (taxas e preços mudam).
- Identidade visual da Setos: verde-menta `hsl(155 100% 65%)`, verde-escuro `hsl(156 51% 14%)`, fonte Inter.
- Ao adicionar uma análise, inclua o link no `index.html` da raiz e na tabela acima.
