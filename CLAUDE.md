# setos-analises: instruções para o agente

Site **público** de análises da Setos Consultoria, publicado no **GitHub Pages**: https://setos-consultoria.github.io/setos-analises/
É só um conjunto de páginas de análise: **sem login, sem banco, sem dados de cliente ou números sigilosos** (o repositório é público).

## Acompanhamento
- GitHub Project **"Setos Análises"** (org Setos-Consultoria, project #6), ligado a este repositório. Cada análise nova vira uma issue aqui e entra no Project. O fluxo ainda vai ser refinado (issue #2).

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
- Marca: o site usa as finalistas **Sombra Fresca** (padrão) e **Cerca Viva**, com seletor no topo (`data-brand` no `<html>`, `?marca=<id>` na URL). Cópia em `brand/`; fonte da verdade no repositório privado `setos-brand`. Não edite `brand/`, `src/styles/marcas.css`, `src/data/marcas.json` nem `public/marca/` à mão: atualize no `setos-brand`, copie para `brand/` e rode `pnpm marca`.
- Cores e fontes só por variável (`--brand`, `--brand-ink`, `--ink-3`, `--font-display`…, definidas em `src/styles/setos.css` sobre os tokens `--setos-*`). Nada de cor fixa (hex/hsl) nas páginas, fora os estados good/warn/bad.
- Quando a marca final for escolhida: deixe só ela em `brand/` e rode `pnpm marca` (o seletor some com uma marca só).
- Textos em português do Brasil.
