import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, split, concat } from '@apollo/client';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const getToken = () => {
  if(typeof window !== "undefined") {
    const token = localStorage.getItem('__chat-app--token');

    if(token === null) return "";

    try {
      const acessToken = JSON.parse(token).token;
      return acessToken;
    } catch(e) { return ""; }
  }
  return "";
};

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: getToken()
    }
  }));

  return forward(operation);
})

const wsLink =
    typeof window !== "undefined"
        ? new GraphQLWsLink(
                createClient({
                    url: "ws://localhost:5000/graphql", 
                    connectionParams: {
                      authToken: getToken(),
                      authorization: getToken(),
                      credentials: "include",
                      headers: { authorization: getToken() }
                    },
                    
                })
          )
        : null;
  const splitLink = typeof window !== "undefined" ? split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    concat(authMiddleware, httpLink),
  ) : null;

const client = new ApolloClient({
  link: splitLink,
  uri: "http://localhost:5000/graphql",
  cache: new InMemoryCache()
});

export default client;