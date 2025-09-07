import { useState } from 'react';
import Header from '../headers/Header2';
import NavBar from './NavBar';
import TagsPopulares from './TagsPopulares';

// Layout Padrão com Header completo e Tags Populares
// É possível definir o conteúdo do lado esquerdo do Layout utilizando o parâmetro Conteudo
// Atributos de Conteudo são definidos em conteudoProps
export default function Layout({ Conteudo, conteudoProps }) {
  const [tagsKey, setTagsKey] = useState(0);

  const handleAtualizarTags = () => {
    setTagsKey(prev => prev + 1);
  };

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-0 sm:px-0 md:px-4 lg:px-4">
        <NavBar />
        <div className="flex gap-4 justify-center ml-0 sm:ml-0 md:ml-4 lg:ml-4 mb-8">
          {Conteudo ? <Conteudo {...conteudoProps} onAtualizarTags={handleAtualizarTags} /> : null}
          <TagsPopulares recarregar={tagsKey} />
        </div>
      </div>
    </>
  );
}
