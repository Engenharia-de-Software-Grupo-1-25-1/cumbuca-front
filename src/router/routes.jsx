import { Routes, Route, Navigate } from 'react-router-dom';
import TelaLogin from '../pages/login/TelaLogin';
import Tela1 from '../pages/Tela1';
import NaoEncontrado from '../pages/NaoEncontrado';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

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
        path="/tela1"
        element={
          <PrivateRoute>
            <Tela1 />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NaoEncontrado />} />
    </Routes>
  );
}
