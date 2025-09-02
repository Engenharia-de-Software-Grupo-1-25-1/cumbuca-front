import { useRef, useState, useEffect, useCallback } from 'react';
import { IoSearch, IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function BarraDePesquisa() {
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleInputChange = e => {
    setSearchValue(e.target.value);
  };

  const clearInput = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  const handleSearch = useCallback(() => {
    if (searchValue == '') return;
    navigate('/filtra-usuario', { state: searchValue });
  }, [navigate, searchValue]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Enter') handleSearch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleSearch]);

  return (
    <div className="flex items-center bg-[#f5dfb6] border border-[#db520a] rounded-full sm:px-0 md:px-4 lg:px-4 py-2 w-[45%] sm:w-[45%] md:w-[80%] lg:w-full max-w-4xl">
      <IoSearch alt="Pesquisar" color="#DB520A" className="w-[40px] h-[40px] hidden sm:block ml-4 flex-shrink-0" />
      <input
        type="search"
        ref={inputRef}
        value={searchValue}
        placeholder={'Pesquisar Usuário...'}
        className="w-full bg-transparent border-none outline-none font-poppins sm:text-[20px] md:text-[24px] lg:text-[24px] text-[#1e1e1e] px-4"
        onChange={handleInputChange}
      />
      {searchValue && (
        <button className="mr-2" onClick={clearInput}>
          <IoClose alt="Limpar Pesquisa" color="#DB520A" className="w-[40px] h-[40px]" />
        </button>
      )}
    </div>
  );
}

export default BarraDePesquisa;
