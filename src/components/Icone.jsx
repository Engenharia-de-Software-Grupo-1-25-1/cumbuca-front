function Icone({ url, cor, tamanho}) {
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
  
    return <div style={estilo} />;
  }

  export default Icone;