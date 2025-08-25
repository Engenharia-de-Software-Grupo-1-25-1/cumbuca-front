import React, { useEffect, useState } from "react";
import { getAvaliacao } from "../services/avaliacaoService";
import { HiArrowLeft, HiOutlineMapPin } from "react-icons/hi2";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiImage, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaHeart, FaRegComment } from "react-icons/fa";

export default function ModalAvaliacaoDetalhada({ idAvaliacao, onClose }) {
  const [avaliacao, setAvaliacao] = useState(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const resp = await getAvaliacao(idAvaliacao);
        console.log(getAvaliacao);
        if (mounted) {
          setAvaliacao(resp);
          setIdx(0);
        }
      } catch (e) {
        console.error(e);
      }
    }
    if (idAvaliacao) fetchData();
    return () => (mounted = false);
  }, [idAvaliacao]);

  useEffect(() => {
    if (!avaliacao?.fotos?.length) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [avaliacao, idx]);

  if (!avaliacao) return null;

  const fotos = avaliacao.fotos ?? [];
  const temFotos = fotos.length > 0;

  const likes = avaliacao.qtdCurtidas ?? 0

  const commentsCount = avaliacao.qtdComentarios ?? 0;

  const srcFoto = (s) => (s?.startsWith("data:") ? s : `data:image/png;base64,${s}`);
  const prev = () => setIdx((i) => (i - 1 + fotos.length) % fotos.length);
  const next = () => setIdx((i) => (i + 1) % fotos.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative z-10 w-[500px] max-w-[90vw] max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl bg-[#F4E2B8]"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between p-3">
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
            aria-label="Voltar"
            title="Voltar"
          >
            <HiArrowLeft className="h-5 w-5 text-[#5b4320]" />
          </button>

          <div className="text-center">
            <p className="text-[13px]" style={{ color: "#8a6a30" }}>
              <span className="font-semibold text-[#5b4320]">
                {avaliacao.usuario?.nome}
              </span>{" "}
              <span className="text-[#a0844f]">@{avaliacao.usuario?.username}</span>
            </p>
            <p className="text-[12px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#e7d3a6] px-2 py-[2px] text-[#8a6a30]">
                <HiOutlineMapPin className="h-3.5 w-3.5" />
                {avaliacao.estabelecimento?.nome}
              </span>
            </p>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
            aria-label="Mais opções"
            title="Mais opções"
          >
            <HiDotsHorizontal className="h-5 w-5 text-[#8a6a30]" />
          </button>
        </div>
        <div
          className="h-[calc(92vh-56px)] overflow-y-auto border-t border-[#e2cfa2]"
        >
          <div className="px-4 pt-3">
            <p className="text-[13px] text-[#4a3a1b]">
              {avaliacao.descricao}
            </p>

            <div
              className="mt-3 rounded-xl border-[] p-3 border-[#e2cfa2] bg-[#f7e7c3]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-[#ead7aa]">
                {temFotos ? (
                  <img
                    src={srcFoto(fotos[idx])}
                    alt={`Foto ${idx + 1} de ${fotos.length}`}
                    className="h-full w-full object-cover select-none"
                    draggable={false}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FiImage className="h-10 w-10 text-[#8a6a30]" />
                  </div>
                )}

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
                      className={`h-[3px] rounded-full transition-all ${
                        idx === i ? "w-8 bg-[#cc6a3b]" : "w-4 bg-[#d9c59a]"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="px-4 pt-3">
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[12px]">
              <Nota label="Nota Geral" valor={avaliacao.notaGeral} />
              <Nota label="Comida" valor={avaliacao.notaComida} />
              <Nota label="Ambiente" valor={avaliacao.notaAmbiente} />
              <Nota label="Atendimento" valor={avaliacao.notaAtendimento} />
              <InfoRow label="Preço" value={`R$ ${Number(avaliacao.preco ?? 0).toFixed(2)}`} />
              <InfoRow label="Item consumido" value={avaliacao.itemConsumido} />
            </div>
          </div>

          <div
            className="mt-3 flex items-center justify-between border-y px-4 py-2 text-[12px] border-[#e2cfa2]"
            style={{ color: "#7b6332" }}
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <FaHeart className="h-4 w-4 text-[#cc6a3b]" /> {likes}
              </span>
              <span className="inline-flex items-center gap-1">
                <FaRegComment className="h-4 w-4 text-[#8a6a30]" /> {commentsCount}
              </span>

              <div className="ml-2 flex flex-wrap items-center gap-2">
                {avaliacao.tags?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-[#f0dba9] px-2 py-[2px] text-[#6a5427]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <span className="text-[#9c844e]">
              {new Date(avaliacao.data).toLocaleDateString("pt-BR")}
            </span>
          </div>

          <div className="px-4 py-3">
            <h3 className="text-sm font-semibold text-[#5b4320]">Comentários</h3>
            <div
              className="mt-2 rounded-xl border p-2 border-[#e2cfa2] bg-[#f7e7c3]"
            >
              <label className="block text-[11px] text-[#7b6332]">
                Adicionar comentário
              </label>
              <textarea
                placeholder="Escreva um comentário para esta avaliação..."
                className="mt-1 min-h-[42px] w-full resize-none rounded-lg border px-3 py-2 text-[13px] placeholder:text-[#a48e5b] border-[#e2cfa2] text-[#4a3a1b] bg-[#f3e2bd]"
              />
              <div className="mt-2 flex justify-end">
                <button
                  className="rounded-full bg-[#cc6a3b] px-4 py-2 text-sm font-semibold text-white "
                >
                  Comentar
                </button>
              </div>
            </div>
            <ul className="mt-3 space-y-3">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-1 h-8 w-8 rounded-full bg-[#e7d3a6]" />
                  <div
                    className="flex-1 rounded-xl p-3 ring-1 bg-[#f6e6c1] border-[#ead7aa]"
                  >
                    <div className="mb-1 h-3 w-40 rounded bg-[#ead7aa]" />
                    <div className="h-3 w-64 rounded bg-[#ead7aa]" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Nota({ label, valor = 0 }) {
  return (
    <div className="flex items-center gap-2 text-[#6a5427]">
      <span className="w-[120px] shrink-0 font-semibold text-[#5b4320]">
        {label}
      </span>
      <div className="flex items-center gap-[2px]">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < Number(valor || 0)} />
        ))}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-2 text-[#6a5427]">
      <span className="w-[120px] shrink-0 font-semibold text-[#5b4320]">
        {label}
      </span>
      <span className="text-[#6a5427]">{value}</span>
    </div>
  );
}

function Star({ filled }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={filled ? "#f29b38" : "#e0cf9f"}
      />
    </svg>
  );
}
