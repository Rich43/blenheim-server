import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import gql from 'graphql-tag';
import Query from 'react-apollo/Query';
import { StoreProvider } from '../StoreProvider';
import { Token, TokenVariables } from '../types/Token';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

export const Home: React.FC = (): JSX.Element => {
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
        <Container component='main'>
            <Grid container spacing={2}>
                <Grid item xs={3}>
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
                            <Button size='small'>Configure domains</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};
