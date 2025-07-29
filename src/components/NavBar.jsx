import '../styles/NavBar.css';
import feed from '../assets/feed.svg';
import estabelecimentos from '../assets/estabelecimentos.svg';
import meuPerfil from '../assets/meu_perfil.svg';

function NavBar() {
  return (
    /* Barra de navegação contendo Feed, Estabelecimentos e Meu Perfil */
    <nav className="navBar">
      <ul className="navBarItens">
        <li>
          <a href="/" className="navBarItem">
            <img src={feed}></img>Feed
          </a>
        </li>
        <li>
          <a href="/estabelecimentos" className="navBarItem">
            <img src={estabelecimentos}></img>Estabelecimentos
          </a>
        </li>
        <li>
          <a href="/perfil" className="navBarItem">
            <img src={meuPerfil}></img>Meu Perfil
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
