import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../contexts/Auth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default appWithTranslation(MyApp);
