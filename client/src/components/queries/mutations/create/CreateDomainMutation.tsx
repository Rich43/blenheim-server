import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { AddDomain, AddDomainVariables } from "../../../../types/AddDomain";

const MUTATION = gql`
    mutation AddDomain($token: String!, $id: ID!) {
        authentication {
            token(token: $token)
        }
        settings {
            createDomain(id: $id, subdomains: []) {
                id
                subdomains {
                    id
                    ipAddressV4
                    ipAddressV6
                }
            }
        }
    }
`;

export const useCreateDomainMutation = () => useMutation<AddDomain, AddDomainVariables>(MUTATION);
