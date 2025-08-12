import Layout from '../../components/layouts/Layout4';
import usuarios from '../../components/temporario/usuarios';

const usuarioTeste = usuarios[0];

export default function Perfil({ usuario = usuarioTeste }) {
  return <Layout usuario={usuario} />;
}
