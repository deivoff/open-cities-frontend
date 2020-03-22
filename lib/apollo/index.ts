import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';
import { setContext } from 'apollo-link-context';

const GRAPHQL_URL = process.env.NODE_ENV === 'production'
  ? 'http://api.open-cities.ru/graphql'
  : 'http://localhost:4000/graphql';

const defaultLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  fetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = authLink.concat(defaultLink);

export default withApollo(({ initialState }) => new ApolloClient({
  name: 'open-cities',
  link,
  cache: new InMemoryCache() //  rehydrate the cache using the initial data passed from the server:
    .restore(initialState || {}),
  ssrMode: true,
  connectToDevTools: process.env.NODE_ENV !== 'production',
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
}));
