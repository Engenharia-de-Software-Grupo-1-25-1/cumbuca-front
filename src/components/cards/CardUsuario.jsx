import { Link } from 'react-router-dom';
import fotoUsuario from '../../assets/fotoDePerfilPadrao.webp';

const CardUsuario = ({ user }) => {
  const srcFoto = s => (s?.startsWith('data:') ? s : `data:image/png;base64,${s}`);

  return (
    <div className="flex items-center p-4 rounded-xl bg-[#f7d799] border-2 border-[#bb7e27] shadow-md overflow-hidden">
      <img
        src={user.status === 'ATIVO' ? (user.foto ? srcFoto(user.foto) : fotoUsuario) : fotoUsuario}
        className="flex-shrink-0 rounded-lg w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[90px] md:h-[90px] lg:w-[120px] lg:h-[120px] border-2 border-[#bb7e27] object-fill"
      />
      <div className="flex-grow ml-4 min-w-0">
        <Link to={`/perfil/${user.username}`} className="flex-shrink-0">
          <div className="flex items-center justify-between ">
            <h2 className="truncate text-2xl font-bold text-[#4b2509] hover:underline">
              {user.status === 'ATIVO' ? user.nome : 'Usuário inativo'}
            </h2>
          </div>
          <p className="mt-1 mb-2 text-sm text-black">{user.username}</p>
        </Link>
        <div className="flex items-center gap-5">
          <span className="text-md text-black whitespace-nowrap">
            {user.qtdAvaliacoes} {user.qtdAvaliacoes === 1 ? 'avaliação' : 'avaliações'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardUsuario;
