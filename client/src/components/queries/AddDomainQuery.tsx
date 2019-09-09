import gql from "graphql-tag";

export const MUTATION = gql`
    mutation AddDomain($token: String!, $domain: String!) {
        authentication {
            token(token: $token)
        }
        settings {
            createDomain(name: $domain, subdomains: []) {
                result {
                    name
                }
            }
        }
    }
`;
