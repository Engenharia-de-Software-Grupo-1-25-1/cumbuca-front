import React, { useEffect, useMemo, useState } from 'react';
import categorias from '../utils/categorias';
import { FiArrowLeft } from 'react-icons/fi';
import { criarAvaliacao, obterAvaliacao, atualizarAvaliacao } from '../services/avaliacaoService';
import { message } from 'antd';
import {
  j,
  onlyDigits,
  formatFromDigits,
  dotFixedToDigits,
  tagsToArray,
  montaFormData,
  base64ToFile,
} from './utils/utilsModal.helpers';
import { TagInput, CampoEstrelas, SeletorFotos, AutocompleteNominatim } from './utils/utilsModal';

export default function ModalAvaliacao({ open, onClose, editar = false, avaliacaoId = null, onEditSuccess }) {
  const [textoLugar, setTextoLugar] = useState('');
  const [lugar, setLugar] = useState(null);

  const [item, setItem] = useState('');
  const [precoDigits, setPrecoDigits] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tags, setTags] = useState([]);

  const [tipoCategoria, setTipoCategoria] = useState('');
  const [notas, setNotas] = useState({ geral: 0, comida: 0, ambiente: 0, atendimento: 0 });
  const [fotos, setFotos] = useState([]);

  const [enviando, setEnviando] = useState(false);
  const [tentouEnviar, setTentouEnviar] = useState(false);
  const [carregandoEdicao, setCarregandoEdicao] = useState(false);

  const erros = useMemo(() => {
    const e = {};
    if (!lugar) e.estabelecimento = 'Campo Estabelecimento é obrigatório';
    if (!item.trim()) e.item = 'Campo Item Consumido é obrigatório';
    if (!descricao.trim()) e.descricao = 'Campo Descrição é obrigatório';
    if (!notas['geral']) e.geral = 'Campo Nota Geral é obrigatório';
    if (!notas['comida']) e.comida = 'Campo Comida é obrigatório';
    if (!notas['ambiente']) e.ambiente = 'Campo Ambiente é obrigatório';
    if (!notas['atendimento']) e.atendimento = 'Campo Atendimento é obrigatório';
    return e;
  }, [lugar, item, descricao, notas]);

  useEffect(() => {
    if (!open) {
      setTextoLugar('');
      setLugar(null);
      setItem('');
      setPrecoDigits('');
      setDescricao('');
      setTags([]);
      setTipoCategoria('');
      setNotas({ geral: 0, comida: 0, ambiente: 0, atendimento: 0 });
      setFotos([]);
      setEnviando(false);
      setTentouEnviar(false);
      setCarregandoEdicao(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !editar || !avaliacaoId) return;
    (async () => {
      try {
        setCarregandoEdicao(true);

        const resp = await obterAvaliacao(avaliacaoId);
        const data = resp && resp.data ? resp.data : resp;

        if (!data || typeof data !== 'object') {
          throw new Error('Resposta inválida ao obter avaliação');
        }

        setItem(data.itemConsumido || '');
        setDescricao(data.descricao || '');

        const precoBruto = data.preco;
        setPrecoDigits(dotFixedToDigits(precoBruto));

        const tagsNormalizadas = Array.isArray(data.tags)
          ? data.tags.filter(Boolean).map(t => String(t).replace(/^#/, '').trim())
          : tagsToArray(data.tags);
        setTags(tagsNormalizadas);

        const est = data.estabelecimento || {};
        const displayName = [est.nome, est.rua ? `${est.rua} ${est.numero || ''}` : null, est.cidade, est.estado]
          .filter(Boolean)
          .join(', ');

        const lugarCarregado = {
          place_id: est.id || Date.now(),
          type: est.categoria || '',
          name: est.nome || '',
          display_name: displayName,
          address: {
            [est.categoria || '']: est.nome || '',
            road: est.rua || '',
            house_number: est.numero || '',
            suburb: est.bairro || '',
            city: est.cidade || '',
            state: est.estado || '',
            postcode: est.cep || '',
          },
        };
        setLugar(lugarCarregado);
        setTextoLugar(lugarCarregado.display_name);
        setTipoCategoria(lugarCarregado.type || '');

        const toNum = v => (v === undefined || v === null || v === '' ? 0 : Number(v));
        setNotas({
          geral: toNum(data.notaGeral),
          comida: toNum(data.notaComida),
          ambiente: toNum(data.notaAmbiente),
          atendimento: toNum(data.notaAtendimento),
        });

        const fotosDaApi = Array.isArray(data.fotos) ? data.fotos : [];
        const arquivos = fotosDaApi.map(b64 => base64ToFile(b64, undefined)).filter(Boolean);

        setFotos(arquivos);
      } catch (err) {
        message.error(err.response.data || err.message || 'Não foi possível carregar a avaliação para edição.');
      } finally {
        setCarregandoEdicao(false);
      }
    })();
  }, [open, editar, avaliacaoId]);

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
    const acao = editar ? atualizarAvaliacao(avaliacaoId, fd) : criarAvaliacao(fd);
    acao
      .then(() => {
        message.success(editar ? 'Avaliação editada com sucesso!' : 'Avaliação criada com sucesso!');
        onEditSuccess?.();
        onClose?.();
      })
      .catch(err => {
        message.error(err?.response?.data || 'Falha ao salvar. Tente novamente.');
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
          <h2 className="text-center text-lg font-extrabold text-[#3D2E1C]">
            {editar ? 'Editar Avaliação' : 'Nova Avaliação'}
          </h2>
        </div>

        <div className="px-5 pb-4">
          {carregandoEdicao ? (
            <div className="py-10 text-center text-sm text-neutral-700">Carregando dados…</div>
          ) : (
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
                onEdit={editar}
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
                  onChange={onPastePreco}
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

              <TagInput tags={tags} setTags={setTags} />

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
                  {enviando ? 'Salvando...' : editar ? 'Editar' : 'Criar'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
