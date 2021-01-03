import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { GlobalStyles } from 'twin.macro';
import { AppRouter } from './AppRouter';
import { client } from './providers/Apollo';
import UserProvider from './providers/UserProvider';

function App() {
  return (
    <div>
      <GlobalStyles />
      <ApolloProvider client={client}>
        <UserProvider apollo={client}>
          <AppRouter />
        </UserProvider>
      </ApolloProvider>
    </div>
  );
}

export default App;
