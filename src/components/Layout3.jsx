import Header from './Header2';
import NavBar from './NavBar';
import TagsPopulares from './TagsPopulares';
import estabelecimentos from '../assets/estabelecimentos.svg';
import '../styles/Layout3.css';

const tags = [
  {
    icone: estabelecimentos,
    nome: 'Estabelecimentos',
    nPublicacoes: '50',
    corFundo: '#F9BD5A',
    corDestaque: '#D46106',
  },
  {
    icone: estabelecimentos,
    nome: 'Comida',
    nPublicacoes: '32',
    corFundo: '#FFD580',
    corDestaque: '#D46A0C',
  },
  {
    icone: estabelecimentos,
    nome: 'Bebida',
    nPublicacoes: '18',
    corFundo: '#F8B195',
    corDestaque: '#C06C84',
  },
  {
    icone: estabelecimentos,
    nome: 'Sobremesa',
    nPublicacoes: '27',
    corFundo: '#E0BBE4',
    corDestaque: '#957DAD',
  },
  {
    icone: estabelecimentos,
    nome: 'Festa',
    nPublicacoes: '12',
    corFundo: '#C9F9B6',
    corDestaque: '#6FCF97',
  },
];

//Layout Padrão com Header simples
function Layout3() {
  return (
    <>
      <Header />
      <NavBar />
      <TagsPopulares tags={tags} />
    </>
  );
}

export default Layout3;
