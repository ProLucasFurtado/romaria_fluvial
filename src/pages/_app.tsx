import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { SessionProvider } from 'next-auth/react';
import { theme } from '../styles/theme';
import { UserProvider } from '../contexts/UserContext';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';
import { Footer } from '../components/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Header } from '../components/Header';

const queryClient = new QueryClient();

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <UserProvider>
            <SidebarDrawerProvider>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </SidebarDrawerProvider>
          </UserProvider>
        </ChakraProvider>
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
