import AuthContextProvider from './src/context-providers/auth-context';
import UserDataContextProvider from './src/context-providers/user-data-context';
import OfferContextProvider from './src/context-providers/offer-context';
import MainNav from './src/navigation/MainNav';

const App = () => {
  return (
    <AuthContextProvider>
      <UserDataContextProvider>
        <OfferContextProvider>
          <MainNav />
        </OfferContextProvider>
      </UserDataContextProvider>
    </AuthContextProvider>
  );
};

export default App;
