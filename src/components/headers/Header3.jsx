import { useRef, useState } from 'react';
import cumbucaLogo from '../../assets/logo.svg';
import sair from '../../assets/sair.svg';
import pesquisar from '../../assets/pesquisar.svg';
import filtrar from '../../assets/filtrar.svg';
import limparBusca from '../../assets/limpar_busca.svg';

//Padrão de Header com logo, barra de pesquisa, botão de filtrar e botão de sair
//É possível definir um placeholder para a barra de pesquisa através do parâmetro
function Header({ placeholder }) {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = e => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  return (
    <header className="flex items-center justify-between gap-4 bg-[url('../assets/fundo_header.svg')] bg-cover bg-center border-b-[0.5em] border-[#db520a] py-4 px-10 lg:px-20 h-[10%]">
      <a
        href="/"
        className="flex items-center gap-4 sm:ml-0 md:ml-4 lg:ml-20 flex-shrink-0"
      >
        <img
          src={cumbucaLogo}
          className="w-16 transition-transform duration-200 hover:scale-110"
          alt="Logo da Cumbuca"
        />
      </a>

      <div className="flex items-center bg-[#f5dfb6] border border-[#db520a] rounded-full sm:px-0 md:px-4 lg:px-4 py-2 w-full max-w-4xl">
        <img
          src={pesquisar}
          alt="Pesquisar"
          className="w-[30px] hidden sm:block ml-4"
        />
        <input
          type="search"
          ref={inputRef}
          value={searchValue}
          placeholder={placeholder}
          className="w-full bg-transparent border-none outline-none font-poppins sm:text-[20px] md:text-[24px] lg:text-[32px] text-[#1e1e1e] px-4"
          onChange={handleInputChange}
        />
        {searchValue && (
          <button className="mr-2" onClick={clearInput}>
            <img src={limparBusca} alt="Limpar Pesquisa" className="w-[30px]" />
          </button>
        )}
      </div>

      <div className="flex gap-1 sm:gap-1 md:gap-4 lg:gap-4">
        <button className="flex-shrink-0">
          <img
            src={filtrar}
            className="w-[30px] sm:w-[30px] md:w-[40px] lg:w-[45px]"
            alt="Filtrar"
          />
        </button>
        <button className="flex-shrink-0">
          <img
            src={sair}
            className="w-[30px] sm:w-[30px] md:w-[40px] lg:w-[45px]"
            alt="Sair"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;
