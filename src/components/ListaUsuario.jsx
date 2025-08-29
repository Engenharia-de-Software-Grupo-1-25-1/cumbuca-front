import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import CardUsuario from './cards/CardUsuarios';

const ListaUsuarios = ({ arrayUsuarios }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setLoading] = useState(true);

  useEffect(() => {
    const carregarUsuarios = async () => {
      setLoading(true);
      const dados = await arrayUsuarios();
      if (dados) {
        setUsuarios(dados);
      }
      setLoading(false);
    };
    carregarUsuarios();
  }, [arrayUsuarios]);

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
        {Array.isArray(usuarios) && usuarios.map(user => <CardUsuario key={user.id} usuario={user} />)}
      </div>
    </div>
  );
};

export default ListaUsuarios;
