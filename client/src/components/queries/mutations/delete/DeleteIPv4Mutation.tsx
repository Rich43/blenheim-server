import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { DeleteIPv4, DeleteIPv4Variables } from "../../../../types/DeleteIPv4";

const MUTATION = gql`
    mutation DeleteIPv4($token: String!, $index: Int!) {
        authentication {
            token(token: $token)
        }
        settings {
            deleteIpv4(index: $index) {
                ipv4
                ipv6
                defaultSubdomains
            }
        }
    }
`;

export const useDeleteIPv4Mutation = () => useMutation<DeleteIPv4, DeleteIPv4Variables>(MUTATION);
