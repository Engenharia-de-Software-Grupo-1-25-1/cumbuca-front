import { NavLink } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';
import { MdOutlineStorefront } from 'react-icons/md';
import { FiHome, FiUser } from 'react-icons/fi';

//NavBar padrão com opções de Feed, Estabelecimentos e Meu Perfil
function NavBar() {
  const { user } = useAuth();

  return (
    <nav className="w-[80%] sm:w-[80%] md:w-[85%] lg:w-[65%] bg-[#f4a831] mt-4 mb-4 rounded-xl p-1 max-w-[850px] md:max-h-[50px] lg:max-h-[50px] justify-self-center sm:justify-self-center md:justify-self-auto ld:justify-self-auto ml-0 sm:ml-0 md:ml-4 lg:ml-4">
      <ul className="flex justify-evenly flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap md:gap-2">
        <li className="w-full">
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `flex items-center justify-center text-[#1e1e1e] text-[16px] sm:text-[16px] md:text-[20px] lg:text-[20px] p-1 rounded-xl gap-4 transition duration-300 hover:bg-[#ff8c00] hover:no-underline ${
                isActive ? 'bg-[#ff8c00]' : ''
              }`
            }
          >
            <FiHome alt="Feed" className="w-6 sm:w-6 md:w-8 lg:w-8 h-auto" />
            Feed
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/estabelecimento"
            className={({ isActive }) =>
              `flex items-center justify-center text-[#1e1e1e] text-[16px] sm:text-[16px] md:text-[20px] lg:text-[20px] p-1 rounded-xl gap-4 transition duration-300 hover:bg-[#ff8c00] hover:no-underline ${
                isActive ? 'bg-[#ff8c00]' : ''
              }`
            }
          >
            <MdOutlineStorefront alt="Estabelecimentos" className="w-6 sm:w-6 md:w-8 lg:w-8 h-auto" />
            Estabelecimentos
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to={`/perfil/${user.username}`}
            className={({ isActive }) =>
              `flex items-center justify-center text-[#1e1e1e] sm:text-[16px] md:text-[20px] lg:text-[20px] p-1 rounded-xl gap-4 transition duration-300 hover:bg-[#ff8c00] hover:no-underline ${
                isActive ? 'bg-[#ff8c00]' : ''
              }`
            }
          >
            <FiUser alt="Meu Perfil" className="w-6 sm:w-6 md:w-8 lg:w-8 h-auto" />
            Meu Perfil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
