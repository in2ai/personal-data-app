import AuthContextProvider from './src/context-providers/auth-context';
import UserDataContextProvider from './src/context-providers/user-data-context';
import MainNav from './src/navigation/MainNav';

const App = () => {
  return (
    <AuthContextProvider>
      <UserDataContextProvider>
        <MainNav />
      </UserDataContextProvider>
    </AuthContextProvider>
  );
};

export default App;
