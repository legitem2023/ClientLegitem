"use client"
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { ApolloClient, InMemoryCache, ApolloProvider, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { useMemo } from 'react';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_SERVER_LINK,
    credentials:'include'
  });

  const wsLink = new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_WS_SERVER_LINK,
    options: {
      reconnect: true
    }
  });


  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = useMemo(() => {
    return new ApolloClient({
      cache: new InMemoryCache(),
      link
    });
  }, [link]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
