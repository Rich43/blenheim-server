import gql from 'graphql-tag';

export const QUERY = gql`
    query Dns($token: String!) {
        authentication {
            token(token: $token)
        }
        dns {
            generate {
                code
                error
                extra
                success
            }
        }
    }
`;
