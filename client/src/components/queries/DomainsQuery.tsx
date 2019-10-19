import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Domains, DomainsVariables } from '../../types/Domains';
import { DataProxy } from 'apollo-cache';

export const QUERY = gql`
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
    useQuery<Domains, DomainsVariables>(QUERY, { partialRefetch: true, variables });

export const domainsFromCache = (cache: DataProxy, token: string) => cache.readQuery<Domains, DomainsVariables>(
    {
        query: QUERY,
        variables: {token: token}
    }
);
