import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { UpdateDomain, UpdateDomainVariables } from "../../../../types/UpdateDomain";

const MUTATION = gql`
    mutation UpdateDomain($token: String!, $id: ID!, $newName: String!) {
        authentication {
            token(token: $token)
        }
        settings {
            updateDomain(id: $id, newName: $newName) {
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

export const useUpdateDomainMutation = () => useMutation<UpdateDomain, UpdateDomainVariables>(MUTATION);
