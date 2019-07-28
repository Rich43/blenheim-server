import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Domains } from '../panels/Domains';

export const Home: React.FC = (): JSX.Element => {
    return (
        <Container component='main'>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Domains />
                </Grid>
            </Grid>
        </Container>
    );
};
