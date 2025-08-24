import padaria from '../assets/estabImagens/padaria.png';
import restaurante from '../assets/estabImagens/restaurante.png';
import cafe from '../assets/estabImagens/cafeteria.png';
import bar from '../assets/estabImagens/bar.png';
import pizzaria from '../assets/estabImagens/pizzaria.png';
import cumbuca from '../assets/estabImagens/cumbuca.png';
import sorveteria from '../assets/estabImagens/sorveteria.png';
import acougue from '../assets/estabImagens/acougue.png';
import churrascaria from '../assets/estabImagens/churrascaria.png';
import confeitaria from '../assets/estabImagens/confeitaria.png';
import hamburgueria from '../assets/estabImagens/hamburgueria.png';
import japones from '../assets/estabImagens/japones.png';
import mercado from '../assets/estabImagens/mercado.png';
import posto from '../assets/estabImagens/posto.png';


const imagemCategoria = {
  'Padaria': padaria,
  'Restaurante': restaurante,
  'Café': cafe,
  'Bar': bar,
  'Pizzaria': pizzaria,
  'Sorveteria': sorveteria,
  'Açougue': acougue,
  'Churrascaria': churrascaria,
  'Confeitaria': confeitaria,
  'Hamburgueria': hamburgueria,
  'Sushi': japones,
  'Mercado': mercado,
  'Posto de Combustível': posto,
};

export const getEstabelecimentoImagem = (categoria) => {
  return imagemCategoria[categoria] || cumbuca;
};