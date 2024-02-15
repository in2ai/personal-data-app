import AuthContextProvider from './src/context-providers/auth-context';
import UserCVContextProvider from './src/context-providers/user-cv-context';
import MainNav from './src/navigation/MainNav';

const App = () => {
  return (
    <AuthContextProvider>
      <UserCVContextProvider>
        <MainNav />
      </UserCVContextProvider>
    </AuthContextProvider>
  );
};

export default App;
