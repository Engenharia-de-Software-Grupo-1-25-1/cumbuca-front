import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/reset.css';
import './styles/index.css';
import Layout4 from './components/Layout4.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Layout4 />
  </BrowserRouter>
);
