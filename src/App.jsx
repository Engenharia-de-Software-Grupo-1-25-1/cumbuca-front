import { AuthProvider } from './features/auth/AuthContext';
import RoutesApp from './router/routes';

function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
}

export default App;
