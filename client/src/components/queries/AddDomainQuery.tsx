import React, { FunctionComponent, useContext } from 'react';
import { StoreProvider } from "../../StoreProvider";
import gql from "graphql-tag";
import Query from "react-apollo/Query";
import { AddDomain, AddDomainVariables } from "../../types/AddDomain";
import { QueryInputProps } from "../interfaces";

interface AddDomainProps extends QueryInputProps {
    domain: string;
}

export const AddDomainQuery: FunctionComponent<AddDomainProps> = (props) => {
    const store = useContext(StoreProvider);
    const QUERY = gql`
        mutation AddDomain($token: String!, $domain: String!) {
            authentication {
                token(token: $token)
            }
            settings {
                createDomain(name: $domain, subdomains: []) {
                    result {
                        name
                    }
                }
            }
        }
    `;
    return (
        <Query<AddDomain, AddDomainVariables> query={QUERY} variables={{ token: store.token, domain: props.domain }}>
            {({ loading, error, data }) => (<props.queryResult loading={loading} error={error} data={data} />)}
        </Query>
    );
};
