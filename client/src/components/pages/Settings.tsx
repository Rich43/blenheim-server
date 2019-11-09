import React, { FunctionComponent } from 'react';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { DefaultSubdomainsMutableList } from "../lists/custom/DefaultSubdomainsMutableList";

export const Settings: FunctionComponent = () => {
    return (
        <form>
            <Container maxWidth='sm'>
                <Paper>
                    <DefaultSubdomainsMutableList />
                </Paper>
            </Container>
        </form>
    );
};
