import AuthContextProvider from './src/context-providers/auth-context';
import UserDataContextProvider from './src/context-providers/user-data-context';
import OfferContextProvider from './src/context-providers/offer-context';
import MainNav from './src/navigation/MainNav';
import TensorflowContextProvider from './src/context-providers/tensorflow-context';

const App = () => {
  return (
    <AuthContextProvider>
      <UserDataContextProvider>
        <TensorflowContextProvider>
          <OfferContextProvider>
            <MainNav />
          </OfferContextProvider>
        </TensorflowContextProvider>
      </UserDataContextProvider>
    </AuthContextProvider>
  );
};

export default App;
