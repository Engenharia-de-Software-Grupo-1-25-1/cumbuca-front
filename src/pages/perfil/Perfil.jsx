import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../../components/layouts/Layout4';
import { getUsuarioPorUsername } from '../../services/usuarioService';
import { message } from 'antd';

//Página de Perfil
//Consegue encontrar o usuário através do seu username
export default function Perfil() {
  const { username } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [loadingUsuario, setLoadingUsuario] = useState(true);

  useEffect(() => {
    async function carregarUsuario() {
      setLoadingUsuario(true);
      try {
        if (username) {
          const { data } = await getUsuarioPorUsername(username);
          setUsuario(data);
        }
      } catch (error) {
        console.error(error);
        message.error('Erro ao carregar dados do usuário!')
        if (error.response?.status === 404 || error.response?.status === 401) {
          setUsuario(null);
        }
      } finally {
        setLoadingUsuario(false);
      }
    }

    carregarUsuario();
  }, [username]);

  return <Layout usuario={usuario} loadingUsuario={loadingUsuario} />;
}
