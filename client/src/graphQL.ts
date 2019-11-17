import ApolloClient from 'apollo-boost';

// If you are editing this, also change docker.sh
export const client = new ApolloClient({
    uri: `${window.location.protocol}//${window.location.hostname}:8000`
});
