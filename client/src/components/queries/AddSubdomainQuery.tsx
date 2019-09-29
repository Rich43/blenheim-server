import gql from 'graphql-tag';

export const QUERY = gql`
    mutation Subdomain($id: ID!, $name: String!, $token: String!) {
        authentication {
            token(token: $token)
        }
        settings {
            createSubDomain(id: $id, name: $name) {
                id
                subdomains
            }
        }
    }
`;
