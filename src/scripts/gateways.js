// Interatividade da análise de gateways: tabela ordenável, simulador e cards por provedor.
import { FONTES, PROVEDORES } from '../data/gateways';

const brl = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const pctTxt = (v) => v.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) + '%';
const custo = (taxa, valor) => {
  if (!taxa) return null;
  let c = valor * taxa.pct / 100 + (taxa.fixo || 0);
  if (taxa.min) c = Math.max(c, taxa.min);
  return c;
};
const taxaTxt = (t) => !t ? 'n/d' : [t.pct ? pctTxt(t.pct) : (t.fixo ? '' : '0%'), t.fixo ? brl(t.fixo) : ''].filter(Boolean).join(' + ') + (t.min ? ` (mín. ${brl(t.min)})` : '');
const stars = (n) => '<span class="stars" aria-label="' + n + ' de 5">' + '★'.repeat(n) + '<span class="off">' + '★'.repeat(5 - n) + '</span></span>';
const confTag = { oficial:['good','Página oficial'], misto:['good','Oficial + terceiros'], terceiros:['warn','Só terceiros'], negociado:['warn','Negociado'] };

// ---------- tabela ----------
const rows = PROVEDORES.map(p => ({
  ...p,
  pixCusto: custo(p.pix, 20),
  cartaoCusto: p.cartao ? custo(p.cartao.rapido, 20) : null,
  nMeios: p.meios.length,
}));
const tbody = document.querySelector('#tbl tbody');
function cell(v, txt, cls) {
  if (v === null || v === undefined) return '<td class="muted">n/d</td>';
  return `<td class="num ${cls || ''}">${txt}</td>`;
}
function costClass(v, ok, mid) { return v === null ? '' : v <= ok ? 'good' : v <= mid ? 'warn' : 'bad'; }
function renderTable(list) {
  tbody.innerHTML = list.map(p => {
    const pixC = p.pixCusto, carC = p.cartaoCusto;
    return `<tr>
      <td class="name">${p.nome}<small>${p.tipo}</small></td>
      ${pixC === null ? '<td class="muted">Negociado</td>' : `<td class="num">${taxaTxt(p.pix)}<br><span class="tag ${costClass(pixC,0.25,0.5)}">${brl(pixC)} em R$ 20</span></td>`}
      ${carC === null ? '<td class="muted">Não publicado</td>' : `<td class="num">${taxaTxt(p.cartao.rapido)} <span class="muted">(${p.cartao.rapido.prazo})</span>${p.cartao.barato.pct !== p.cartao.rapido.pct ? `<br><span class="muted">${taxaTxt(p.cartao.barato)} (${p.cartao.barato.prazo})</span>` : ''}<br><span class="tag ${costClass(carC,0.85,1.1)}">${brl(carC)} em R$ 20</span></td>`}
      <td>${p.parcelado}</td>
      <td>${p.boleto}</td>
      <td>${p.prazoTxt}</td>
      <td><div class="chips">${p.meios.map(m => `<span class="chip">${m}</span>`).join('')}</div></td>
      <td>${stars(p.integ)}<br><span class="muted" style="font-size:12.5px">${p.integTxt}</span></td>
      <td><span class="tag ${confTag[p.conf][0]}">${confTag[p.conf][1]}</span></td>
    </tr>`;
  }).join('');
}
let sortState = { k: null, dir: 1 };
document.querySelectorAll('#tbl th').forEach(th => th.addEventListener('click', () => {
  const k = th.dataset.k;
  sortState = { k, dir: sortState.k === k ? -sortState.dir : (k === 'nMeios' || k === 'integ' ? -1 : 1) };
  document.querySelectorAll('#tbl th').forEach(h => h.removeAttribute('aria-sort'));
  th.setAttribute('aria-sort', sortState.dir === 1 ? 'ascending' : 'descending');
  const sorted = [...rows].sort((a, b) => {
    const va = a[k], vb = b[k];
    if (va === null || va === undefined) return 1;
    if (vb === null || vb === undefined) return -1;
    return (typeof va === 'string' ? va.localeCompare(vb, 'pt-BR') : va - vb) * sortState.dir;
  });
  renderTable(sorted);
}));
renderTable(rows);

// ---------- simulador ----------
const $ = (id) => document.getElementById(id);
function sim() {
  const t = Math.max(1, Number($('ticket').value) || 20);
  const n = Math.max(1, Number($('pedidos').value) || 1);
  const pix = Number($('pix').value) / 100;
  const modo = $('prazo').value;
  $('ticketOut').textContent = brl(t);
  $('pedidosOut').textContent = n.toLocaleString('pt-BR');
  $('pixOut').textContent = Math.round(pix * 100) + '% Pix · ' + Math.round((1 - pix) * 100) + '% cartão';
  const res = PROVEDORES.map(p => {
    const cp = custo(p.pix, t);
    const cc = p.cartao ? custo(p.cartao[modo], t) : null;
    const need = (pix > 0 && cp === null) || (pix < 1 && cc === null);
    return { p, total: need ? null : n * (pix * (cp || 0) + (1 - pix) * (cc || 0)) };
  }).sort((a, b) => (a.total ?? Infinity) - (b.total ?? Infinity));
  const max = Math.max(...res.filter(r => r.total !== null).map(r => r.total), 1);
  const fat = n * t;
  $('bars').innerHTML = res.map(r => `<div class="bar-row ${r.total === null ? 'na' : ''}">
      <span>${r.p.nome}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${r.total === null ? 0 : (r.total / max * 100)}%"></div></div>
      <span class="v">${r.total === null ? 'n/d' : brl(r.total)}${r.total === null ? '' : `<br><span class="muted" style="font-weight:500;font-size:11.5px">${pctTxt(r.total / fat * 100)} do faturamento</span>`}</span>
    </div>`).join('');
}
['ticket','pedidos','pix','prazo'].forEach(id => $(id).addEventListener('input', sim));
sim();

// ---------- detalhes ----------
$('provs').innerHTML = PROVEDORES.map(p => `<article class="prov">
  <header><div><h3>${p.nome}</h3><div class="kind">${p.tipo}</div></div>${stars(p.integ)}</header>
  <dl>
    <dt>Pix</dt><dd>${p.pix ? taxaTxt(p.pix) : 'Negociado'}</dd>
    <dt>Cartão à vista</dt><dd>${p.cartao ? `${taxaTxt(p.cartao.rapido)} (${p.cartao.rapido.prazo})${p.cartao.barato.pct !== p.cartao.rapido.pct ? ` · ${taxaTxt(p.cartao.barato)} (${p.cartao.barato.prazo})` : ''}` : 'Não publicado'}</dd>
    <dt>Parcelado</dt><dd>${p.parcelado}</dd>
    <dt>Boleto</dt><dd>${p.boleto}</dd>
    <dt>Recebimento</dt><dd>${p.prazoTxt}</dd>
    <dt>Integração</dt><dd>${p.integTxt}</dd>
  </dl>
  <div class="pc">
    <div><span class="t p">Prós</span><ul>${p.pros.map(x => `<li>${x}</li>`).join('')}</ul></div>
    <div><span class="t c">Contras</span><ul>${p.contras.map(x => `<li>${x}</li>`).join('')}</ul></div>
  </div>
</article>`).join('');

$('fontes').innerHTML = FONTES.map(([t, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}</a></li>`).join('');
