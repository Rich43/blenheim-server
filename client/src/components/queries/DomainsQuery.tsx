import gql from 'graphql-tag';
import { Token, TokenVariables } from '../../types/Token';
import { useQuery } from '@apollo/react-hooks';

const QUERY = gql`
    query Domains($token: String!) {
        authentication {
            token(token: $token)
        }
        settings {
            domains {
                name
                subdomains
            }
            defaultSubdomains
        }
    }
`;

export const useDomainsQuery = (variables: TokenVariables) => 
    useQuery<Token, TokenVariables>(QUERY, {variables});
