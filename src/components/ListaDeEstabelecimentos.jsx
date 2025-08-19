import { useEffect, useState } from "react";
import { Spin } from 'antd';
import CardEstab from "./cards/cardEstabelecimento";

const ListaEstabelecimentos = ({arrayEstabelecimentos}) => {
    const [estabelecimentos, setEstabelecimentos] = useState([]);
    const [carregando, setLoading] = useState(true);

    useEffect(() => {
      const carregarEstabelecimentos = async () => {
        setLoading(true);
        const dados = await arrayEstabelecimentos();
        if (dados) {
          setEstabelecimentos(dados);
        }
      setLoading(false);
      };
      carregarEstabelecimentos();
    }, [arrayEstabelecimentos]);

    if (carregando) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
    }

//mapeamento de cada estabelecimento para um card
    return (
        <div className="block w-full">
            <div className="flex flex-col items-start gap-4">
            {Array.isArray(estabelecimentos) && estabelecimentos.map((est) => (
                <CardEstab key={est.id} estabelecimento={est}/>
            ))}
            </div>
        </div>
    );    
};

export default ListaEstabelecimentos;