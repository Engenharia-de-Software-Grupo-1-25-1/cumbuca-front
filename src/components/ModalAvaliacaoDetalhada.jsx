import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { obterAvaliacao, adicionarComentario } from '../services/avaliacaoService';
import { removerComentario } from '../services/comentarioService.js';
import { HiArrowLeft } from 'react-icons/hi2';
import { formatFromDigits } from './utils/utilsModal.helpers';
import { MdOutlineStorefront, MdOutlineComment } from 'react-icons/md';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaRegHeart, FaRegTrashAlt } from 'react-icons/fa';
import { Nota, InfoRow } from './utils/utilsModal.jsx';
import { useAuth } from '../features/auth/useAuth';
import { message } from 'antd';
import { coresTags } from './utils/coresTags';
import fotoDePerfilPadrao from '../assets/fotoDePerfilPadrao.webp';
import { FaHeart } from 'react-icons/fa6';

export default function ModalAvaliacaoDetalhada({ idAvaliacao, onClose, onAtualizar, onComment = () => {} }) {
  const { user } = useAuth();
  const [avaliacao, setAvaliacao] = useState(null);
  const [idx, setIdx] = useState(0);
  const [comment, setComment] = useState('');
  const [posting, setPosting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [curtindo, setCurtindo] = useState(false);

  const fetchData = useCallback(async () => {
    if (!idAvaliacao) return;
    try {
      const req = await obterAvaliacao(idAvaliacao);
      const comentarios = req.data.comentarios;
      setAvaliacao({ ...req.data, comentarios });
      setIdx(0);
    } catch (e) {
      console.error(e);
      message.error('Não foi possível carregar os detalhes da avaliação.');
    }
  }, [idAvaliacao]);

  const handleCurtida = useCallback(async () => {
    setCurtindo(true);
    if (!avaliacao?.id) return;
    try {
      await onAtualizar?.();
      await fetchData();
    } catch (e) {
      console.error(e);
      message.error('Não foi possível registrar a curtida.');
    } finally {
      setCurtindo(false);
    }
  }, [avaliacao?.id, fetchData, onAtualizar]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fotos = avaliacao?.fotos ?? [];
  const temFotos = fotos.length > 0;

  const prev = useCallback(() => {
    setIdx(i => (temFotos ? (i - 1 + fotos.length) % fotos.length : 0));
  }, [temFotos, fotos.length]);

  const next = useCallback(() => {
    setIdx(i => (temFotos ? (i + 1) % fotos.length : 0));
  }, [temFotos, fotos.length]);

  const onKey = useCallback(
    e => {
      if (e.key === 'ArrowLeft') prev?.();
      if (e.key === 'ArrowRight') next?.();
      if (e.key === 'Escape') onClose?.();
    },
    [prev, next, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onKey]);

  const likes = avaliacao?.qtdCurtidas ?? 0;
  const commentsCount = useMemo(() => avaliacao?.qtdComentarios, [avaliacao]);

  const srcFoto = s => (s?.startsWith('data:') ? s : `data:image/png;base64,${s}`);

  const handleComment = async () => {
    const texto = comment.trim();
    if (!texto) return;
    setPosting(true);
    try {
      const response = await adicionarComentario(idAvaliacao, texto);
      const novoTotal = (avaliacao?.qtdComentarios ?? 0) + 1;
      setComment('');
      setAvaliacao(old => ({
        ...old,
        comentarios: [
          ...(old?.comentarios ?? []),
          {
            id: response.data.id,
            comentario: texto,
            usuario: {
              id: user?.id,
              nome: user?.nome,
              username: user?.username,
              foto: user?.foto ?? null,
              status: user?.status,
            },
          },
        ],
        qtdComentarios: novoTotal,
      }));
      onComment?.(novoTotal);
    } catch (e) {
      console.error(e);
      message.error('Falha ao comentar. Tente novamente.');
    } finally {
      setPosting(false);
    }
  };

  const handleDelete = async idComentario => {
    setDeletingId(idComentario);
    try {
      await removerComentario(idComentario);
      const novoTotal = Math.max(0, (avaliacao?.qtdComentarios ?? 0) - 1);
      setAvaliacao(old => {
        const filtrados = (old?.comentarios ?? []).filter(c => c.id !== idComentario);
        return {
          ...old,
          comentarios: filtrados,
          qtdComentarios: novoTotal,
        };
      });
      onComment?.(novoTotal);
      message.success('Comentário excluído.');
    } catch (e) {
      console.error(e);
      message.error('Não foi possível excluir o comentário.');
    } finally {
      setDeletingId(null);
    }
  };

  if (!avaliacao) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={e => e.target === e.currentTarget && onClose?.()}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div
          className="relative z-10 w-[500px] max-w-[90vw] max-h-[92vh] overflow-hidden rounded-2xl shadow-xl bg-[#F4E1C1] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <p className="text-[#3D2E1C] font-semibold text-sm m-4">Carregando Detalhes da Avaliação...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={e => e.target === e.currentTarget && onClose?.()}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative z-10 w-[500px] max-w-[90vw] max-h-[92vh] overflow-hidden rounded-2xl shadow-xl bg-[#F4E1C1]"
        role="dialog"
        aria-modal="true"
      >
        <div className="px-3 py-2">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
              aria-label="Voltar"
              title="Voltar"
            >
              <HiArrowLeft className="h-5 w-5 text-[#3D2E1C]" />
            </button>

            <Link to={`/perfil/${avaliacao.usuario.username}`} className="flex-shrink-0">
              <img
                src={
                  avaliacao.usuario?.status === 'ATIVO'
                    ? avaliacao.usuario?.foto
                      ? `data:image/jpeg;base64,${avaliacao.usuario?.foto}`
                      : fotoDePerfilPadrao
                    : fotoDePerfilPadrao
                }
                className="rounded-full hover:brightness-90 transition duration-300 h-[40px] w-[40px] ring-1 ring-[#E9CD92] bg-[#E9D3AE]"
                alt={`Foto de perfil de ${avaliacao.usuario?.nome}`}
              />
            </Link>

            <div className="min-w-0">
              <Link
                to={`/perfil/${avaliacao.usuario.username}`}
                className="flex items-baseline gap-x-2 hover:no-underline translate-y-[6px]"
              >
                <p className="hover:underline text-[15px] font-semibold text-[#1E1E1E] truncate">
                  {avaliacao.usuario?.status === 'ATIVO' ? avaliacao.usuario?.nome : 'Usuário inativo'}
                </p>
                <p className="text-[13px] text-[#505050]">@{avaliacao.usuario?.username}</p>
              </Link>

              <div className="flex items-center gap-1 w-fit -translate-y-[8px]">
                <Link
                  to={`/estabelecimento/${avaliacao.estabelecimento.id}`}
                  className="flex items-center gap-1 text-current no-underline"
                >
                  <MdOutlineStorefront color="#356B2A" size={16} />
                  <p className="text-[13px] text-[#356B2A]">{avaliacao.estabelecimento?.nome}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-h-[calc(92vh-72px)] overflow-y-auto border-t border-neutral-300">
          <div className="px-4 pt-3">
            <p className="text-[13px] text-[#4a3a1b]">{avaliacao.descricao}</p>
            {temFotos && (
              <div className="mt-3 rounded-xl p-3 border border-neutral-300 bg-[#F6E4B8]">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#E9D3AE]">
                  <img
                    src={srcFoto(fotos[idx])}
                    alt={`Foto ${idx + 1} de ${fotos.length}`}
                    className="h-full w-full object-cover select-none"
                    draggable={false}
                  />

                  {temFotos && fotos.length > 1 && (
                    <>
                      <button
                        onClick={prev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white hover:bg-black/35"
                        aria-label="Imagem anterior"
                      >
                        <FiChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={next}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white hover:bg-black/35"
                        aria-label="Próxima imagem"
                      >
                        <FiChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {temFotos && fotos.length > 1 && (
                  <div className="mt-2 flex items-center justify-center gap-2">
                    {fotos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIdx(i)}
                        aria-label={`Ir para imagem ${i + 1}`}
                        className={`h-[3px] rounded-full transition-all ${idx === i ? 'w-10 bg-[#C84F2E]' : 'w-5 bg-[#E9D3AE]'}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="px-4 pt-3">
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[12px]">
              <Nota label="Nota Geral" valor={avaliacao.notaGeral} />
              <Nota label="Comida" valor={avaliacao.notaComida} />
              <Nota label="Ambiente" valor={avaliacao.notaAmbiente} />
              <Nota label="Atendimento" valor={avaliacao.notaAtendimento} />
              <InfoRow label="Preço" value={`R$ ${formatFromDigits(Number(avaliacao.preco ?? 0).toFixed(2))}`} />
              <InfoRow label="Item consumido" value={avaliacao.itemConsumido} />
            </div>
          </div>

          <div
            className="mt-3 flex items-center justify-between border-y px-4 py-2 text-[12px] border-neutral-300"
            style={{ color: '#7b6332' }}
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <button
                  className="flex items-center gap-1 text-base sm:text-base"
                  disabled={curtindo}
                  onClick={handleCurtida}
                >
                  {avaliacao.isCurtida ? (
                    <FaHeart size={16} className="text-red-600" />
                  ) : (
                    <FaRegHeart size={16} className="text-red-600" />
                  )}
                  <span className="text-sm leading-none">{likes}</span>
                </button>
              </span>
              <span className="inline-flex items-center gap-1">
                <MdOutlineComment className="h-4 w-4" color="#010101" />{' '}
                <span className="text-sm leading-none">{commentsCount}</span>
              </span>

              <div className="ml-2 flex flex-wrap items-center gap-2">
                {avaliacao.tags?.map((tag, index) => {
                  const cor = coresTags[index % coresTags.length];
                  return (
                    <span
                      key={tag}
                      className="px-2 rounded-full text-[12px] leading-5"
                      style={{
                        backgroundColor: cor.corFundo,
                        outlineWidth: '2px',
                        outlineStyle: 'solid',
                        outlineColor: cor.corDestaque,
                        color: '#3D2E1C',
                      }}
                    >
                      #{tag}
                    </span>
                  );
                })}
              </div>
            </div>

            <span className="text-[#7A6A4C]">
              {new Date(avaliacao.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
            </span>
          </div>

          <div className="px-4 py-6">
            <h3 className="text-sm font-semibold text-[#3D2E1C]">Comentários</h3>

            <div className="mt-2 rounded-xl border p-3 border-neutral-300 bg-[#F4E1C1]">
              <label className="block text-[11px] text-[#6C5A3E] mb-1">Adicionar comentário</label>
              <textarea
                placeholder="Escreva um comentário para esta avaliação..."
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full min-h-[44px] resize-none rounded-lg border px-3 py-2 text-[13px]
                           border-neutral-300 bg-[#F6E4B8] text-[#3D2E1C] placeholder:text-neutral-700
                           outline-none focus:border-emerald-600"
              />
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleComment}
                  disabled={posting || !comment.trim()}
                  className="rounded-full bg-[#C9342D] px-5 py-2 text-sm font-semibold text-white shadow
                             hover:bg-[#B22C24] active:scale-[.99]
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {posting ? 'Enviando…' : 'Comentar'}
                </button>
              </div>
            </div>

            <ul className="mt-4 space-y-3 mb-6">
              {(avaliacao.comentarios ?? []).map(c => {
                const meuComentario = user.id && c?.usuario?.id === user.id;
                const nome = c?.usuario?.nome;
                const username = c?.usuario?.username;
                return (
                  <li key={c.id} className="flex gap-3 items-start">
                    <img
                      src={
                        c?.usuario?.status === 'ATIVO'
                          ? c?.usuario?.foto
                            ? srcFoto(c.usuario.foto)
                            : fotoDePerfilPadrao
                          : fotoDePerfilPadrao
                      }
                      alt={username}
                      className="mt-1 h-8 w-8 rounded-full object-cover bg-[#E9D3AE] ring-1 ring-[#E9CD92]"
                    />

                    <div className="flex-1 min-w-0 rounded-xl p-3 bg-[#F4E1C1] border border-neutral-300">
                      <div className="flex items-start justify-between gap-3">
                        <div className="mb-1 text-sm text-[#3D2E1C] truncate">
                          <span className="font-semibold">
                            {c?.usuario?.status === 'ATIVO' ? nome : 'Usuário inativo'}
                          </span>{' '}
                          <span className="text-[#7A6A4C]">@{username}</span>
                        </div>

                        {meuComentario && (
                          <button
                            title="Excluir comentário"
                            className="shrink-0 rounded-full p-1 hover:bg-black/5"
                            onClick={() => handleDelete(c.id)}
                            disabled={deletingId === c.id}
                          >
                            <FaRegTrashAlt className="w-4 h-4" style={{ color: '#7B6132' }} />
                          </button>
                        )}
                      </div>

                      <div className="text-[#3D2E1C] text-sm whitespace-pre-wrap break-words">{c.comentario}</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
