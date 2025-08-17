import React, { useEffect, useState } from "react";
import { getAvaliacao } from "../services/avaliacaoService";

export default function ModalAvaliacaoDetalhada({ idAvaliacao, onClose }) {
  const [avaliacao, setAvaliacao] = useState(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      try {
        const resp = await getAvaliacao(idAvaliacao);
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

  // Atalhos de teclado para o carrossel
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

  console.log(avaliacao);
  const fotos = avaliacao.fotos ?? [];
  const temFotos = fotos.length > 0;

  const srcFoto = (s) =>
    s?.startsWith("data:") ? s : `data:image/png;base64,${s}`;

  const prev = () =>
    setIdx((i) => (i - 1 + fotos.length) % fotos.length);
  const next = () => setIdx((i) => (i + 1) % fotos.length);

  const corFundo = "#F4E2B8";
  const corBorda = "#e2cfa2";
  const corTexto = "#4a3a1b";
  const corTexto2 = "#7b6332";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        className="relative z-10 w-[360px] max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl"
        style={{ backgroundColor: corFundo }}
        role="dialog"
        aria-modal="true"
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-3">
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
            aria-label="Voltar"
            title="Voltar"
          >
            <IconBack />
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
                <IconPin className="h-3 w-3" />
                {avaliacao.estabelecimento?.nome}
              </span>
            </p>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
            aria-label="Mais opções"
            title="Mais opções"
          >
            <IconDots />
          </button>
        </div>

        {/* Corpo */}
        <div
          className="h-[calc(92vh-56px)] overflow-y-auto border-t"
          style={{ borderColor: corBorda }}
        >
          {/* Texto e Carrossel */}
          <div className="px-4 pt-3">
            <p className="text-[13px]" style={{ color: corTexto }}>
              {avaliacao.descricao}
            </p>

            <div
              className="mt-3 rounded-xl border p-3"
              style={{ borderColor: corBorda, backgroundColor: "#f7e7c3" }}
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
                    <IconImage className="h-10 w-10 text-[#8a6a30]" />
                  </div>
                )}

                {/* Controles */}
                {temFotos && fotos.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white hover:bg-black/35"
                      aria-label="Imagem anterior"
                    >
                      <IconChevronLeft />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/25 p-2 text-white hover:bg-black/35"
                      aria-label="Próxima imagem"
                    >
                      <IconChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* Indicadores */}
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

          {/* Notas + Preço/Item */}
          <div className="px-4 py-3">
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[12px]">
              <Nota label="Nota Geral" valor={avaliacao.notaGeral} />
              <Nota label="Comida" valor={avaliacao.notaComida} />
              <Nota label="Ambiente" valor={avaliacao.notaAmbiente} />
              <Nota label="Atendimento" valor={avaliacao.notaAtendimento} />
            </div>

            <div
              className="mt-2 grid grid-cols-2 gap-2 text-[12px]"
              style={{ color: corTexto2 }}
            >
              <div>
                <span className="font-semibold text-[#5b4320]">Preço: </span>
                R$ {Number(avaliacao.preco ?? 0).toFixed(2)}
              </div>
              <div className="text-right">
                <span className="font-semibold text-[#5b4320]">
                  Item consumido:{" "}
                </span>
                {avaliacao.itemConsumido}
              </div>
            </div>
          </div>

          {/* Rodapé com tags e data */}
          <div
            className="flex items-center justify-between border-y px-4 py-2 text-[12px]"
            style={{ borderColor: corBorda, color: "#7b6332" }}
          >
            <div className="flex flex-wrap items-center gap-2">
              {avaliacao.tags?.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-[#f0dba9] px-2 py-[2px] text-[#6a5427]"
                >
                  #{t}
                </span>
              ))}
            </div>
            <span className="text-[#9c844e]">
              {new Date(avaliacao.data).toLocaleDateString("pt-BR")}
            </span>
          </div>

          {/* Seção Comentários (visual) */}
          <div className="px-4 py-3">
            <h3 className="text-sm font-semibold text-[#5b4320]">Comentários</h3>
            <div
              className="mt-2 rounded-xl border p-2"
              style={{ borderColor: corBorda, backgroundColor: "#f7e7c3" }}
            >
              <label className="block text-[11px] text-[#7b6332]">
                Adicionar comentário
              </label>
              <textarea
                disabled
                placeholder="Escreva um comentário para esta avaliação..."
                className="mt-1 min-h-[42px] w-full resize-none rounded-lg border px-3 py-2 text-[13px] placeholder:text-[#a48e5b]"
                style={{
                  borderColor: corBorda,
                  backgroundColor: "#f3e2bd",
                  color: corTexto,
                  cursor: "not-allowed",
                }}
              />
              <div className="mt-2 flex justify-end">
                <button
                  disabled
                  className="rounded-full bg-[#cc6a3b] px-4 py-2 text-sm font-semibold text-white opacity-70"
                >
                  Comentar
                </button>
              </div>
            </div>

            {/* Skeleton comentários (apenas visual) */}
            <ul className="mt-3 space-y-3">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-1 h-8 w-8 rounded-full bg-[#e7d3a6]" />
                  <div
                    className="flex-1 rounded-xl p-3 ring-1"
                    style={{ backgroundColor: "#f6e6c1", borderColor: "#ead7aa" }}
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

/* --- Subcomponentes visuais --- */
function Nota({ label, valor = 0 }) {
  return (
    <div className="flex items-center gap-2 text-[#6a5427]">
      <span className="w-[95px] shrink-0 font-semibold text-[#5b4320]">
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

/* --- Ícones --- */
function IconBack(props) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#5b4320]" {...props}>
      <path
        d="M20 12H6m0 0 6-6M6 12l6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconDots(props) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#8a6a30]" {...props}>
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
}
function IconPin(props) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" {...props}>
      <path
        d="M12 2C8.7 2 6 4.7 6 8c0 4.3 6 12 6 12s6-7.7 6-12c0-3.3-2.7-6-6-6Zm0 8.2a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4Z"
        fill="#8a6a30"
      />
    </svg>
  );
}
function IconImage(props) {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8" {...props}>
      <path
        d="M21 19V5a2 2 0 0 0-2-2H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2ZM8.5 11.5 11 14l2.5-3 4.5 6H6l2.5-5.5Z"
        fill="#8a6a30"
      />
    </svg>
  );
}
function IconChevronLeft(props) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...props}>
      <path
        d="M15 19 8 12l7-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconChevronRight(props) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" {...props}>
      <path
        d="m9 5 7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
