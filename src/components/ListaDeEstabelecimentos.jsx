import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import CardEstab from './cards/CardEstabelecimento';

const ListaEstabelecimentos = ({ arrayEstabelecimentos }) => {
  const [carregando, setLoading] = useState(true);

  useEffect(() => {
    const carregarEstabelecimentos = async () => {
      setLoading(true);
      if (arrayEstabelecimentos.length > 0) {
        setLoading(false);
      }
    };
    carregarEstabelecimentos();
  }, [arrayEstabelecimentos]);

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
        {Array.isArray(arrayEstabelecimentos) &&
          arrayEstabelecimentos.map(est => <CardEstab key={est.id} estabelecimento={est} />)}
      </div>
    </div>
  );
};

export default ListaEstabelecimentos;
