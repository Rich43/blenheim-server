import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
    uri: `${window.location.protocol}//${window.location.hostname}:8000`
});
