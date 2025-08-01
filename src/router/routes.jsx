import React from 'react';
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import TelaLogin from '../pages/login/TelaLogin';
import Tela1 from '../pages/Tela1';
import NaoEncontrado from '../pages/NaoEncontrado';
import PrivateRoute from './PriveteRoute';

export default function RoutesApp() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Navigate to="/login" replace />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PrivateRoute>
            <TelaLogin />
          </PrivateRoute>
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
