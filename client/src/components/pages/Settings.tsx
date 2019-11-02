import React, { FunctionComponent } from 'react';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { MutableList } from '../MutableList';

export const Settings: FunctionComponent = () => {
    return (
        <form>
            <Container maxWidth='sm'>
                <Paper>
                    <MutableList />
                </Paper>
            </Container>
        </form>
    );
};
