import { GraphQLClient } from 'graphql-request';

const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
};

const graphqlClient = new GraphQLClient(import.meta.env.VITE_API_URL+"/graphql", {
  headers: getHeaders,
});

// Function to update headers dynamically
export const updateGraphQLClientToken = (token?: string | null) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
  graphqlClient.requestConfig.headers = getHeaders;
};

export default graphqlClient;
