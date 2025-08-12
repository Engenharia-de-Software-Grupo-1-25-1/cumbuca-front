import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import NaoEncontrado from '../pages/NaoEncontrado';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Layout4 from '../components/layouts/Layout4';
<<<<<<< HEAD
import RecuperarSenha from '../pages/RecuperarSenha';
import NovaSenha from '../pages/NovaSenha';
=======
import CriarConta from '../pages/CriarConta';
>>>>>>> 14043ae2ad67f4923340cfb18e2b7b1a4a5bd692

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
      <Route path="*" element={<NaoEncontrado />} />
<<<<<<< HEAD
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />
      <Route path="/alterar-senha" element={<NovaSenha />} />
=======
      <Route path="/cadastrar-usuario" element={<CriarConta />} />
>>>>>>> 14043ae2ad67f4923340cfb18e2b7b1a4a5bd692
    </Routes>
  );
}
