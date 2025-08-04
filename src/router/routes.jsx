import { Routes, Route, Navigate } from 'react-router-dom';
import TelaLogin from '../pages/login/TelaLogin';
import NaoEncontrado from '../pages/NaoEncontrado';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Layout4 from '../components/layouts/Layout4';

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <TelaLogin />
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
    </Routes>
  );
}
