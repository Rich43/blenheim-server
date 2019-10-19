import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Domains, DomainsVariables } from '../../types/Domains';

const QUERY = gql`
    query Domains($token: String!) {
        authentication {
            token(token: $token)
        }
        settings {
            domains {
                id
                subdomains
            }
            defaultSubdomains
        }
    }
`;

export const useDomainsQuery = (variables: DomainsVariables) => 
    useQuery<Domains, DomainsVariables>(QUERY, {partialRefetch: true, variables});
