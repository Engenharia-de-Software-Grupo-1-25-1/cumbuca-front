import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getEstabelecimentoImagem } from "../../utils/imagensCategoriasMapper";
import "../../styles/cardEstab.css";

const formatar = new Intl.NumberFormat('pt-BR', {
  notation: 'compact',
  compactDisplay: 'short',
  maximumFractionDigits: 1,
});

const formatarNum = (n) => {
  const num = Number(n) || 0;
  if (num >= 999_000_000) return '999M+';
  return formatar.format(num);
};

//contrução do card do estabelecimento
const CardEstab = ({ estabelecimento}) => {
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
              <span className="card-avaliacoes">{formatarNum(quantidadeAvaliacoes)} avaliações</span>
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

export default CardEstab;