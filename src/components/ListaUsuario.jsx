import CardUsuario from './cards/CardUsuario.jsx';

const ListaUsuarios = ({ arrayUsuarios }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
        {Array.isArray(arrayUsuarios) &&
          arrayUsuarios.map(user => (
            <div key={user.id} className="h-full">
              <CardUsuario user={user} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListaUsuarios;
