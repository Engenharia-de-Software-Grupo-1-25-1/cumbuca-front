import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import Header from '../components/headers/Header2';
import ListaUsuarios from '../components/ListaUsuario';
import { getUsuariosContainingNome,getUsuarioPorUsername } from '../services/usuarioService';


function UsuariosFiltrados() {
  const [usuariosFiltados,setUsuariosFiltrados] =  useState([]);
  const [loading,setLoading] = useState(false);
  const location = useLocation();

 useEffect(() => {
    const carregarUsuarios = async () => {
      setLoading(true);
      const res = await getUsuarioPorUsername(location.state); 
      const dados = res.data;
      if (dados) {
        setUsuariosFiltrados(dados);
        setLoading(false);
      }
    };
    carregarUsuarios();
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
        {usuariosFiltados.length === 0 ? (
          <div
            className="w-full max-w-2xl rounded-xl p-4 ring-1 border border-[#ead7aa] bg-[#f6e6c1] text-[#5b4320]"
            aria-live="polite"
          >
            Não foi encontrado nenhum usuario com o nome:
            <span className="font-semibold"> {location.state}</span>
          </div>
        ) : (
          <ListaUsuarios arrayUsuarios={usuariosFiltados} />
        )}
      </div>
    </div>
  );
}

export default UsuariosFiltrados;
