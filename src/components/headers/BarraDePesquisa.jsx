import { useRef, useState } from 'react';
import pesquisar from '../../assets/pesquisar.svg';
import limparBusca from '../../assets/limpar_busca.svg';

function BarraDePesquisa({ placeholder = 'Pesquisar...' }) {
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
    <div className="flex items-center bg-[#f5dfb6] border border-[#db520a] rounded-full sm:px-0 md:px-4 lg:px-4 py-2 w-[45%] sm:w-[45%] md:w-[80%] lg:w-full max-w-4xl">
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
  );
}

export default BarraDePesquisa;
