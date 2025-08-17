import padaria from '../assets/estabImagens/padaria.png';
import restaurante from '../assets/estabImagens/restaurante.png';
import cafe from '../assets/estabImagens/cafeteria.png';
import bar from '../assets/estabImagens/bar.png';
import pizzaria from '../assets/estabImagens/pizzaria.png';
import cumbuca from '../assets/estabImagens/cumbuca.png';

const imagemCategoria = {
  'Padaria': padaria,
  'Restaurante': restaurante,
  'Café': cafe,
  'Bar': bar,
  'Pizzaria': pizzaria,
};

export const getEstabelecimentoImagem = (categoria) => {
  return imagemCategoria[categoria] || cumbuca;
};