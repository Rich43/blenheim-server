import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

export const Home: React.FC = (): JSX.Element => {
    return (
        <Container component='main'>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Card>
                        <CardHeader title='Domains' />
                        <CardContent>
                            List of domains...
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
