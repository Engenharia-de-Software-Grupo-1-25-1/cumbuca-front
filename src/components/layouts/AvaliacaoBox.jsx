import { useState } from 'react';
import estabelecimentoIcon from '../../assets/estabelecimentos.svg';
import Icone from '../util/Icone';
import fotoDePerfil from '../../assets/fotoDePerfil.jpg';
import mais from '../../assets/mais.svg';
import estrela from '../../assets/estrelaBox.svg';
import imagemAvaliacao from '../../assets/exemploAvaliacao.jpeg';
import curtir from '../../assets/curtir.svg';
import curtirVermelho from '../../assets/curtirVermelho.svg';
import comentar from '../../assets/comentar.svg';

export default function AvalicaoBox() {
  const [curtido, setCurtido] = useState(false);

  return (
    <div className="bg-[#f7d799] rounded-xl flex flex-col p-4 text-[#1E1E1E] text-2xl gap-4">
      <div className="flex gap-8">
        <img src={fotoDePerfil} className="h-[65px] rounded-full"></img>
        <div>
          <div className="flex gap-4">
            <p>Nome Usuário</p>
            <p className="text-xl text-[#505050]">@username</p>
          </div>
          <div className="flex text-xl items-center gap-1">
            <Icone url={estabelecimentoIcon} cor="#356B2A" tamanho="24px" />
            <p className="text-xl text-[#356B2A]">Estabelecimento</p>
          </div>
        </div>
        <div className="flex items-center mb-8 ml-auto">
          <img src={estrela} className="w-[48px]"></img>
          <p className="text-3xl text-[#FFB115] mt-2">4,5</p>
        </div>
        <button className="mb-8">
          <img src={mais}></img>
        </button>
      </div>
      <div>
        <p className="w-[85%] mx-auto">
          Gente, o acarajé da barraca da Dona Rosa no #pp tá uma delícia! Tempero perfeito e preço justo
        </p>
        <img
          src={imagemAvaliacao}
          className="my-4 mx-auto h-[230px] w-[770px] object-cover object-center rounded-xl"
        ></img>
      </div>
      <div className="text-xl mx-8">
        <div className="flex gap-2 mb-1">
          <button className="flex gap-2 items-center" onClick={() => setCurtido(!curtido)}>
            <img className="w-[24px]" src={curtido ? curtirVermelho : curtir} />
            <p>45</p>
          </button>
          <button className="flex gap-2">
            <img src={comentar}></img>
            <p>12</p>
          </button>
          <p className="ml-auto text-[#505050]">01/04/2025</p>
        </div>
        <div>
          <button className="mr-4 bg-[#D46106] px-2 rounded-full outline outline-2 outline-[#F9BD5A]">
            <p>#pp</p>
          </button>
          <button className="bg-[#F9BD5A] px-2 rounded-full outline outline-2 outline-[#D46106]">
            <p>#almoço</p>
          </button>
        </div>
      </div>
    </div>
  );
}
