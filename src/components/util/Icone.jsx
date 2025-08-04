// Essa função recebe o url de um ícone SVG, um hexcode(cor) e um tamanho
// Retorna uma div que apresenta o ícone da entrada com todas características oferecidas como parâmetro
function Icone({ url, cor, tamanho }) {
  const estilo = {
    width: tamanho,
    height: tamanho,
    backgroundColor: cor,
    WebkitMaskImage: `url(${url})`,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    WebkitMaskPosition: 'center',
    maskImage: `url(${url})`,
    maskRepeat: 'no-repeat',
    maskSize: 'contain',
    maskPosition: 'center',
  };

  return <div className="flex-shrink-0" style={estilo} />;
}

export default Icone;
