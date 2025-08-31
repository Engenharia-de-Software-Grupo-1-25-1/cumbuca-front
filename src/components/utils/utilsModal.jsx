import React, { useEffect, useRef, useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FiMapPin, FiCamera, FiX } from 'react-icons/fi';
import { message } from 'antd';

import { j, tagsToArray, buscarNominatim } from './utilsModal.helpers';

const useDebounce = (v, d = 400) => {
  const [x, setX] = useState(v);
  useEffect(() => {
    const t = setTimeout(() => setX(v), d);
    return () => clearTimeout(t);
  }, [v, d]);
  return x;
};

const CHIP_PALETTE = [
  { bg: 'bg-orange-600', fg: 'text-white', ring: 'ring-orange-700/40' },
  { bg: 'bg-amber-200', fg: 'text-amber-950', ring: 'ring-amber-400/50' },
  { bg: 'bg-amber-300', fg: 'text-amber-950', ring: 'ring-amber-500/50' },
  { bg: 'bg-orange-500', fg: 'text-white', ring: 'ring-orange-700/40' },
];

const hash = str => {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
};

export function TagInput({ tags, setTags, placeholder = 'Digite e pressione espaço' }) {
  const [value, setValue] = useState('');

  const addTag = raw => {
    const t = String(raw || '')
      .replace(/^#/, '')
      .trim();
    if (!t) return;
    if (tags.includes(t)) {
      setValue('');
      return;
    }
    setTags(prev => [...prev, t]);
    setValue('');
  };

  const removeTag = i => setTags(prev => prev.filter((_, idx) => idx !== i));

  const onKeyDown = e => {
    if (e.key === ' ' || e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(value);
    } else if (e.key === 'Backspace' && !value) {
      e.preventDefault();
      if (tags.length) removeTag(tags.length - 1);
    }
  };

  const onPaste = e => {
    const txt = e.clipboardData.getData('text');
    if (!txt) return;
    e.preventDefault();
    const novos = tagsToArray(txt);
    if (!novos.length) return;
    const set = new Set(tags);
    novos.forEach(t => set.add(t));
    setTags(Array.from(set));
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-[#3D2E1C]">Tags</label>
      <div
        className="flex min-h-[42px] w-full flex-wrap items-center gap-1.5 rounded-full
                   border border-orange-300 bg-[#F2D7A0] px-3 py-2 focus-within:border-emerald-600"
        onClick={e => e.currentTarget.querySelector('input')?.focus()}
      >
        {tags.map((t, i) => {
          const c = CHIP_PALETTE[hash(t) % CHIP_PALETTE.length];
          return (
            <span
              key={`${t}-${i}`}
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${c.bg} ${c.fg} ${c.ring}`}
              title={`#${t}`}
            >
              #{t}
              <button
                type="button"
                aria-label={`Remover ${t}`}
                onClick={() => removeTag(i)}
                className="ml-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/30"
              >
                ×
              </button>
            </span>
          );
        })}
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          onPaste={onPaste}
          placeholder={tags.length ? '' : placeholder}
          className="flex-1 min-w-[80px] bg-transparent text-sm text-black outline-none placeholder:text-neutral-600"
        />
      </div>
    </div>
  );
}

export function CampoEstrelas({ rotulo, valor, onChange, obrigatorio = true }) {
  const [hover, setHover] = useState(0);
  const atual = hover || valor;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-[#3D2E1C]">
        {rotulo} {obrigatorio && <span className="text-red-600">*</span>}
      </span>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            type="button"
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => onChange(n)}
            aria-label={`${rotulo}: ${n} de 5`}
            className="p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            {n <= atual ? (
              <FaStar className="h-7 w-7 text-amber-400" />
            ) : (
              <FaRegStar className="h-7 w-7 text-neutral-300" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function PilhaFotos({ arquivos, onRemover }) {
  const [urls, setUrls] = useState([]);
  useEffect(() => {
    const u = Array.from(arquivos || []).map(f => URL.createObjectURL(f));
    setUrls(u);
    return () => u.forEach(u0 => URL.revokeObjectURL(u0));
  }, [arquivos]);
  if (!arquivos?.length) return null;

  return (
    <div className="mt-2 flex items-center">
      {urls.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={j(
            'relative h-16 w-16 rounded-md border bg-white shadow-sm overflow-hidden ring-1 ring-black/5',
            i > 0 && '-ml-5'
          )}
          style={{ zIndex: 10 + i }}
        >
          <img src={src} alt={`foto-${i}`} className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={() => onRemover(i)}
            className="absolute top-0 left-0 m-0.5 rounded-full bg-black/70 p-1 text-white hover:bg-black/80"
            aria-label="Remover foto"
          >
            <FiX className="h-3.5 w-3.5" />
          </button>
          {i === urls.length - 1 && urls.length > 1 && (
            <span className="absolute -top-1 -right-1 rounded-full bg-black/80 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              x{urls.length}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function SeletorFotos({ arquivos, setArquivos }) {
  const [msg, setMsg] = useState('');
  const inputRef = useRef(null);

  const aoMudar = e => {
    const selecionados = e.target.files ? Array.from(e.target.files) : [];
    const imagens = selecionados.filter(f => f.type?.startsWith('image/'));
    const rejeitados = selecionados.length - imagens.length;

    if (imagens.length) setArquivos(prev => [...prev, ...imagens]);
    setMsg(rejeitados ? `${rejeitados} arquivo(s) ignorado(s): só imagens são permitidas.` : '');
    if (inputRef.current) inputRef.current.value = '';
  };

  const remover = idx => setArquivos(prev => prev.filter((_, i) => i !== idx));
  const limparTudo = () => setArquivos([]);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#2E6E2D]">
          <FiCamera className="h-4 w-4" />
          <span>Fotos</span>
        </div>
        {arquivos?.length > 0 && (
          <button
            type="button"
            onClick={limparTudo}
            className="text-xs underline text-neutral-700 hover:text-neutral-900"
          >
            Limpar tudo
          </button>
        )}
      </div>

      <label className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2E6E2D] px-4 py-2 text-sm font-medium text-white shadow hover:bg-[#255B24] active:scale-[.99] transition">
        <span>+ Adicionar Fotos</span>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={aoMudar} />
      </label>

      {msg && <p className="mt-1 text-xs text-red-600">{msg}</p>}
      <PilhaFotos arquivos={arquivos} onRemover={remover} />
    </div>
  );
}

export function AutocompleteNominatim({ id, valor, erro, mostrarErros, onChange, onSelect, onEdit }) {
  const [sugs, setSugs] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [ativo, setAtivo] = useState(-1);
  const deb = useDebounce(valor, 400);
  const abortRef = useRef(null);
  const suprimirBuscaRef = useRef(false);

  useEffect(() => {
    if (!deb || onEdit || suprimirBuscaRef.current) {
      suprimirBuscaRef.current = false;
      setSugs([]);
      return;
    }
    (async () => {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();
      try {
        setCarregando(true);
        const d = await buscarNominatim(deb, abortRef.current.signal);
        setSugs(Array.isArray(d) ? d : []);
        setAtivo(-1);
      } catch (e) {
        if (e.name !== 'AbortError') message.error(e.message || String(e));
      } finally {
        setCarregando(false);
      }
    })();
    return () => abortRef.current?.abort();
  }, [deb, onEdit]);

  const temErro = mostrarErros && !!erro;

  return (
    <div className="relative">
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
        Estabelecimento <span className="text-red-600">*</span>
      </label>

      <style>{`
        .bg-amarelo-autofill:-webkit-autofill,
        .bg-amarelo-autofill:-webkit-autofill:hover,
        .bg-amarelo-autofill:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #F2D7A0 inset !important;
          box-shadow: 0 0 0px 1000px #F2D7A0 inset !important;
          -webkit-text-fill-color: #000 !important;
        }
      `}</style>

      <div className="relative">
        <input
          id={id}
          placeholder="Buscar estabelecimento..."
          value={valor}
          onChange={e => onChange(e.target.value)}
          className={j(
            'w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600 pr-10',
            'placeholder:text-neutral-600 bg-amarelo-autofill',
            temErro ? 'border-red-500' : 'border-neutral-300',
            onEdit ? 'bg-[#E9D3AE] cursor-not-allowed' : 'bg-[#F2D7A0] focus:border-emerald-600'
          )}
          disabled={onEdit}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <FiMapPin className="h-4 w-4 text-neutral-700" />
        </span>
      </div>

      {!onEdit && ((sugs.length && valor) || carregando) && (
        <div
          role="listbox"
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-xl border border-neutral-200 bg-white shadow"
        >
          {carregando && <div className="px-3 py-2 text-xs text-neutral-500">Buscando…</div>}
          {!carregando &&
            sugs.map((s, i) => {
              const rotulo = s.address?.[s.type] || s.name || s.display_name;
              return (
                <button
                  key={`${s.osm_type}-${s.osm_id}`}
                  type="button"
                  role="option"
                  aria-selected={i === ativo}
                  onClick={() => {
                    suprimirBuscaRef.current = true;
                    onSelect(s);
                    setSugs([]);
                  }}
                  className={j(
                    'block w-full px-3 py-2 text-left text-xs hover:bg-neutral-50',
                    i === ativo && 'bg-neutral-100'
                  )}
                >
                  <div className="font-medium text-black line-clamp-1">{rotulo}</div>
                  <div className="text-[11px] text-neutral-600 line-clamp-2">{s.display_name}</div>
                </button>
              );
            })}
        </div>
      )}

      {temErro && <p className="mt-1 text-[11px] text-red-600">{erro}</p>}
    </div>
  );
}

export function Nota({ label, valor = 0 }) {
  return (
    <div className="flex items-center gap-2 text-[#6a5427]">
      <span className="w-[120px] shrink-0 font-semibold text-[#5b4320]">{label}</span>
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < Number(valor || 0)} />
        ))}
      </div>
    </div>
  );
}

export function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-2 text-[#6a5427]">
      <span className="w-[120px] shrink-0 font-semibold text-[#5b4320]">{label}</span>
      <span className="text-[#6a5427]">{value}</span>
    </div>
  );
}

function Star({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={filled ? '#f29b38' : '#e0cf9f'}
      />
    </svg>
  );
}
