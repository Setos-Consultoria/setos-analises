# setos-analises

Páginas de análise da **Setos Consultoria**, usadas para apresentar a clientes e para apoiar as nossas decisões.

**Site:** https://setos-consultoria.github.io/setos-analises/

> Repositório **público** (o GitHub Pages gratuito exige). Não coloque aqui dados de clientes, contratos, senhas ou números internos sigilosos.
> O **Dashboard da Setos** fica em outro repositório, privado: `Setos-Consultoria/setos-dashboard`.

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

`brand/` tem uma **cópia** das finalistas da marca Setos (Sombra Fresca e Cerca Viva): logos, símbolos, `tokens.css` e `tokens.json`. A fonte da verdade é o repositório privado `setos-brand`; quando a marca final for escolhida, ela é aplicada aqui via `src/styles/setos.css`.

## Stack

- [Astro](https://astro.build) 6 (site estático, sem servidor). Funciona com Node 22.12+.
- Layout e identidade visual da Setos em `src/layouts/` e `src/styles/setos.css` (verde-menta `hsl(155 100% 65%)`, verde-escuro `hsl(156 51% 14%)`, fonte Inter, tema claro e escuro).
- Deploy: `.github/workflows/deploy.yml` (ação oficial `withastro/action` + `actions/deploy-pages`).

```bash
pnpm install
pnpm dev      # http://localhost:4500/setos-analises/
pnpm build    # gera dist/
```

## Convenções

- Toda análise mostra **a data em que foi feita**, as **fontes** e as **ressalvas** (preços e taxas mudam).
- Nome do arquivo: `AAAA-MM-DD-assunto` (vira a URL).
- Não reescreva análises antigas com dados novos: crie uma nova com a data atual e cite a anterior.
