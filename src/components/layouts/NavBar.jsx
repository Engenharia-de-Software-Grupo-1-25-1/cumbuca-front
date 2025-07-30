import '../../styles/layouts/NavBar.css';
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
    <nav className="navBar">
      <ul className="navBarItens">
        {navItems.map(({ to, label, icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? 'navBarItem active' : 'navBarItem'
              }
            >
              <img src={icon} alt={label} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
