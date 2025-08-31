import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Header from '../components/headers/Header2';
import ListaEstabelecimentos from '../components/ListaDeEstabelecimentos';
import { getEstabelecimentosContainingNome } from '../services/EstabelecimentoService';

function EstabelecimentosFiltrados() {
  const [estabelecimentosFiltados, setEstabelecimentosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const carregarEstabelecimentos = async () => {
      setLoading(true);
      const res = await getEstabelecimentosContainingNome(location.state);
      const dados = res.data;
      if (dados) {
        setEstabelecimentosFiltrados(dados);
        setLoading(false);
      }
    };
    carregarEstabelecimentos();
  }, [location.state]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex gap-4 justify-center ml-0 sm:ml-0 md:ml-4 lg:ml-4 no-scrollbar overflow-y-scroll max-h-[calc(118vh-250px)] m-4 w-full">
        {estabelecimentosFiltados.length === 0 ? (
          <div
            className="w-full max-w-2xl rounded-xl p-4 ring-1 border border-[#ead7aa] bg-[#f6e6c1] text-[#5b4320]"
            aria-live="polite"
          >
            Não foi encontrado nenhum estabelecimento com o nome:
            <span className="font-semibold"> {location.state}</span>
          </div>
        ) : (
          <ListaEstabelecimentos arrayEstabelecimentos={estabelecimentosFiltados} />
        )}
      </div>
    </div>
  );
}

export default EstabelecimentosFiltrados;
