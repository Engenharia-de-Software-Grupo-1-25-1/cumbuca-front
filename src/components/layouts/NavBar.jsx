import { NavLink } from 'react-router-dom';

import { MdOutlineStorefront } from 'react-icons/md';
import { FiHome, FiUser } from 'react-icons/fi';

//NavBar padrão com opções de Feed, Estabelecimentos e Meu Perfil
function NavBar() {
  return (
    <nav className="w-[80%] sm:w-[80%] md:w-[85%] lg:w-[65%] bg-[#f4a831] mt-4 mb-4 md:ml-16 lg:ml-16 mx-auto sm:mx-auto md:mx-4 lg:mx-4 rounded-xl p-2">
      <ul className="flex justify-evenly flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap md:gap-2">
        <li className="w-full">
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `flex items-center justify-center text-[#1e1e1e] text-[16px] sm:text-[16px] md:text-[20px] lg:text-[25px] p-2 rounded-xl gap-4 transition duration-300 hover:bg-[#ff8c00] hover:no-underline ${
                isActive ? 'bg-[#ff8c00]' : ''
              }`
            }
          >
            <FiHome alt="Feed" className="w-6 sm:w-6 md:w-8 lg:w-10 h-auto" />
            Feed
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/estabelecimentos"
            className={({ isActive }) =>
              `flex items-center justify-center text-[#1e1e1e] text-[16px] sm:text-[16px] md:text-[20px] lg:text-[25px] p-2 rounded-xl gap-4 transition duration-300 hover:bg-[#ff8c00] hover:no-underline ${
                isActive ? 'bg-[#ff8c00]' : ''
              }`
            }
          >
            <MdOutlineStorefront alt="Estabelecimentos" className="w-6 sm:w-6 md:w-8 lg:w-10 h-auto" />
            Estabelecimentos
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink
            to="/meuPerfil"
            className={({ isActive }) =>
              `flex items-center justify-center text-[#1e1e1e] [@media(max-width:767px)]:text-[16px] [@media(max-width:1091px)]:text-[20px] [@media(min-width:1092px)]:text-[25px] p-2 rounded-xl gap-4 transition duration-300 hover:bg-[#ff8c00] hover:no-underline ${
                isActive ? 'bg-[#ff8c00]' : ''
              }`
            }
          >
            <FiUser alt="Meu Perfil" className="w-6 sm:w-6 md:w-8 lg:w-10 h-auto" />
            Meu Perfil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
