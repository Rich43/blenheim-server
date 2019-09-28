import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { AddDomain, AddDomainVariables } from '../../types/AddDomain';

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

export const useAddDomainMutation = () => useMutation<AddDomain, AddDomainVariables>(MUTATION);
