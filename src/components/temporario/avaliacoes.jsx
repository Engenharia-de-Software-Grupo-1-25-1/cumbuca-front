import exemploAvaliacao from '../../assets/exemploAvaliacao.jpeg';
import tags from './tags';
import usuarios from './usuarios';

export const avaliacoes = [
  {
    autor: usuarios[0],
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
