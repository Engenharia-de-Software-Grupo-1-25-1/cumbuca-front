import {   useState } from 'react';
import { Spin } from 'antd';
import CardUsuario from './cards/CardUsuario.jsx';

const ListaUsuarios = ({ arrayUsuarios }) => {
  const [carregando, setLoading] = useState(true);

  if (carregando) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="block w-full">
      <div className="flex flex-col items-start gap-4">
        {Array.isArray(arrayUsuarios) && arrayUsuarios.map(user => <CardUsuario key={user.id} usuario={user} />)}
      </div>
    </div>
  );
};

export default ListaUsuarios;
