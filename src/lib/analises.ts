// Metadados que toda análise exporta (`export const meta = {...}` no arquivo da página).
export type AnaliseMeta = {
  titulo: string;
  /** Data em que a análise foi feita, AAAA-MM-DD. */
  data: string;
  categoria: string;
  resumo: string;
  /** Para quem/por que foi feita (aparece no topo da página). */
  uso?: string;
  destaques?: { label: string; valor: string }[];
};

type Modulo = { meta: AnaliseMeta; url?: string };

/** Lista todas as análises em src/pages/analises/ (arquivos com "_" na frente são ignorados), mais recentes primeiro. */
export function listarAnalises() {
  const mods = import.meta.glob<Modulo>('../pages/analises/[!_]*.astro', { eager: true });
  return Object.entries(mods)
    .map(([path, mod]) => ({
      ...mod.meta,
      slug: path.split('/').pop()!.replace(/\.astro$/, ''),
    }))
    .sort((a, b) => b.data.localeCompare(a.data));
}

export const dataBR = (iso: string) => iso.split('-').reverse().join('/');
