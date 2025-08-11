import React, { useEffect, useMemo, useRef, useState } from 'react';
import categorias from '../utils/categorias';
import { FiMapPin, FiCamera, FiArrowLeft, FiX } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { criarAvaliacao } from '../services/avaliacaoService';
import { message } from 'antd';

const j = (...xs) => xs.filter(Boolean).join(' ');
const useDebounce = (v, d = 400) => {
  const [x, setX] = useState(v);
  useEffect(() => {
    const t = setTimeout(() => setX(v), d);
    return () => clearTimeout(t);
  }, [v, d]);
  return x;
};

async function buscarNominatim(q, signal) {
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

const onlyDigits = s => String(s || '').replace(/\D/g, '');
const formatFromDigits = digits => {
  const d = onlyDigits(digits);
  const padded = d.padStart(3, '0');
  const intPart = padded.slice(0, -2).replace(/^0+/, '') || '0';
  const frac = padded.slice(-2);
  const intFmt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${intFmt},${frac}`;
};
const digitsToDotFixed = d => (Number.parseInt(onlyDigits(d) || '0', 10) / 100).toFixed(2);

function montaFormData({ item, precoDigits, descricao, tags, notas, lugar, fotos }) {
  const fd = new FormData();

  fd.append('item_consumido', item);
  fd.append('preco', digitsToDotFixed(precoDigits));
  fd.append('descricao', descricao || '');
  fd.append('tags', tags || '');
  fd.append('nota_geral', String(notas?.geral ?? 0));
  fd.append('nota_comida', String(notas?.comida ?? 0));
  fd.append('nota_ambiente', String(notas?.ambiente ?? 0));
  fd.append('nota_atendimento', String(notas?.atendimento ?? 0));

  if (lugar) {
    const a = lugar.address || {};
    const est = {
      id: Number(lugar.place_id),
      nome: a[lugar.type] || lugar.name || lugar.display_name || '',
      categoria: lugar.type || '',
      rua: a.road || '',
      numero: a.house_number || '',
      bairro: a.suburb || a.neighbourhood || '',
      cidade: a.city || a.town || a.village || '',
      estado: a.state || '',
      cep: a.postcode || '',
      horarios: [],
    };

    fd.append('estabelecimento.id', String(est.id));
    fd.append('estabelecimento.nome', est.nome);
    fd.append('estabelecimento.categoria', est.categoria);
    fd.append('estabelecimento.rua', est.rua);
    fd.append('estabelecimento.numero', est.numero);
    fd.append('estabelecimento.bairro', est.bairro);
    fd.append('estabelecimento.cidade', est.cidade);
    fd.append('estabelecimento.estado', est.estado);
    fd.append('estabelecimento.cep', est.cep);
    (est.horarios || []).forEach(h => fd.append('estabelecimento.horarios', h));
  }

  (fotos || []).forEach((f, i) => {
    fd.append('fotos', f, f.name || `foto-${i}.jpg`);
  });

  return fd;
}

function CampoEstrelas({ rotulo, valor, onChange }) {
  const [hover, setHover] = useState(0);
  const atual = hover || valor;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-semibold text-[#3D2E1C]">{rotulo}</span>
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
    return () => u.forEach(u => URL.revokeObjectURL(u));
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

function SeletorFotos({ arquivos, setArquivos }) {
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

function AutocompleteNominatim({ id, valor, erro, mostrarErros, onChange, onSelect }) {
  const [sugs, setSugs] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [ativo, setAtivo] = useState(-1);
  const deb = useDebounce(valor, 400);
  const abortRef = useRef(null);

  useEffect(() => {
    if (!deb) {
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
        if (e.name !== 'AbortError') message.error(e);
      } finally {
        setCarregando(false);
      }
    })();
    return () => abortRef.current?.abort();
  }, [deb]);

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
            'bg-[#F2D7A0] placeholder:text-neutral-600 bg-amarelo-autofill',
            temErro ? 'border-red-500' : 'border-neutral-300'
          )}
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <FiMapPin className="h-4 w-4 text-neutral-700" />
        </span>
      </div>

      {((sugs.length && valor) || carregando) && (
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

export default function ModalAvaliacao({ open, onClose }) {
  const [textoLugar, setTextoLugar] = useState('');
  const [lugar, setLugar] = useState(null);

  const [item, setItem] = useState('');
  const [precoDigits, setPrecoDigits] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState('');

  const [tipoCategoria, setTipoCategoria] = useState('');
  const [notas, setNotas] = useState({ geral: 0, comida: 0, ambiente: 0, atendimento: 0 });
  const [fotos, setFotos] = useState([]);

  const [enviando, setEnviando] = useState(false);
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const erros = useMemo(() => {
    const e = {};
    if (!lugar) e.estabelecimento = 'Campo Estabelecimento é obrigatório';
    if (!item.trim()) e.item = 'Campo Item Consumido é obrigatório';
    if (!descricao.trim()) e.descricao = 'Campo Descrição é obrigatório';
    return e;
  }, [lugar, item, descricao]);

  useEffect(() => {
    if (!open) {
      setTextoLugar('');
      setLugar(null);
      setItem('');
      setPrecoDigits('');
      setDescricao('');
      setTags('');
      setTipoCategoria('');
      setNotas({ geral: 0, comida: 0, ambiente: 0, atendimento: 0 });
      setFotos([]);
      setEnviando(false);
      setTentouEnviar(false);
    }
  }, [open]);

  const selecionarLugar = s => {
    setLugar(s);
    setTextoLugar(s.display_name || '');
    setTipoCategoria(s.type || '');
  };

  const onKeyDownPreco = e => {
    const k = e.key;
    if (k === 'Backspace' || k === 'Delete') {
      e.preventDefault();
      setPrecoDigits(d => d.slice(0, -1));
      return;
    }
    if (/^[0-9]$/.test(k)) {
      e.preventDefault();
      setPrecoDigits(d => (d + k).replace(/^0+(?=\d)/, ''));
      return;
    }
    if (['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(k)) return;
    e.preventDefault();
  };
  const onPastePreco = e => {
    const dg = onlyDigits(e.clipboardData.getData('text'));
    if (!dg) return e.preventDefault();
    e.preventDefault();
    setPrecoDigits(dg);
  };

  const enviar = async e => {
    e.preventDefault();
    setTentouEnviar(true);
    if (Object.keys(erros).length) return;
    setEnviando(true);
    const fd = montaFormData({
      item,
      precoDigits,
      descricao,
      tags,
      notas,
      lugar,
      fotos,
    });
    criarAvaliacao(fd)
      .then(() => {
        message.success('Avaliação criada com sucesso!');
        onClose?.();
      })
      .catch(err => {
        message.error(err?.response?.data?.message || 'Falha ao salvar. Tente novamente.');
      })
      .finally(() => {
        setEnviando(false);
      });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3">
      <div className="w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-lg bg-[#F4E1C1] shadow-xl">
        <div className="relative px-4 py-3">
          <button
            type="button"
            onClick={onClose}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-black/5 text-black"
            aria-label="Voltar"
          >
            <FiArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-center text-lg font-extrabold text-[#3D2E1C]">Nova Avaliação</h2>
        </div>

        <div className="px-5 pb-4">
          <form onSubmit={enviar} className="space-y-3">
            <AutocompleteNominatim
              id="estabelecimento"
              valor={textoLugar}
              erro={erros.estabelecimento}
              mostrarErros={tentouEnviar}
              onChange={v => {
                setTextoLugar(v);
                if (!v) {
                  setLugar(null);
                  setTipoCategoria('');
                }
              }}
              onSelect={selecionarLugar}
            />

            <div>
              <label htmlFor="categoria" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Categoria
              </label>
              <input
                id="categoria"
                type="text"
                value={categorias(tipoCategoria) || '—'}
                disabled
                aria-disabled="true"
                className="w-full rounded-full border border-neutral-300
             bg-[#E9D3AE] text-neutral-800
             cursor-not-allowed px-4 py-2 text-sm disabled:opacity-100"
              />

              <input type="hidden" name="category_type" value={tipoCategoria} readOnly />
            </div>

            <div>
              <label htmlFor="item" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Item Consumido <span className="text-red-600">*</span>
              </label>
              <input
                id="item"
                value={item}
                onChange={e => setItem(e.target.value)}
                placeholder="Ex.: Cappuccino grande"
                className={j(
                  'w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600',
                  'bg-[#F2D7A0] placeholder:text-neutral-600',
                  tentouEnviar && erros.item ? 'border-red-500' : 'border-neutral-300'
                )}
              />
              {tentouEnviar && erros.item && <p className="mt-1 text-[11px] text-red-600">{erros.item}</p>}
            </div>

            <div>
              <label htmlFor="preco" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Preço
              </label>
              <input
                id="preco"
                type="text"
                inputMode="numeric"
                value={formatFromDigits(precoDigits)}
                onKeyDown={onKeyDownPreco}
                onPaste={onPastePreco}
                className="w-full rounded-full border border-neutral-300 bg-[#F2D7A0] px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label htmlFor="descricao" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Descrição <span className="text-red-600">*</span>
              </label>
              <textarea
                id="descricao"
                rows={4}
                value={descricao}
                onChange={e => setDescricao(e.target.value)}
                placeholder="Conte sua experiência..."
                className={j(
                  'w-full rounded-lg border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600 resize-none',
                  'bg-[#F2D7A0] placeholder:text-neutral-600',
                  tentouEnviar && erros.descricao ? 'border-red-500' : 'border-neutral-300'
                )}
              />
              {tentouEnviar && erros.descricao && <p className="mt-1 text-[11px] text-red-600">{erros.descricao}</p>}
            </div>
            <input
              id="tags"
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="Ex.: doce, barato, romântico"
              autoComplete="off"
              spellCheck={false}
              autoCorrect="off"
              autoCapitalize="off"
              name="tags_input_manual"
              inputMode="text"
              className="w-full rounded-full border border-neutral-300 bg-[#F2D7A0]
             px-4 py-2 text-sm text-black leading-tight outline-none
             focus:border-emerald-600 placeholder:text-neutral-600
             autofill:shadow-[inset_0_0_0_1000px_#F2D7A0] autofill:text-black"
            />

            <SeletorFotos arquivos={fotos} setArquivos={setFotos} />

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 pt-1">
              <CampoEstrelas
                rotulo="Nota Geral"
                valor={notas.geral}
                onChange={v => setNotas(r => ({ ...r, geral: v }))}
              />
              <CampoEstrelas
                rotulo="Comida"
                valor={notas.comida}
                onChange={v => setNotas(r => ({ ...r, comida: v }))}
              />
              <CampoEstrelas
                rotulo="Ambiente"
                valor={notas.ambiente}
                onChange={v => setNotas(r => ({ ...r, ambiente: v }))}
              />
              <CampoEstrelas
                rotulo="Atendimento"
                valor={notas.atendimento}
                onChange={v => setNotas(r => ({ ...r, atendimento: v }))}
              />
            </div>
            <div className="mt-2 mb-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-[#F2D7A0] px-6 py-2.5 text-sm font-semibold text-[#3D2E1C] shadow-inner hover:bg-[#E9CD92] active:scale-[.99] transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={enviando}
                className="rounded-full bg-[#C9342D] px-8 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#B22C24] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[.99] transition"
              >
                {enviando ? 'Salvando...' : 'Criar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
