import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Settings, SettingsVariables } from "../../types/Settings";

const QUERY = gql`
    query Settings($token: String!) {
        authentication {
            token(token: $token)
        }
        settings {
            defaultSubdomains
            ipv4
            ipv6
        }
    }
`;

export const useSettingsQuery = (variables: SettingsVariables) =>
    useQuery<Settings, SettingsVariables>(QUERY, {partialRefetch: true, variables});
