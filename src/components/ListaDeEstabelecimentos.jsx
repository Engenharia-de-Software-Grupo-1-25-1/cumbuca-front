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

  return (
    <div className="block w-full">
      <div className="flex flex-col items-start gap-4">
        {Array.isArray(estabelecimentos) &&
          estabelecimentos.map(est => <CardEstab key={est.id} estabelecimento={est} />)}
      </div>
    </div>
  );
};

export default ListaEstabelecimentos;
