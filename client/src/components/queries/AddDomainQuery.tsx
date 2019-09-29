import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';
import { AddDomain, AddDomainVariables } from "../../types/AddDomain";

export const MUTATION = gql`
    mutation AddDomain($token: String!, $id: ID!) {
        authentication {
            token(token: $token)
        }
        settings {
            createDomain(id: $id, subdomains: []) {
                id
            }
        }
    }
`;

export const useAddDomainMutation = () => useMutation<AddDomain, AddDomainVariables>(MUTATION);
