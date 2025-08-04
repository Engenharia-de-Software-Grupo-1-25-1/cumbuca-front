import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from '../components/layouts/Layout3';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/meuPerfil" element={<Layout />} />
        <Route path="/estabelecimentos" element={<Layout />} />
        <Route path="/recuperarSenha" element={<Layout />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
