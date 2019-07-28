/* eslint-disable camelcase,@typescript-eslint/camelcase */
import React, { FunctionComponent, useContext } from 'react';
import gql from 'graphql-tag';
import Query from 'react-apollo/Query';
import { Token, Token_settings_domains, TokenVariables } from '../../types/Token';
import { StoreProvider } from '../../StoreProvider';
import PropTypes from 'prop-types';

interface DomainsProps {
    processRow: (row: Token_settings_domains, count: number) => JSX.Element;
}

type Props = DomainsProps;

export const DomainsQuery: FunctionComponent<Props> = (props) => {
    const store = useContext(StoreProvider);
    const QUERY = gql`
        query Token($token: String!) {
            authentication {
                token(token: $token)
            }
            settings {
                domains {
                    name
                }
            }
        }
    `;
    return (
        <Query<Token, TokenVariables> query={QUERY} variables={{ token: store.token }}>
            {({ loading, error, data }) => {
                const result: JSX.Element[] = [];
                let count = 0;
                if (data && data.settings && data.settings.domains) {
                    for (const domain of data.settings.domains) {
                        if (domain) {
                            result.push(props.processRow(domain, count));
                            count++;
                        }
                    }
                }
                return result;
            }}
        </Query>
    );
};

DomainsQuery.propTypes = {
    processRow: PropTypes.func.isRequired
};
