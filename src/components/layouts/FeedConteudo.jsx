import { forwardRef, useImperativeHandle, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { DataView } from 'primereact/dataview';
import { message } from 'antd';
import { getAvaliacoes } from '../../services/avaliacaoService';
import AvaliacaoBox from './AvaliacaoBox';

const PAGE_SIZE = 10;

const FeedConteudo = forwardRef(({ filtros, ordenador, onSelecionarTag, onAtualizarTags }, ref) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaging, setIsPaging] = useState(false);

  const scrollContainerRef = useRef(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: rows } = await getAvaliacoes(filtros, ordenador);
      setData(rows || []);
      setLimit(Math.min(PAGE_SIZE, (rows || []).length));
    } catch (err) {
      console.error(err);
      message.error('Não foi possível carregar o Feed!');
      setData([]);
      setLimit(0);
    } finally {
      setIsLoading(false);
    }
  }, [filtros, ordenador]);

  useImperativeHandle(ref, () => ({
    fetchAll,
  }));

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const visibleItems = useMemo(() => data.slice(0, limit), [data, limit]);
  const reachedEnd = limit >= data.length && data.length > 0;

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const threshold = 120;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (isPaging || reachedEnd) return;

        const { scrollTop, clientHeight, scrollHeight } = el;
        const nearBottom = scrollTop + clientHeight >= scrollHeight - threshold;

        if (nearBottom && limit < data.length) {
          setIsPaging(true);
          setLimit(curr => Math.min(curr + PAGE_SIZE, data.length));
          setTimeout(() => setIsPaging(false), 250);
        }
      });
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener('scroll', onScroll);
  }, [data.length, limit, isPaging, reachedEnd]);

  return (
    <div
      className="bg-[#bc6302] w-[80%] rounded-[10px] py-4 px-6 max-w-[728px] flex flex-col"
      style={{ minHeight: 'calc(100vh - 220px)' }}
    >
      {isLoading && (
        <h2 className="text-center sm:text-[18px] md:text-[20px] lg:text-[20px] font-medium text-[#1e1e1e] p-2 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-4 animate-pulse">
          Carregando avaliações...
        </h2>
      )}

      {!isLoading && data.length === 0 && (
        <h2 className="sm:text-[18px] md:text-[24px] lg:text-[24px] font-medium text-[#1e1e1e] p-2 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] m-auto mt-4">
          Ainda não há avaliações no feed.
        </h2>
      )}

      {!isLoading && data.length > 0 && (
        <div
          ref={scrollContainerRef}
          className="scroll-dark mt-2"
          style={{ maxHeight: 'calc(100vh - 280px)', overflowY: 'auto' }}
        >
          <DataView
            value={visibleItems}
            itemTemplate={(avaliacao, index) => (
              <AvaliacaoBox
                key={avaliacao?.id ?? `idx-${index}`}
                avaliacao={avaliacao}
                onChange={() => {
                  fetchAll();
                  onAtualizarTags?.();
                }}
                onSelecionarTag={onSelecionarTag}
              />
            )}
            layout="list"
          />

          <div className="flex flex-col items-center gap-2 py-3">
            {reachedEnd ? (
              <span className="text-xs text-[#1e1e1e]/80 p-1 px-3 bg-[#f4a831]/70 rounded-[8px]">
                Você chegou ao fim do Feed, compartilhe novas experiências para esse momento nunca acontecer!
              </span>
            ) : (
              isPaging && (
                <span className="text-sm text-[#1e1e1e] p-1 px-3 bg-[#f4a831] rounded-[8px]">Carregando mais...</span>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default FeedConteudo;
