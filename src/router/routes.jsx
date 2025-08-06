import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import NaoEncontrado from '../pages/NaoEncontrado';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Layout4 from '../components/layouts/Layout4';
import CriarConta from '../pages/CriarConta';

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
      <Route path="/cadastrar-usuario" element={<CriarConta />} />
    </Routes>
  );
}
