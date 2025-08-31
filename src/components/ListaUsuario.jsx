import CardUsuario from './cards/CardUsuario.jsx';

const ListaUsuarios = ({ arrayUsuarios }) => {
  return (
    <div className="w-full px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
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
