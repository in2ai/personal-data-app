import AuthContextProvider from './src/context-providers/auth-context';
import MainNav from './src/navigation/MainNav';

const App = () => {
  return (
    <AuthContextProvider>
      <MainNav />
    </AuthContextProvider>
  );
};

export default App;
