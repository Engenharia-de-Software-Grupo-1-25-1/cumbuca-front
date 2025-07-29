import '../styles/PerfilBox.css';

//Box que apresenta tags populares
function PerfilBox({ fotoDePerfil, nomeUsuario, usernameUsuario }) {
  return (
    <div className="perfilBox">
      <div className="informacoesUsuario">
        <img src={fotoDePerfil} className="fotoDePerfil"></img>
        <div className="textosUsuario">
          <h1 className="nomeUsuario">{nomeUsuario}</h1>
          <h2 className="usernameUsuario">{usernameUsuario}</h2>
        </div>
      </div>
    </div>
  );
}

export default PerfilBox;
