import { NavLink } from 'react-router-dom';

import feed from '../../assets/feed.svg';
import estabelecimentos from '../../assets/estabelecimentos.svg';
import meuPerfil from '../../assets/meu_perfil.svg';

const navItems = [
  { to: '/', label: 'Feed', icon: feed },
  {
    to: '/estabelecimentos',
    label: 'Estabelecimentos',
    icon: estabelecimentos,
  },
  { to: '/meuPerfil', label: 'Meu Perfil', icon: meuPerfil },
];

function NavBar() {
  return (
    <nav className="w-[80%] sm:w-[80%] md:w-[85%] lg:w-[65%] bg-[#f4a831] mt-4 mb-4 md:ml-16 lg:ml-16 mx-auto sm:mx-auto md:mx-4 lg:mx-4 rounded-xl p-2">
      <ul className="flex justify-evenly flex-wrap sm:flex-wrap md:flex-nowrap lg:flex-nowrap md:gap-2">
        {navItems.map(({ to, label, icon }) => (
          <li key={to} className="w-full">
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center justify-center text-[#1e1e1e] text-[16px] sm:text-[16px] md:text-[20px] lg:text-[25px] p-2 rounded-xl gap-4 ${
                  isActive ? 'bg-[#ff8c00]' : ''
                }`
              }
            >
              <img
                src={icon}
                alt={label}
                className="w-6 sm:w-6 md:w-8 lg:w-10"
              />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
