import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from "react-apollo";
import { AddDomain } from "../../types/AddDomain";
import { Domains, DomainsVariables } from "../../types/Domains";

const QUERY = gql`
    query Domains($token: String!) {
        authentication {
            token(token: $token)
        }
        settings {
            domains {
                id
                subdomains {
                    id
                    ipAddressV4
                    ipAddressV6
                }
            }
            defaultSubdomains
            ipv4
            ipv6
        }
    }
`;

export const useDomainsQuery = (variables: DomainsVariables) =>
    useQuery<Domains, DomainsVariables>(QUERY, {partialRefetch: true, variables});

export const updateDomainsCache =
    (queryName: string, token: string) =>
        (cache: DataProxy, fetchResult: FetchResult<AddDomain, Record<string, any>, Record<string, any>>) => {
            const {data} = fetchResult;
            const domainsQuery = cache.readQuery<Domains, DomainsVariables>(
                {
                    query: QUERY,
                    variables: {token: token}
                }
            );
            if (domainsQuery && data && data.settings) {
                const fetchResultData = Reflect.get(data && data.settings, queryName);
                if (fetchResultData) {
                    cache.writeQuery<Domains, DomainsVariables>(
                        {
                            query: QUERY,
                            data: {
                                ...domainsQuery,
                                settings: {
                                    ...domainsQuery.settings,
                                    domains: fetchResultData
                                }
                            }
                        }
                    );
                }
            }
        };
