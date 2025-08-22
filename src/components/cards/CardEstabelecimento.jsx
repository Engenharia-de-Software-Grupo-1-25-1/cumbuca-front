import { FaStar } from 'react-icons/fa';
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';
import { getEstabelecimentoImagem } from "../../utils/imagensCategoriasMapper";
import { formataInfosEstabelecimento } from '../../utils/formataInfosEstabelecimento';

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
const CardEstab = ({ estabelecimento }) => {
  const { id, nome, categoria, notaGeral, quantidadeAvaliacoes, rua, numero, bairro, cidade, estado, cep } = estabelecimento || {};

  const {categoriaMapeada, notaFormatada, localizacao} = formataInfosEstabelecimento(categoria, notaGeral, rua, numero, bairro, cidade, estado, cep);
  const estabImagem = getEstabelecimentoImagem(categoriaMapeada);

  return (
      <Link to={`/estabelecimentos/${id}`} className="block w-full text-current no-underline">
          <div className="flex items-center p-4 rounded-xl bg-[#f7d799] border-2 border-[#bb7e27] shadow-md overflow-hidden">
            <img
                src={estabImagem}
                className="flex-shrink-0 rounded-lg w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] border-2 border-[#bb7e27] object-fill"
            />
            <div className="flex-grow ml-4 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="truncate text-2xl font-bold text-[#4b2509]">{nome}</h2>
            </div>
            <p className="mt-1 mb-2 text-sm text-black">{categoriaMapeada}</p>
            <div className="flex items-center gap-5">
              <div className="flex items-center flex-shrink-0">
                <FaStar size={23} className="text-[#ffb115] mr-1" />
                <span className="text-[#ffb115] text-2xl ml-1">{notaFormatada}</span>
                <span className="ml-2 text-md text-black whitespace-nowrap">{formatarNum(quantidadeAvaliacoes)} avaliações</span>
            </div>
            <div className="flex items-center text-black min-w-0 overflow-hidden">
              <MdOutlineLocationOn size={20} className="mr-2 flex-shrink-0" />
              <span className="truncate text-md">{localizacao}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardEstab;