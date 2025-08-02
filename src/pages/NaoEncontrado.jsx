import React from 'react';

const NaoEncontrado = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Página Não Encontrada</h1>
        <p className="text-lg text-gray-700 mb-6">A página que você está procurando não existe ou foi movida.</p>
        <button
          onClick={() => (window.location.href = '/login')}
          className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition"
        >
          Voltar para a Página Inicial
        </button>
      </div>
    </div>
  );
};

export default NaoEncontrado;
