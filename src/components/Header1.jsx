import cumbucaLogo from '../assets/logo.svg';
import bandeiras from '../assets/bandeiras.svg';

function Header() {
  return (
    /* Cria o primeiro padrão de Header */
    <header>
      <img src={bandeiras} className="bandeiras" alt="Bandeiras" />
      <a href="./">
        <img src={cumbucaLogo} className="logo" alt="Logo da Cumbuca" />
        <h1>CUMBUCA</h1>
      </a>
    </header>
  );
}

export default Header;
