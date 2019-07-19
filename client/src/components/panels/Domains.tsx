import React, { FunctionComponent, useContext } from 'react';
import gql from 'graphql-tag';
import { StoreProvider } from '../../StoreProvider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Query from 'react-apollo/Query';
import { Token, TokenVariables } from '../../types/Token';
import ListItem from '@material-ui/core/ListItem';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export const Domains: FunctionComponent = () => {
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
    const store = useContext(StoreProvider);
    return (
        <Card>
            <CardHeader title='Domains' />
            <CardContent>
                <List>
                    <Query<Token, TokenVariables> query={QUERY} variables={{ token: store.token }}>
                        {({ loading, error, data }) => {
                            const result: JSX.Element[] = [];
                            let count = 0;
                            if (data && data.settings && data.settings.domains) {
                                for (const domain of data.settings.domains) {
                                    if (domain) {
                                        result.push((<ListItem key={count}>{domain.name}</ListItem>));
                                        count++;
                                    }
                                }
                            }
                            return result;
                        }}
                    </Query>
                </List>
            </CardContent>
            <CardActions>
                <Button size='small' href=''>Configure domains</Button>
            </CardActions>
        </Card>
    );
};
