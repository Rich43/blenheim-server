import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import { DomainsQuery } from '../queries/DomainsQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { DomainsList } from './DomainsList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { DomainDialog } from './DomainDialog';

export const Domains: FunctionComponent = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            fab: {
                position: 'absolute',
                bottom: theme.spacing(4),
                right: theme.spacing(4),
            },
        }),
    );
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    return (
        <>
            <List subheader={
                <ListSubheader component='div'>
                    Domains and Subdomains
                </ListSubheader>
            }>
                <DomainsQuery processRow={DomainsList} />
            </List>
            <Fab className={classes.fab} color='secondary' onClick={() => setDialogOpen(true)}>
                <AddIcon />
            </Fab>
            <DomainDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                dialogTitle='Add Domain'
                dialogContentText='Enter the domain name in the box below. For example: example.com'
                textBoxLabel='Domain:'
            />
        </>
    );
};
