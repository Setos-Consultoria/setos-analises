// Gera os arquivos de marca do site a partir da cópia em brand/ (que vem do setos-brand).
// Rode depois de atualizar brand/:  pnpm marca
//
// Saídas (não edite à mão):
//   src/styles/marcas.css      tokens --setos-* de cada finalista, por [data-brand="<id>"]
//   src/data/marcas.json       nome, fontes e símbolo (com cores em var(--setos-*)) de cada marca
//   public/marca/<id>.svg      símbolo claro, usado como favicon
import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

const raiz = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const brandDir = join(raiz, 'brand');
const PAPEIS = ['bg', 'surface', 'ink', 'muted', 'foliage', 'foliage2', 'shade', 'accent'];

// A primeira pasta (ordem alfabética: 01-…) é a marca padrão.
const pastas = readdirSync(brandDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

mkdirSync(join(raiz, 'public', 'marca'), { recursive: true });

const css = [
  '/* GERADO por scripts/sync-marca.mjs a partir de brand/. Não edite à mão. */',
];
const marcas = [];

pastas.forEach((pasta, i) => {
  const id = pasta.replace(/^\d+-/, '');
  const tokens = JSON.parse(readFileSync(join(brandDir, pasta, 'tokens.json'), 'utf8'));
  const tokensCss = readFileSync(join(brandDir, pasta, 'tokens.css'), 'utf8');

  // Troca cada seletor ":root…" por ":root[data-brand=id]…" (e, na padrão, também sem data-brand).
  const escopado = tokensCss
    .replace(/\/\*[\s\S]*?\*\/\s*/, '')
    .replace(/^(\s*)(:root[^{]*)\{/gm, (_, ind, sel) => {
      const resto = sel.trim().slice(':root'.length);
      const alvos = [`:root[data-brand="${id}"]${resto}`];
      if (i === 0) alvos.push(`:root:not([data-brand])${resto}`);
      return `${ind}${alvos.join(',\n' + ind)} {`;
    });
  css.push(`\n/* ${tokens.nome} (${tokens.linha}) */`, escopado.trim());

  // Símbolo com as cores trocadas pelos papéis, para seguir tema claro/escuro.
  const claro = tokens.cores.claro;
  let svg = readFileSync(join(brandDir, pasta, 'simbolo.svg'), 'utf8');
  const interno = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  const comVars = interno.replace(/fill="(#[0-9A-Fa-f]{6})"/g, (m, hex) => {
    const papel = PAPEIS.find((p) => claro[p].toLowerCase() === hex.toLowerCase());
    return papel ? `fill="var(--setos-${papel})"` : m;
  });

  copyFileSync(join(brandDir, pasta, 'simbolo.svg'), join(raiz, 'public', 'marca', `${id}.svg`));

  marcas.push({
    id,
    nome: tokens.nome,
    linha: tokens.linha,
    padrao: i === 0,
    googleFonts: tokens.fontes.googleFonts,
    simbolo: comVars.trim(),
  });
});

writeFileSync(join(raiz, 'src', 'styles', 'marcas.css'), css.join('\n') + '\n');
writeFileSync(join(raiz, 'src', 'data', 'marcas.json'), JSON.stringify(marcas, null, 2) + '\n');
console.log(`marcas: ${marcas.map((m) => m.id).join(', ')} (padrão: ${marcas[0].id})`);
