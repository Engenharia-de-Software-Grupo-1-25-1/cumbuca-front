import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import NaoEncontrado from '../pages/NaoEncontrado';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Layout4 from '../components/layouts/Layout4';
import RecuperarSenha from '../pages/RecuperarSenha';
import NovaSenha from '../pages/NovaSenha';
import CriarConta from '../pages/CriarConta';
import Perfil from '../pages/perfil/Perfil';

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
            <Layout4 />
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

      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/alterar-senha" element={<NovaSenha />} />
      <Route path="/cadastrar-usuario" element={<CriarConta />} />
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  );
}
