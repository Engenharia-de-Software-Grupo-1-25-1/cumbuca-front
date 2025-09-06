import { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { j, formatFromDigits, onlyDigits } from './utils/utilsModal.helpers';
import { CampoEstrelas, TagInput } from './utils/utilsModal';

export default function ModalFiltroAvaliacao({ open, onClose, onAplicar, filtros, ordenacao }) {
  const [usuarioNome, setUsuarioNome] = useState('');
  const [estabelecimentoNome, setEstabelecimentoNome] = useState('');
  const [itemConsumido, setItemConsumido] = useState('');
  const [tags, setTags] = useState([]);
  const [precoMinimo, setPrecoMinimo] = useState('');
  const [precoMaximo, setPrecoMaximo] = useState('');
  const [classificacao, setClassificacao] = useState('');
  const [notas, setNotas] = useState({ notaGeral: 0, notaComida: 0, notaAmbiente: 0, notaAtendimento: 0 });

  useEffect(() => {
    if (open && filtros) {
      setUsuarioNome(filtros.usuario || '');
      setEstabelecimentoNome(filtros.estabelecimento || '');
      setItemConsumido(filtros.itemConsumido || '');
      setTags(prevTags => (prevTags.length === 0 ? filtros.tags || [] : prevTags));
      setPrecoMinimo(filtros.precoMinimo ? String(filtros.precoMinimo) : '');
      setPrecoMaximo(filtros.precoMaximo ? String(filtros.precoMaximo) : '');
      setNotas({
        notaGeral: filtros.notas?.notaGeral || 0,
        notaComida: filtros.notas?.notaComida || 0,
        notaAmbiente: filtros.notas?.notaAmbiente || 0,
        notaAtendimento: filtros.notas?.notaAtendimento || 0,
      });
      setClassificacao(ordenacao === 'popularidade' || ordenacao === 'notaGeral' ? ordenacao : '');
    }
  }, [open, filtros, ordenacao]);

  const handleAplicarFiltros = () => {
    const filtros = {
      usuario: usuarioNome || '',
      estabelecimento: estabelecimentoNome || '',
      itemConsumido: itemConsumido || '',
      tags: tags || [],
      precoMinimo: precoMinimo / 100 || null,
      precoMaximo: precoMaximo / 100 || null,
      notas: notas,
    };

    onAplicar?.(filtros, classificacao);

    onClose();
  };

  const handleRemover = () => {
    setUsuarioNome('');
    setEstabelecimentoNome('');
    setItemConsumido('');
    setTags([]);
    setPrecoMinimo('');
    setPrecoMaximo('');
    setNotas({ notaGeral: 0, notaComida: 0, notaAmbiente: 0, notaAtendimento: 0 });
    const filtros = {
      usuario: '',
      estabelecimento: '',
      itemConsumido: '',
      tags: [],
      precoMinimo: null,
      precoMaximo: null,
      notas: { notaGeral: 0, notaComida: 0, notaAmbiente: 0, notaAtendimento: 0 },
    };

    onAplicar?.(filtros, classificacao);
    onClose();
  };

  const onKeyDownPreco = (e, setPreco) => {
    const k = e.key;
    if (k === 'Backspace' || k === 'Delete') {
      e.preventDefault();
      setPreco(d => d.slice(0, -1));
      return;
    }
    if (/^[0-9]$/.test(k)) {
      e.preventDefault();
      setPreco(d => (d + k).replace(/^0+(?=\d)/, ''));
      return;
    }
    if (['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(k)) return;
    e.preventDefault();
  };

  const onPastePreco = (e, setPreco) => {
    const dg = onlyDigits(e.clipboardData.getData('text'));
    if (!dg) return e.preventDefault();
    e.preventDefault();
    setPreco(dg);
  };

  return (
    open && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-3">
        <div className="w-full max-w-[480px] max-h-[90vh] overflow-y-auto rounded-lg bg-[#F4E1C1] shadow-xl">
          <div className="relative px-5 py-3 bg-[#db520a]">
            <button
              type="button"
              onClick={onClose}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-black/5 text-white"
              aria-label="Voltar"
            >
              <FiArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-center text-lg font-extrabold text-white">Filtrar</h2>
          </div>
          <div className="space-y-4 px-5 py-5">
            <div>
              <label htmlFor="usuarioNome" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Usuário
              </label>
              <input
                type="text"
                id="usuarioNome"
                placeholder="Digite o nome do usuário"
                value={usuarioNome}
                onChange={e => setUsuarioNome(e.target.value)}
                className={j(
                  'w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600',
                  'bg-[#F2D7A0]',
                  'placeholder-gray-700'
                )}
              />
            </div>
            <div>
              <label htmlFor="estabelecimentoNome" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Estabelecimento
              </label>
              <input
                type="text"
                id="estabelecimentoNome"
                placeholder="Digite o nome do estabelecimento"
                value={estabelecimentoNome}
                onChange={e => setEstabelecimentoNome(e.target.value)}
                className={j(
                  'w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600',
                  'bg-[#F2D7A0]',
                  'placeholder-gray-700'
                )}
              />
            </div>
            <div>
              <label htmlFor="itemConsumido" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Item Consumido
              </label>
              <input
                type="text"
                id="itemConsumido"
                placeholder="Digite o item consumido"
                value={itemConsumido}
                onChange={e => setItemConsumido(e.target.value)}
                className="w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600 bg-[#F2D7A0] placeholder-gray-700"
              />
            </div>
            <TagInput tags={tags} setTags={setTags} />
            <div className="mt-2 mb-2 flex items-center gap-3">
              <div>
                <label htmlFor="precoMinimo" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                  Preço <span className="block">De</span>
                </label>
                <input
                  id="precoMinimo"
                  type="text"
                  inputMode="numeric"
                  value={`R$ ${formatFromDigits(precoMinimo)}`}
                  onChange={() => {}}
                  onKeyDown={e => onKeyDownPreco(e, setPrecoMinimo)}
                  onPaste={e => onPastePreco(e, setPrecoMinimo)}
                  className="w-full rounded-full border border-neutral-300 bg-[#F2D7A0] px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600"
                />
              </div>
              <div>
                <label htmlFor="precoMaximo" className="mt-5 mb-1 block text-sm font-semibold text-[#3D2E1C]">
                  Até
                </label>
                <input
                  id="precoMaximo"
                  type="text"
                  inputMode="numeric"
                  value={`R$ ${formatFromDigits(precoMaximo)}`}
                  onChange={() => {}}
                  onKeyDown={e => onKeyDownPreco(e, setPrecoMaximo)}
                  onPaste={e => onPastePreco(e, setPrecoMaximo)}
                  className="w-full rounded-full border border-neutral-300 bg-[#F2D7A0] px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600"
                />
              </div>
            </div>
            <div>
              <label htmlFor="classificacao" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Classificar Por
              </label>
              <select
                id="classificacao"
                value={classificacao}
                onChange={e => setClassificacao(e.target.value)}
                className={j(
                  'w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600',
                  'bg-[#F2D7A0]'
                )}
              >
                <option value={null}>Data</option>
                <option value="popularidade">Popularidade</option>
                <option value="notaGeral">Maior nota geral</option>
              </select>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-1">
              <CampoEstrelas
                rotulo="Nota Geral"
                valor={notas.notaGeral}
                onChange={v => setNotas(r => ({ ...r, notaGeral: v }))}
                obrigatorio={false}
              />
              <CampoEstrelas
                rotulo="Comida"
                valor={notas.notaComida}
                onChange={v => setNotas(r => ({ ...r, notaComida: v }))}
                obrigatorio={false}
              />
              <CampoEstrelas
                rotulo="Ambiente"
                valor={notas.notaAmbiente}
                onChange={v => setNotas(r => ({ ...r, notaAmbiente: v }))}
                obrigatorio={false}
              />
              <CampoEstrelas
                rotulo="Atendimento"
                valor={notas.notaAtendimento}
                onChange={v => setNotas(r => ({ ...r, notaAtendimento: v }))}
                obrigatorio={false}
              />
            </div>
            <div className="mt-2 mb-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleRemover}
                className="rounded-full bg-[#c92f0d] px-7 py-2.5 text-sm font-semibold text-white shadow-inner hover:bg-[#9B270E] active:scale-[.99] transition"
              >
                Remover
              </button>
              <button
                type="submit"
                onClick={handleAplicarFiltros}
                className="rounded-full bg-[#356b2a] px-8 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#2A5523] disabled:opacity-60 disabled:cursor-not-allowed active:scale-[.99] transition"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
