import { useState, useEffect } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import { FaHeart } from "react-icons/fa";
import {j} from './utils/utilsModal.helpers';
import { CampoEstrelas } from './utils/utilsModal';
import SelectCategorias from "./utils/selectCategorias";

export default function ModalFiltroEstabelecimento({open, onClose, onAplicar, filtros, ordenador}) {
    const [estabelecimentoNome, setEstabelecimentoNome] = useState('');
    const [categoria, setCategoria] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [nota, setNota] = useState(0);
    const [classificacao, setClassificacao] = useState('');
    const [curtido, setCurtido] = useState(false);
   
    useEffect(() => {
        if (open && filtros) {
        setEstabelecimentoNome(filtros.nome || '');
        setCategoria(filtros.categoria || '');
        setLocalizacao(filtros.local || '');
        setNota(filtros.notaGeral || 0);
        setCurtido(filtros.favoritado || false);

        if (ordenador === "qtdAvaliacoes") {
            setClassificacao("mais-avaliado");
        } else {
            setClassificacao("nenhum");
        }
        }
    }, [open, filtros, ordenador]);

    const handleAplicarFiltros = () => {
      const filtros = {
        nome: estabelecimentoNome || '',
        categoria: categoria || '',
        local: localizacao || '',
        favoritado: curtido ? true : false,
        notaGeral: nota > 0 ? nota : null,
      };

      const ordenador = classificacao === "mais-avaliado" ? "qtdAvaliacoes" : null;

      if (onAplicar) {
        onAplicar(filtros, ordenador);
      }
      onClose();
    };
    const handleRemover = () => {
      setEstabelecimentoNome('');
      setCategoria('');
      setLocalizacao('');
      setNota(0);
      setClassificacao('');
      setCurtido(false);
    };

    return open && (
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
                <h2 className="text-center text-lg font-extrabold text-white">
                  Filtrar
                </h2>
            </div> 
            <div className="space-y-4 px-5 py-5">
                <div>
                  <label htmlFor="estabelecimentoNome" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                    Estabelecimento 
                  </label>
                  <input
                    type="text"
                    id="estabelecimentoNome"
                    value={estabelecimentoNome}
                    onChange={(e) => setEstabelecimentoNome(e.target.value)}
                    className={j('w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600','bg-[#F2D7A0]')}/>
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
                    onChange={(e) => setLocalizacao(e.target.value)}
                    className="w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600 bg-[#F2D7A0]"/>
                </div>
                <div>
                  <label htmlFor="classificacao" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                    Classificar Por
                  </label>
                  <select
                    id="classificacao"
                    value={classificacao}
                    onChange={(e) => setClassificacao(e.target.value)}
                    className={j('w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600','bg-[#F2D7A0]')}>
                    <option value="nenhum">Nenhum</option>
                    <option value="mais-avaliado">Mais Avaliações</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-x-10 gap-y-3 pt-1">
                  <CampoEstrelas
                    rotulo="Nota Geral"
                    valor={nota}
                    onChange={v => setNota(v)}
                  />
                  <label htmlFor="curtido" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                    Favoritos
                    <button className="flex items-center flex-shrink-0 mt-3" onClick={() => setCurtido(!curtido)}> 
                      {curtido ? (<FaHeart size={20} fill='red' />) : (<FaHeart size={20} fill='grey' />)}
                    </button>
                  </label>
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
    );
}