import { AuthProvider } from '../context/AuthContext';
import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
