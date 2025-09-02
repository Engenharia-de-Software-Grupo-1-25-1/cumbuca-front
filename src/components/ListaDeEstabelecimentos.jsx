import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import CardEstab from './cards/CardEstabelecimento';

const ListaEstabelecimentos = ({ arrayEstabelecimentos, filtros, ordenador }) => {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [carregando, setLoading] = useState(true);

  useEffect(() => {
    const carregarEstabelecimentos = async () => {
      setLoading(true);
      const dados = await arrayEstabelecimentos(filtros, ordenador);
      if (dados) {
        setEstabelecimentos(dados);
      }
      setLoading(false);
    };
    carregarEstabelecimentos();
  }, [arrayEstabelecimentos, filtros, ordenador]);

  if (carregando) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!Array.isArray(estabelecimentos) || estabelecimentos.length === 0) {
    return (
      <div className="block w-full">
        <div className="flex flex-col items-start gap-4">
          <h1
            className="sm:text-[20px] md:text-[30px] lg:text-[30px] font-semibold text-[#1e1e1e]
                     p-1 px-4 bg-[#f4a831] w-fit h-fit rounded-[10px] mt-8 ml-15 self-start text-left"
          >
            Nenhum estabelecimento encontrado.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="block w-full scroll-dark max-h-420 overflow-y-auto">
      <div className="flex flex-col items-start gap-4">
        {Array.isArray(estabelecimentos) &&
          estabelecimentos.map(est => <CardEstab key={est.id} estabelecimento={est} />)}
      </div>
    </div>
  );
};

export default ListaEstabelecimentos;
