import { FaExclamationTriangle } from 'react-icons/fa';

export default function ModalExcluirAvaliacao({
  open,
  title = 'Excluir Avaliação',
  message = 'Tem certeza que deseja excluir esta avaliação?',
  onCancel,
  onConfirm,
  loading,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000]">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      <div className="absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-[#d8a35b] bg-[#f4e1b6] p-5 shadow-xl">
        <button
          onClick={onCancel}
          className="absolute right-3 top-3 text-[#7a4a1f] text-xl leading-none"
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-[#f9c56d]">
          <FaExclamationTriangle className="text-[#a63b1f]" size={28} />
        </div>

        <h2 className="mb-1 text-center text-xl font-extrabold text-[#1e1e1e]">{title}</h2>
        <p className="mb-4 text-center text-[#1e1e1e]">{message}</p>

        <div className="mt-2 flex justify-between gap-2">
          <button
            onClick={onCancel}
            className="flex-1 rounded-full border-2 border-[#7a4a1f] px-4 py-2 font-medium text-[#1e1e1e] hover:bg-[#f3d7a2]"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-full bg-[#d4490c] px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60"
            disabled={loading}
          >
            {'Excluir'}
          </button>
        </div>
      </div>
    </div>
  );
}
