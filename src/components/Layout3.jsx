import Header from './Header2';
import NavBar from './NavBar';
import TagsPopulares from './TagsPopulares';
import '../styles/Layout3.css';

//Layout Padrão com Header simples e Tags Populares
function Layout3({ tags }) {
  return (
    <>
      <Header />
      <NavBar />
      <TagsPopulares tags={tags} />
    </>
  );
}

export default Layout3;
