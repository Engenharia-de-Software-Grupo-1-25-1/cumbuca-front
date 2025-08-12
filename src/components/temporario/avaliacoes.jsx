import exemploAvaliacao from '../../assets/exemploAvaliacao.jpeg';
import fotoDePerfil from '../../assets/fotoDePerfil.jpg';
import tags from './tags';

const avaliacoes = [
  {
    fotoUsuario: fotoDePerfil,
    autor: 'Teste',
    username: '@teste',
    estabelecimento: 'Teste',
    nota: '4,5',
    descricao: 'Gente, o acarajé da barraca da Dona Rosa no #pp tá uma delícia! Tempero perfeito e preço justo',
    fotoAvaliacao: exemploAvaliacao,
    nCurtidas: 45,
    nComentarios: 12,
    data: '01/04/2025',
    tags: tags,
    curtido: true,
  },
];

export default avaliacoes;
