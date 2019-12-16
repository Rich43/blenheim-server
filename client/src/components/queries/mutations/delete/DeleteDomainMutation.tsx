import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { DeleteDomain, DeleteDomainVariables } from "../../../../types/DeleteDomain";

const MUTATION = gql`
    mutation DeleteDomain($token: String!, $id: ID!) {
        authentication {
            token(token: $token)
        }
        settings {
            deleteDomain(id: $id) {
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

export const useDeleteDomainMutation = () => useMutation<DeleteDomain, DeleteDomainVariables>(MUTATION);
