import gql from 'graphql-tag';

export const QUERY = gql`
    mutation Subdomain($domain: String!, $name: String!, $token: String!) {
        authentication {
            token(token: $token)
        }
        settings {
            createSubDomain(domain: $domain, name: $name) {
                id
                subdomains
            }
        }
    }
`;
