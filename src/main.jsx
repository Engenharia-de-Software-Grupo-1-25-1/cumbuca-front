import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/reset.css';
import './styles/index.css';
import Layout3 from './components/Layout3.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout3/>
  </BrowserRouter>
);
