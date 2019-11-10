import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { UpdateIPv4, UpdateIPv4Variables } from "../../../../types/UpdateIPv4";

const MUTATION = gql`
    mutation UpdateIPv4($token: String!, $id: ID!, $index: Int!) {
        authentication {
            token(token: $token)
        }
        settings {
            updateIpv4(id: $id, index: $index) {
                ipv4
                ipv6
                defaultSubdomains
            }
        }
    }
`;

export const useUpdateIPv4Mutation = () => useMutation<UpdateIPv4, UpdateIPv4Variables>(MUTATION);
