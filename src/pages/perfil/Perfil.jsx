import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../../components/layouts/Layout4';
import { getUsuarioPorUsername } from '../../services/usuarioService';
// import { useStore } from '../store/useStore';

//Página de Perfil
//Consegue encontrar o usuário através do seu username
export default function Perfil() {
  const { username } = useParams();
  // const usuarioLogado = useStore(state => state.usuario);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        if (username) {
          const { data } = await getUsuarioPorUsername(username);
          setUsuario(data);
        }
        // else {
        //   setUsuario(usuarioLogado);
        // }
      } catch (error) {
        console.error('Erro ao carregar usuário', error);
      }
    }

    carregarUsuario();
  }, [username]);
  // }, [username, usuarioLogado]);

  if (!usuario) {
    return <Layout />;
  }

  return <Layout usuario={usuario} />;
}
