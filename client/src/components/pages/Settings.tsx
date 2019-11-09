import React, { FunctionComponent } from 'react';
import { Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { MutableList } from '../lists/generic/MutableList';

export const Settings: FunctionComponent = () => {
    return (
        <form>
            <Container maxWidth='sm'>
                <Paper>
                    <MutableList
                        subheaderText='Default subdomains'
                        placeholderText='Enter a new default subdomain'
                        listItems={['Single-line item']}
                        dialogContentText='Edit the default subdomain in the text box below:'
                        dialogTextBoxLabel='Enter a new default subdomain'
                        dialogTitle='Editing %s'
                        onCreate={() => {}}
                        onUpdate={() => {}}
                        onDelete={() => {}}
                    />
                </Paper>
            </Container>
        </form>
    );
};
