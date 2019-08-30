/* eslint-disable camelcase,@typescript-eslint/camelcase */
import React, { FunctionComponent, useContext } from 'react';
import gql from 'graphql-tag';
import Query from 'react-apollo/Query';
import { Token, TokenVariables } from '../../types/Token';
import { StoreProvider } from '../../StoreProvider';
import PropTypes from 'prop-types';
import { DomainsListProps } from '../pages/DomainsList';

interface DomainsProps {
    processRow: FunctionComponent<DomainsListProps>;
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
                    subdomains
                }
                defaultSubdomains
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
                            result.push(
                                (
                                    <props.processRow
                                        row={domain}
                                        defaultSubdomains={data!.settings!.defaultSubdomains!}
                                        count={count}
                                    />
                                )
                            );
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
