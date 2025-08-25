import categorias from './categorias';

export const formataInfosEstabelecimento = (categoria, notaGeral, rua, numero, bairro, cidade, estado, cep) => {
  const localizacao = formataEndereco(rua, numero, bairro, cidade, estado, cep);
  const notaGeralTruncada = notaGeral.toFixed(1);
  const notaFormatada = notaGeralTruncada.replace('.', ',');

  const categoriaMapeada = categorias(categoria);

  return { categoriaMapeada, notaFormatada, localizacao };
};

const formataEndereco = (rua, numero, bairro, cidade, estado, cep) => {
  const endereco = [rua, numero, bairro, cidade, estado, cep ? `CEP: ${cep}` : null].filter(Boolean);

  if (endereco.length == 0) {
    return 'Localização não informada!';
  }

  return endereco.join(', ');
};
