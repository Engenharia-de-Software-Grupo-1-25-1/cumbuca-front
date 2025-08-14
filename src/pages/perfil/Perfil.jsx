import { useParams } from 'react-router-dom';
import Layout from '../../components/layouts/Layout4';
import { usuarios } from '../../components/temporario/avaliacoesEUsuarios';

export default function Perfil() {
  const { username } = useParams();

  const usuario = usuarios.find(u => u.username === username);

  return <Layout usuario={usuario} />;
}
