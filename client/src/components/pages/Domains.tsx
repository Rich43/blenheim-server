import React, { FunctionComponent, useContext } from 'react';
import List from '@material-ui/core/List';
import { useDomainsQuery } from '../queries/DomainsQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { DomainsList } from './DomainsList';
import Fab from '@material-ui/core/Fab';
import { MoreVert } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { StoreProvider } from '../../StoreProvider';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { AddDomainDialog } from "../dialogs/AddDomainDialog";

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
    const store = useContext(StoreProvider);
    const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null);
    const id = menuEl ? 'domain-menu' : undefined;
    const domains = useDomainsQuery({ token: store.token });
    const domainsSettings = domains.data && domains.data.settings;
    const [addDomainDialogOpen, setAddDomainDialogOpen] = React.useState<boolean>(false);
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

            <Fab className={classes.fab} color='secondary' onClick={event => setMenuEl(event.currentTarget)}>
                <MoreVert />
            </Fab>

            <Menu
                id={id}
                anchorEl={menuEl}
                open={Boolean(menuEl)}
                onClose={() => setMenuEl(null)}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: -24,
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <MenuItem onClick={() => {
                    setMenuEl(null);
                    setAddDomainDialogOpen(true);
                }}>Add Domain</MenuItem>
                <MenuItem>Edit Domain</MenuItem>
                <MenuItem onClick={() => {
                    setMenuEl(null);
                }}>Remove Domain</MenuItem>
            </Menu>
            <AddDomainDialog refetch={domains.refetch} dialogOpen={addDomainDialogOpen} setDialogOpen={setAddDomainDialogOpen} />
        </>
    );
};
