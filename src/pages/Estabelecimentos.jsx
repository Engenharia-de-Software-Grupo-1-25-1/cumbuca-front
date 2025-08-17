import { useEffect, useState } from "react";
import { Spin } from 'antd';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import "../styles/cardEstab.css";
import { Link } from 'react-router-dom';
import { getEstabelecimentos } from "../services/EstabelecimentoService";
import { getEstabelecimentoImagem } from "../utils/imagensCategoriasMapper";

const formataQtdAval = (n) => {
  const num = Number(n);
  
  if(num >= 999_000_000) {
    return "999M+"
  } else if (num >= 1_000_000) {
    return (Math.trunc(num / 1_000_000)).toString() + 'M+';
  } else if (num >= 1_000) {
    return (Math.trunc(num / 1_000)).toString() + 'K+';
  } else {
    return n
  }
};

//contrução do card do estabelecimento
const Card = ({ estabelecimento}) => {
  const { id, nome, categoria, notaGeral, quantidadeAvaliacoes, localizacao } = estabelecimento || {};
  const estabImagem = getEstabelecimentoImagem(categoria);

  return (
    <Link to={`/estabelecimentos/${id}`} className="block w-full no-underline text-inherit">
      <div className="card-container">
        <img
          src={estabImagem}
          className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] rounded-lg flex-shrink-0"
          style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#bb7e27' }}
        />
        <div className="card-margem-conteudo">
          <div className="card-header">
            <h2 className="card-nome-restaurante text-ellipsis-single-line">{nome}</h2>
          </div>
          <p className="card-categoria">{categoria}</p>
          <div className="card-detalhes">
            <div className="card-nota">
              <FaStar size={23} className="estrela-icone" />
              <span className="nota-text" style={{ marginLeft: 6 }}>{notaGeral}</span>
              <span className="card-avaliacoes">{formataQtdAval(quantidadeAvaliacoes)} avaliações</span>
            </div>
            <div className="card-endereco">
              <FaMapMarkerAlt size={18} className="endereco-icone" />
              <span className="endereco-text">{localizacao}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ListaEstabelecimentos = () => {
    const [estabelecimentos, setEstabelecimentos] = useState([]);
    const [carregando, setLoading] = useState(true);

    useEffect(() => {
      const carregarEstabelecimentos = async () => {
        setLoading(true);
        const dados = await getEstabelecimentos();
        if (dados) {
          setEstabelecimentos(dados);
        }
      setLoading(false);
      };
      carregarEstabelecimentos();
    }, []);

    if (carregando) {
        return <div style={{ textAlign: 'center', marginTop: '50px' }}><Spin size="large" /></div>;
    }

//mapeamento de cada estabelecimento para um card
    return (
        <div className="conteudo-principal">
            <div className="cards-lista">
            {Array.isArray(estabelecimentos) && estabelecimentos.map((est) => (
                <Card key={est.id} estabelecimento={est}/>
            ))}
            </div>
        </div>
    );    
};

export default ListaEstabelecimentos;