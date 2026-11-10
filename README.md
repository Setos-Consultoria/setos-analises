# setos-analises

Páginas de análise da **Setos Consultoria**, usadas para apresentar a clientes e para apoiar as nossas decisões.

**Site:** https://setos-consultoria.github.io/setos-analises/

> Repositório **público** (o GitHub Pages gratuito exige). Não coloque aqui dados de clientes, contratos, senhas ou números internos sigilosos.
> O **Dashboard da Setos** fica em outro repositório, privado: `Setos-Consultoria/setos-dashboard`.

**Acompanhamento:** GitHub Project [Setos Análises](https://github.com/orgs/Setos-Consultoria/projects/6) (fluxo a refinar na issue [#2](https://github.com/Setos-Consultoria/setos-analises/issues/2)).

## Análises

| Data | Análise |
|---|---|
| 09/11/2026 | [Gateways de pagamento online no Brasil](https://setos-consultoria.github.io/setos-analises/analises/2026-11-09-gateways-de-pagamento/): 13 provedores, simulador de custo e recomendação para o Snack |

## Como adicionar uma análise

1. Copie `src/pages/analises/_modelo.astro` para `src/pages/analises/AAAA-MM-DD-assunto.astro`.
2. Preencha o `meta` (título, **data em que a análise foi feita**, categoria, resumo) e escreva as seções.
3. Dados grandes (tabelas) podem ir em `src/data/`, e interatividade em `src/scripts/` (veja a análise de gateways como exemplo).
4. Rode `pnpm dev` e abra http://localhost:4500/setos-analises/ para conferir.
5. Faça push na `main`: o GitHub Actions publica sozinho no GitHub Pages em ~1 minuto.

A página inicial lista as análises automaticamente, da mais recente para a mais antiga.

## Marca

O site já usa a marca da Setos, com as **duas finalistas** (Sombra Fresca e Cerca Viva) e um seletor **"Marca em teste"** no topo para comparar ao vivo. Para mandar um link já com uma delas: `?marca=sombra-fresca` ou `?marca=cerca-viva`. A padrão é a Sombra Fresca.

- `brand/`: **cópia** das finalistas (logos, símbolos, `tokens.css`, `tokens.json`). A fonte da verdade é o repositório privado `setos-brand`.
- `pnpm marca`: regenera `src/styles/marcas.css`, `src/data/marcas.json` e `public/marca/*.svg` a partir de `brand/` (não edite esses arquivos à mão).
- `src/styles/setos.css`: o visual do site, montado só em cima dos tokens `--setos-*`.
- Quando a final for escolhida: deixe só ela em `brand/` e rode `pnpm marca`; o seletor some sozinho.

## Stack

- [Astro](https://astro.build) 6 (site estático, sem servidor). Funciona com Node 22.12+.
- Layout em `src/layouts/` e visual em `src/styles/setos.css`, usando os tokens da marca (ver **Marca**).
- Deploy: `.github/workflows/deploy.yml` chama o workflow padrão da Setos `Setos-Consultoria/.github/.github/workflows/pages.yml`.

```bash
pnpm install
pnpm dev      # http://localhost:4500/setos-analises/
pnpm build    # gera dist/
```

## Convenções

- Toda análise mostra **a data em que foi feita**, as **fontes** e as **ressalvas** (preços e taxas mudam).
- Nome do arquivo: `AAAA-MM-DD-assunto` (vira a URL).
- Não reescreva análises antigas com dados novos: crie uma nova com a data atual e cite a anterior.
