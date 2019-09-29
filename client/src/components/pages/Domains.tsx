import React, { FunctionComponent, useContext } from 'react';
import List from '@material-ui/core/List';
import { useDomainsQuery } from '../queries/DomainsQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { DomainsList } from './DomainsList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { DomainDialog } from './DomainDialog';
import { useAddDomainMutation } from '../queries/AddDomainQuery';
import { StoreProvider } from '../../StoreProvider';

export const Domains: FunctionComponent = () => {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            fab: {
                position: 'fixed',
                bottom: theme.spacing(4),
                right: theme.spacing(4)
            }
        })
    );
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [dialogText, setDialogText] = React.useState<string>('');
    const store = useContext(StoreProvider);
    const [addDomain] = useAddDomainMutation();
    const domains = useDomainsQuery({ token: store.token });
    const domainsSettings = domains.data && domains.data.settings;
    if (domains.loading) {
        return (<span>Loading...</span>);
    }
    let count = 1;
    return (
        <>
            <List subheader={
                <ListSubheader component='div'>
                    Domains and Subdomains
                </ListSubheader>
            }>
                {domainsSettings && domainsSettings.domains && domainsSettings.domains.map(domain => {
                    if (domain) {
                        count += 1;
                        return (<DomainsList row={domain} defaultSubdomains={domainsSettings.defaultSubdomains} count={count}/>);
                    } else {
                        return (<></>);
                    }
                })}
            </List>

            <Fab className={classes.fab} color='secondary' onClick={() => setDialogOpen(true)}>
                <AddIcon />
            </Fab>

            <DomainDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                okClicked={() => {
                    addDomain({ variables: { token: store.token, id: dialogText } })
                        .then(dummy => domains.refetch());
                    setDialogOpen(false);
                }}
                onChange={event => setDialogText(event.target.value || '')}
                dialogTitle='Add Domain'
                dialogContentText='Enter the domain name in the box below. For example: example.com'
                textBoxLabel='Domain:'
            />
        </>
    );
};
