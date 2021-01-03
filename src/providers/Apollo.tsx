import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { auth } from '../config/firebase';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_HOST,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await auth.currentUser?.getIdToken();
  return {
    headers: {
      ...headers,
      'app-version': process.env.REACT_APP_VERSION,
      'app-build': process.env.REACT_APP_BUILD,
      token: token ? `${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
    },
  },
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
