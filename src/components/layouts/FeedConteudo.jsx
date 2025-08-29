import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { DataView } from 'primereact/dataview';
import { message } from 'antd';
import { getAvaliacoes } from '../../services/avaliacaoService';
import AvaliacaoBox from './AvaliacaoBox';

const LOTE = 8;

export default function FeedConteudo() {
  const [todas, setTodas] = useState([]);
  const [visiveis, setVisiveis] = useState(LOTE);
  const [loading, setLoading] = useState(false);

  const sentinelaRef = useRef(null);

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getAvaliacoes();
      setTodas(Array.isArray(data) ? data : []);
      setVisiveis(LOTE);
    } catch (e) {
      console.error(e);
      message.error('Não foi possível carregar o feed agora.');
      setTodas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  useEffect(() => {
    if (!sentinelaRef.current) return;
    const io = new IntersectionObserver(entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setVisiveis(v => Math.min(v + LOTE, todas.length));
      }
    });
    io.observe(sentinelaRef.current);
    return () => io.disconnect();
  }, [todas.length]);

  const lista = useMemo(() => todas.slice(0, visiveis), [todas, visiveis]);

  return (
    <div className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col">
      {loading && (
        <h2 className="text-center sm:text-[18px] md:text-[20px] lg:text-[20px] font-medium text-[#1e1e1e] p-2 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-4 animate-pulse">
          Carregando avaliações...
        </h2>
      )}

      {!loading && todas.length === 0 && (
        <h2 className="sm:text-[18px] md:text-[24px] lg:text-[24px] font-medium text-[#1e1e1e] p-2 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-4">
          Ainda não há avaliações no feed.
        </h2>
      )}

      {!loading && todas.length > 0 && (
        <>
          <DataView
            value={lista}
            itemTemplate={(avaliacao, index) => (
              <AvaliacaoBox key={`${avaliacao.id}-${index}`} avaliacao={avaliacao} onChange={carregar} />
            )}
            layout="list"
            className="scroll-dark mt-2"
            style={{ maxHeight: '60vh', overflowY: 'auto' }}
          />

          <div ref={sentinelaRef} style={{ height: 1 }} />
        </>
      )}
    </div>
  );
}
