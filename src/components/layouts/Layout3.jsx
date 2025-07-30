import Header from '../headers/Header2';
import NavBar from './NavBar';
import TagsPopulares from './TagsPopulares';
import '../../styles/layouts/Layout3.css';
import tags from '../temporario/tags';

//Layout Padrão com Header simples e Tags Populares
//function Layout({ tags }) {
function Layout({}) {
  return (
    <>
      <Header />
      <NavBar />
      <TagsPopulares tags={tags} />
    </>
  );
}

export default Layout;
