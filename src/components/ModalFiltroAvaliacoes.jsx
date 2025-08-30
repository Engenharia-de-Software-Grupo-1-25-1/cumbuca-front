  import { useState, useEffect } from "react";
  import { FiArrowLeft } from 'react-icons/fi';
  import { j, formatFromDigits, onlyDigits } from './utils/utilsModal.helpers';
  import { CampoEstrelas, TagInput } from './utils/utilsModal';

  export default function ModalFiltroAvaliacao({open, onClose, onAplicar, filtros, ordenacao }) {
      const [usuarioNome, setUsuarioNome] = useState('');
      const [estabelecimentoNome, setEstabelecimentoNome] = useState('');
      const [itemConsumido, setItemConsumido] = useState('');
      const [tags, setTags] = useState([]);
      const [precoInicio, setPrecoInicio] = useState('');
      const [precoFim, setPrecoFim] = useState('');
      const [classificacao, setClassificacao] = useState('');
      const [notas, setNotas] = useState({ geral: 0, comida: 0, ambiente: 0, atendimento: 0 });
      
      useEffect(() => {
        if (open && filtros) {
          setUsuarioNome(filtros.usuario || '');
          setEstabelecimentoNome(filtros.estabelecimento || '');
          setItemConsumido(filtros.itemConsumido || '');
          setTags(filtros.tags || []);
          setPrecoInicio(filtros.precoInicio ? String(filtros.precoInicio) : '');
          setPrecoFim(filtros.precoFim ? String(filtros.precoFim) : '');
          setNotas({
            geral: filtros.notas?.geral || 0,
            comida: filtros.notas?.comida || 0,
            ambiente: filtros.notas?.ambiente || 0,
            atendimento: filtros.notas?.atendimento || 0,
          });

          if (ordenacao === "data") {
              setClassificacao("data");
          } else if (ordenacao === "notaGeral") {
              setClassificacao("maior-nota-geral");
          } else {
              setClassificacao("nenhum");
          }
        }
      }, [open, filtros, ordenacao]);

      const handleAplicarFiltros = () => {
        const filtros = {
          usuario: usuarioNome || '',
          estabelecimento: estabelecimentoNome || '',
          itemConsumido: itemConsumido || '',
          tags: tags || [],
          precoInicio: precoInicio/100 || null,
          precoFim: precoFim/100 || null,
          notas: notas,
        };

        const ordenacao = classificacao === "data" ? "data" : classificacao === "maior-nota-geral" ? "notaGeral" : null;

        if (onAplicar) {
          onAplicar(filtros, ordenacao);
        }

        console.log(filtros, ordenacao);
        onClose();
      };
      
      const handleRemover = () => {
        setUsuarioNome('');
        setEstabelecimentoNome('');
        setItemConsumido('');
        setTags([]);
        setPrecoInicio('');
        setPrecoFim('');
        setNotas({ geral: 0, comida: 0, ambiente: 0, atendimento: 0 });
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
                    <label htmlFor="usuarioNome" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                      Usuário 
                    </label>
                    <input
                      type="text"
                      id="usuarioNome"
                      value={usuarioNome}
                      onChange={(e) => setUsuarioNome(e.target.value)}
                      className={j('w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600','bg-[#F2D7A0]')}/>
                  </div>
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
                  <div>
                    <label htmlFor="itemConsumido" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                      Item Consumido
                    </label>
                    <input
                      type="text"
                      id="itemConsumido"
                      value={itemConsumido}
                      onChange={(e) => setItemConsumido(e.target.value)}
                      className="w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600 bg-[#F2D7A0]"/>
                  </div>
                  <TagInput tags={tags} setTags={setTags} />
                  <div className="mt-2 mb-2 flex items-center gap-3">
                    <div>
                      <label htmlFor="precoInicio" className="mb-1 block text-sm font-semibold text-[#3D2E1C]">
                        Preço <span className="block">De</span>
                      </label>
                      <input
                        id="precoInicio"
                        type="text"
                        inputMode="numeric"
                        value={`R$ ${formatFromDigits(precoInicio)}`}
                        onChange={() => {}}
                        onKeyDown={e => onKeyDownPreco(e, setPrecoInicio)}
                        onPaste={e => onPastePreco(e, setPrecoInicio)}
                        className="w-full rounded-full border border-neutral-300 bg-[#F2D7A0] px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="precoFim" className="mt-5 mb-1 block text-sm font-semibold text-[#3D2E1C]">
                        Até
                      </label>
                      <input
                        id="precoFim"
                        type="text"
                        inputMode="numeric"
                        value={`R$ ${formatFromDigits(precoFim)}`}
                        onChange={() => {}}
                        onKeyDown={e => onKeyDownPreco(e, setPrecoFim)}
                        onPaste={e => onPastePreco(e, setPrecoFim)}
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
                      onChange={(e) => setClassificacao(e.target.value)}
                      className={j('w-full rounded-full border px-4 py-2 text-sm text-black leading-tight outline-none focus:border-emerald-600','bg-[#F2D7A0]')}>
                      <option value="nenhum">Nenhum</option>
                      <option value="data">Data</option>
                      <option value="maior-nota-geral">Maior nota geral</option>
                    </select>
                  </div>
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