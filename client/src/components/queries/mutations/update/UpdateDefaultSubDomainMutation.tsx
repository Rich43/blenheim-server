import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { UpdateDefaultSubDomain, UpdateDefaultSubDomainVariables } from "../../../../types/UpdateDefaultSubDomain";

const MUTATION = gql`
    mutation UpdateDefaultSubDomain($token: String!, $id: ID!, $index: Int!) {
        authentication {
            token(token: $token)
        }
        settings {
            updateDefaultSubDomain(id: $id, index: $index) {
                ipv4
                ipv6
                defaultSubdomains
            }
        }
    }
`;

export const useUpdateDefaultSubDomainMutation = () => useMutation<UpdateDefaultSubDomain, UpdateDefaultSubDomainVariables>(MUTATION);
