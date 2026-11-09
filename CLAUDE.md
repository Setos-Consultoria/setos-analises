# setos-analises: instruções para o agente

Site **público** de análises da Setos Consultoria, publicado no **GitHub Pages**: https://setos-consultoria.github.io/setos-analises/
É só um conjunto de páginas de análise: **sem login, sem banco, sem dados de cliente ou números sigilosos** (o repositório é público).

## Stack
- Astro 6, site estático. `pnpm dev` → http://localhost:4500/setos-analises/ · `pnpm build` → `dist/`.
- `base: '/setos-analises'` no `astro.config.mjs`: links internos usam `import.meta.env.BASE_URL`.
- Deploy: push na `main` → `.github/workflows/deploy.yml`, que chama o workflow padrão `Setos-Consultoria/.github/.github/workflows/pages.yml`.

## Nova análise
1. Copie `src/pages/analises/_modelo.astro` para `src/pages/analises/AAAA-MM-DD-assunto.astro` (arquivos com `_` não viram página).
2. Preencha `export const meta` (a `data` é a data em que a análise foi feita) e escreva as seções com o layout `Analise`.
3. Dados grandes em `src/data/`, interatividade em `src/scripts/` (veja a análise de gateways).
4. A página inicial lista sozinha. Atualize a tabela do README.

## Regras
- Toda análise mostra **data, fontes e ressalvas**. Não reescreva análise antiga com dado novo: crie outra com a data atual.
- Pesquise em fontes oficiais primeiro; quando divergirem, diga isso na página.
- Identidade visual atual (`src/styles/setos.css`) é **provisória**. Finalistas da marca: **Sombra Fresca** e **Cerca Viva** (cópia em `brand/`, fonte da verdade no repositório privado `setos-brand`). Quando a final for escolhida, aplique só via tokens (`--setos-*` do `tokens.css`) em `src/styles/setos.css`. Não edite `brand/` à mão: atualize no `setos-brand` e copie de novo.
- Textos em português do Brasil.
