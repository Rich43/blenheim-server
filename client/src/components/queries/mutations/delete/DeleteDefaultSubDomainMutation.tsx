import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { DeleteDefaultSubDomain, DeleteDefaultSubDomainVariables } from "../../../../types/DeleteDefaultSubDomain";

const MUTATION = gql`
    mutation DeleteDefaultSubDomain($token: String!, $index: Int!) {
        authentication {
            token(token: $token)
        }
        settings {
            deleteDefaultSubDomain(index: $index) {
                ipv4
                ipv6
                defaultSubdomains
            }
        }
    }
`;

export const useDeleteDefaultSubDomainMutation = () => useMutation<DeleteDefaultSubDomain, DeleteDefaultSubDomainVariables>(MUTATION);
