import '../styles/NavBar.css';
import { NavLink } from 'react-router-dom';
import feed from '../assets/feed.svg';
import estabelecimentos from '../assets/estabelecimentos.svg';
import meuPerfil from '../assets/meu_perfil.svg';

function NavBar() {
  return (
    /* Barra de navegação contendo Feed, Estabelecimentos e Meu Perfil */
    <nav className="navBar">
      <ul className="navBarItens">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'navBarItem active' : 'navBarItem'
            }
          >
            <img src={feed}></img>Feed
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/estabelecimentos"
            className={({ isActive }) =>
              isActive ? 'navBarItem active' : 'navBarItem'
            }
          >
            <img src={estabelecimentos}></img>Estabelecimentos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/meuPerfil"
            className={({ isActive }) =>
              isActive ? 'navBarItem active' : 'navBarItem'
            }
          >
            <img src={meuPerfil}></img>Meu Perfil
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
