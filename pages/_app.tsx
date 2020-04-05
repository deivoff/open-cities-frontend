import * as React from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-common';
import { AuthContext, useAuth } from '$context/auth';

import { Header } from '$widgets/Header';
import withData from '$lib/apollo';


import '$static/styles/_main.sass';

type OpenCitiesProps = AppProps & {
  apollo: ApolloClient<any>
}
const OpenCitiesApp = ({
  Component,
  pageProps,
  apollo
}: OpenCitiesProps) => {
  const authContext = useAuth();
  const { pathname } = useRouter();
  const isMainPage = pathname === '/';

  return (
    <ApolloProvider client={apollo}>
      <AuthContext.Provider value={authContext}>
        <Header fixed={isMainPage} />
        <Component {...pageProps} />
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default withData(OpenCitiesApp);
