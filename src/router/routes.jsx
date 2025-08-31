import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import NaoEncontrado from '../pages/NaoEncontrado';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Feed from '../pages/Feed';
import FeedEstabelecimentos from '../pages/FeedEstabelecimentos';
import RecuperarSenha from '../pages/RecuperarSenha';
import NovaSenha from '../pages/NovaSenha';
import CriarConta from '../pages/CriarConta';
import EditarPerfil from '../pages/EditarPerfil';
import Perfil from '../pages/Perfil';
import EstabelecimentosFiltrados from '../pages/EstabelecimentosFiltrados';
import UsuariosFiltrados from '../pages/UsuarioFiltrados';
import Estabelecimento from '../pages/Estabelecimento';

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <Feed />
          </PrivateRoute>
        }
      />

      <Route
        path="/estabelecimento"
        element={
          <PrivateRoute>
            <FeedEstabelecimentos />
          </PrivateRoute>
        }
      />

      <Route
        path="/estabelecimento/:id"
        element={
          <PrivateRoute>
            <Estabelecimento />
          </PrivateRoute>
        }
      />

      <Route
        path="/perfil/:username"
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        }
      />

      <Route
        path="filtra-estabelecimento"
        element={
          <PrivateRoute>
            {' '}
            <EstabelecimentosFiltrados />
          </PrivateRoute>
        }
      />

      <Route
        path="filtra-usuario"
        element={
          <PrivateRoute>
            {' '}
            <UsuariosFiltrados />
        path="/perfil/editar"
        element={
          <PrivateRoute>
            <EditarPerfil />
          </PrivateRoute>
        }</PrivateRoute>} />

      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/alterar-senha" element={<NovaSenha />} />
      <Route path="/cadastrar-usuario" element={<CriarConta />} />
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  );
}
