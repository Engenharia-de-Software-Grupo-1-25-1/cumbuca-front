export const UF_BY_STATE = {
  Acre: 'AC',
  Alagoas: 'AL',
  Amapá: 'AP',
  Amazonas: 'AM',
  Bahia: 'BA',
  Ceará: 'CE',
  'Distrito Federal': 'DF',
  'Espírito Santo': 'ES',
  Goiás: 'GO',
  Maranhão: 'MA',
  'Mato Grosso': 'MT',
  'Mato Grosso do Sul': 'MS',
  'Minas Gerais': 'MG',
  Pará: 'PA',
  Paraíba: 'PB',
  Paraná: 'PR',
  Pernambuco: 'PE',
  Piauí: 'PI',
  'Rio de Janeiro': 'RJ',
  'Rio Grande do Norte': 'RN',
  'Rio Grande do Sul': 'RS',
  Rondônia: 'RO',
  Roraima: 'RR',
  'Santa Catarina': 'SC',
  'São Paulo': 'SP',
  Sergipe: 'SE',
  Tocantins: 'TO',
};

export const j = (...xs) => xs.filter(Boolean).join(' ');

export const onlyDigits = s => String(s || '').replace(/\D/g, '');

export const formatFromDigits = digits => {
  const d = onlyDigits(digits);
  const padded = d.padStart(3, '0');
  const intPart = padded.slice(0, -2).replace(/^0+/, '') || '0';
  const frac = padded.slice(-2);
  const intFmt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${intFmt},${frac}`;
};

export const digitsToDotFixed = d => (Number.parseInt(onlyDigits(d) || '0', 10) / 100).toFixed(2);

export const dotFixedToDigits = v => {
  if (v == null) return '';
  const s = String(v).replace(',', '.');
  const n = Number.parseFloat(s);
  if (Number.isNaN(n)) return '';
  return Math.round(n * 100).toString();
};

export const tagsToArray = v =>
  Array.isArray(v)
    ? v.filter(Boolean).map(x => String(x).replace(/^#/, '').trim())
    : String(v || '')
        .split(/[,\s\n]+/)
        .map(t => t.replace(/^#/, '').trim())
        .filter(Boolean);

export function getUF(addr = {}) {
  if (addr.state_code && /^[A-Z]{2}$/.test(addr.state_code)) return addr.state_code;

  for (const k of Object.keys(addr)) {
    if (k.startsWith('ISO3166-2-') && typeof addr[k] === 'string') {
      const m = addr[k].match(/^BR-([A-Z]{2})$/);
      if (m) return m[1];
    }
  }

  if (addr.state && UF_BY_STATE[addr.state]) return UF_BY_STATE[addr.state];
  return '';
}

export async function buscarNominatim(q, signal) {
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', q);
  url.searchParams.set('format', 'jsonv2');
  url.searchParams.set('addressdetails', '1');
  url.searchParams.set('limit', '8');
  url.searchParams.set('accept-language', 'pt-BR');
  const r = await fetch(url, { signal, headers: { Referer: window.location.origin } });
  if (!r.ok) throw new Error('Falha ao buscar no Nominatim');
  return r.json();
}

export const base64ToFile = (b64, name) => {
  if (!b64) return null;

  let mime = 'image/jpeg';
  let pure = b64;

  const m = b64.match(/^data:(.*?);base64,(.*)$/);
  if (m) {
    mime = m[1] || 'image/jpeg';
    pure = m[2] || '';
  } else {
    if (b64.startsWith('/9j/')) mime = 'image/jpeg';
    else if (b64.startsWith('iVBOR')) mime = 'image/png';
    else if (b64.startsWith('R0lGOD')) mime = 'image/gif';
    else if (b64.startsWith('UklGR')) mime = 'image/webp';
  }

  const bin = atob(pure);
  const len = bin.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = bin.charCodeAt(i);

  const ext = mime.split('/')[1] || 'jpg';
  const filename = name || `foto-${Date.now()}.${ext}`;
  return new File([bytes], filename, { type: mime });
};

export function montaFormData({ item, precoDigits, descricao, tags, notas, lugar, fotos }) {
  const fd = new FormData();

  fd.append('itemConsumido', item ?? '');
  fd.append('preco', digitsToDotFixed(precoDigits));
  fd.append('descricao', descricao ?? '');

  (Array.isArray(tags) ? tags : tagsToArray(tags)).forEach(t => fd.append('tags', t));

  fd.append('notaGeral', String(notas?.geral ?? 0));
  fd.append('notaAmbiente', String(notas?.ambiente ?? 0));
  fd.append('notaComida', String(notas?.comida ?? 0));
  fd.append('notaAtendimento', String(notas?.atendimento ?? 0));

  if (lugar) {
    const a = lugar.address || {};
    fd.append('estabelecimento.id', String(Number(lugar.place_id)));
    fd.append('estabelecimento.nome', a?.[lugar.type] || lugar.name || lugar.display_name || '');
    fd.append('estabelecimento.categoria', lugar.type || '');
    fd.append('estabelecimento.rua', a.road || '');
    fd.append('estabelecimento.numero', a.house_number || '');
    fd.append('estabelecimento.bairro', a.suburb || a.neighbourhood || '');
    fd.append('estabelecimento.cidade', a.city || a.town || a.village || '');
    fd.append('estabelecimento.estado', getUF(a));
    fd.append('estabelecimento.cep', a.postcode || '');
    fd.append('estabelecimento.horarios', []);
  }

  (fotos || []).forEach((f, i) => {
    const file = f && f.type ? f : new File([f], f?.name || `foto-${i}.jpg`, { type: f?.type || 'image/jpeg' });
    if (file.type && file.type.startsWith('image/')) {
      fd.append('fotos', file, file.name || `foto-${i}.jpg`);
    }
  });

  return fd;
}
