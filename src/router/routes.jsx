import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TelaLogin from '../pages/login/TelaLogin';
import NaoEncontrado from '../pages/NaoEncontrado';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<NaoEncontrado />} />
        <Route path="/login" element={<TelaLogin />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
