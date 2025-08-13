import exemploAvaliacao from '../../assets/exemploAvaliacao.jpeg';
import tags from './tags';
import fotoDePerfil from '../../assets/fotoDePerfil.jpg';

export const usuarios = [
  {
    fotoDePerfil: fotoDePerfil,
    nome: 'Teste',
    username: 'teste',
    avaliacoesUsuario: [],
  },
  {
    fotoDePerfil: fotoDePerfil,
    nome: 'Teste',
    username: 'outro',
    avaliacoesUsuario: [],
  },
];

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
  {
    autor: usuarios[1],
    estabelecimento: 'Teste',
    nota: '4,5',
    descricao: 'Gente, o acarajé da barraca da Dona Rosa no #pp tá uma delícia! Tempero perfeito e preço justo',
    nCurtidas: 45,
    nComentarios: 12,
    data: '01/04/2025',
    tags: tags,
    curtido: false,
  },
];

usuarios[0].avaliacoesUsuario = avaliacoes;

localStorage.setItem('usuarioLogado', JSON.stringify({
  username: 'teste',
}));