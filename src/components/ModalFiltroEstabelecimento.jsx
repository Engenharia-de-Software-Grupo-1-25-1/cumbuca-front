import { useState, useEffect, useCallback } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { j } from './utils/utilsModal.helpers';
import { CampoEstrelas } from './utils/utilsModal';
import SelectCategorias from './utils/selectCategorias';

export default function ModalFiltroEstabelecimento({ open, onClose, onAplicar, filtros, ordenador }) {
  const [estabelecimentoNome, setEstabelecimentoNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [nota, setNota] = useState(0);
  const [ordenarMaisAvaliacoes, setOrdenarMaisAvaliacoes] = useState(false);
  const [curtido, setCurtido] = useState(false);

  useEffect(() => {
    if (open && filtros) {
      setEstabelecimentoNome(filtros.nome || '');
      setCategoria(filtros.categoria || '');
      setLocalizacao(filtros.localizacao || '');
      setNota(filtros.notaGeral || 0);
      setCurtido(filtros.isFavoritado || false);

      setOrdenarMaisAvaliacoes(ordenador === 'qtdAvaliacoes');
    }
  }, [open, filtros, ordenador]);

  const handleAplicarFiltros = () => {
    const filtrosAplicar = {
      nome: estabelecimentoNome || '',
      categoria: categoria || '',
      localizacao: localizacao || '',
      isFavoritado: !!curtido,
      notaGeral: nota > 0 ? nota : null,
    };

    const ordenadorAplicar = ordenarMaisAvaliacoes ? 'qtdAvaliacoes' : null;

    onAplicar?.(filtrosAplicar, ordenadorAplicar);
    onClose?.();
  };

  const handleNotaChange = useCallback(v => setNota(v), []);

  const handleRemover = () => {
    setEstabelecimentoNome('');
    setCategoria('');
    setLocalizacao('');
    setNota(0);
    setCurtido(false);
    setOrdenarMaisAvaliacoes(false);
    const filtrosAplicar = {
      nome: '',
      categoria: '',
      localizacao: '',
      isFavoritado: false,
      notaGeral: 0,
    };

    onAplicar?.(filtrosAplicar, null);
    onClose?.();
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

            <SelectCategorias categoria={categoria} setCategoria={setCategoria} />

            <div>
              <label htmlFor="localizacao" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                Localização
              </label>
              <input
                type="text"
                id="localizacao"
                value={localizacao}
                placeholder="Digite a localização do estabelecimento"
                onChange={e => setLocalizacao(e.target.value)}
                className="w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600 bg-[#F2D7A0] placeholder-gray-700"
              />
            </div>

            <div>
              <span className="mb-1 block text-sm font-semibold text-[#3D2E1C]">Classificar Por</span>
              <label
                htmlFor="chk-mais-avaliacoes"
                className={j(
                  'inline-flex items-center gap-2 rounded-full border px-4 py-2 cursor-pointer',
                  'bg-[#F2D7A0] select-none'
                )}
              >
                <input
                  id="chk-mais-avaliacoes"
                  type="checkbox"
                  checked={ordenarMaisAvaliacoes}
                  onChange={e => setOrdenarMaisAvaliacoes(e.target.checked)}
                  className="h-4 w-4 accent-[#356b2a]"
                />
                <span className="text-sm text-black">Mais Avaliações</span>
              </label>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-3 pt-1">
              <CampoEstrelas rotulo="Nota Geral" valor={nota} onChange={handleNotaChange} obrigatorio={false} />
              <div>
                <label htmlFor="curtido" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                  Favoritos
                </label>
                <button
                  id="curtido"
                  type="button"
                  className="flex items-center flex-shrink-0 mt-3"
                  onClick={() => setCurtido(!curtido)}
                  aria-pressed={curtido}
                >
                  {curtido ? <FaHeart size={20} fill="red" /> : <FaHeart size={20} fill="grey" />}
                </button>
              </div>
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
                type="button"
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
