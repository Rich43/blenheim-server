import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { DeleteSubDomain, DeleteSubDomainVariables } from "../../../../types/DeleteSubDomain";

const MUTATION = gql`
    mutation DeleteSubDomain($token: String!, $id: ID!, $index: Int!) {
        authentication {
            token(token: $token)
        }
        settings {
            deleteSubDomain(id: $id, index: $index) {
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

export const useDeleteSubDomainMutation = () => useMutation<DeleteSubDomain, DeleteSubDomainVariables>(MUTATION);
