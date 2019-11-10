import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { CreateDefaultSubDomain, CreateDefaultSubDomainVariables } from "../../../../types/CreateDefaultSubDomain";

const MUTATION = gql`
    mutation CreateDefaultSubDomain($token: String!, $id: ID!) {
        authentication {
            token(token: $token)
        }
        settings {
            createDefaultSubDomain(id: $id) {
                ipv4
                ipv6
                defaultSubdomains
            }
        }
    }
`;

export const useCreateDefaultSubDomainMutation = () => useMutation<CreateDefaultSubDomain, CreateDefaultSubDomainVariables>(MUTATION);
