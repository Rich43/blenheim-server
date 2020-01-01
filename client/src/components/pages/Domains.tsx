import React, { FunctionComponent, useContext } from 'react';
import List from '@material-ui/core/List';
import { useDomainsQuery } from '../queries/DomainsQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { DomainsList } from '../lists/custom/DomainsList';
import Fab from '@material-ui/core/Fab';
import { MoreVert } from '@material-ui/icons';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { StoreProvider } from '../../StoreProvider';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { CreateDomainDialog } from "../dialogs/custom/CreateDomainDialog";
import { DeleteDomainDialog } from "../dialogs/custom/DeleteDomainDialog";
import { UpdateDomainDialog } from "../dialogs/custom/UpdateDomainDialog";

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
    const domainsSettingsDomains = (domainsSettings && domainsSettings.domains) || null;
    const [addDomainDialogOpen, setAddDomainDialogOpen] = React.useState<boolean>(false);
    const [editDomainDialogOpen, setEditDomainDialogOpen] = React.useState<boolean>(false);
    const [deleteDomainDialogOpen, setDeleteDomainDialogOpen] = React.useState<boolean>(false);
    if (domains.loading) {
        return (<span>Loading...</span>);
    }
    let count = 0;
    return (
        <>
            <List subheader={
                <ListSubheader disableSticky={true}>
                    Domains and Subdomains
                </ListSubheader>
            }>
                {domainsSettings && domainsSettingsDomains && domainsSettingsDomains.map(domain => {
                    const domainsList = (<><DomainsList domainsSettings={domainsSettings} domainIndex={count}/></>);
                    if (domain) {
                        count += 1;
                        return domainsList;
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
                <MenuItem onClick={() => {
                    setMenuEl(null);
                    setEditDomainDialogOpen(true);
                }}>Edit Domain</MenuItem>
                <MenuItem onClick={() => {
                    setMenuEl(null);
                    setDeleteDomainDialogOpen(true);
                }}>Remove Domain</MenuItem>
            </Menu>
            <CreateDomainDialog dialogOpen={addDomainDialogOpen} onClose={() => setAddDomainDialogOpen(false)} />
            <UpdateDomainDialog dialogOpen={editDomainDialogOpen} onClose={() => setEditDomainDialogOpen(false)} domains={domainsSettingsDomains} />
            <DeleteDomainDialog dialogOpen={deleteDomainDialogOpen} onClose={() => setDeleteDomainDialogOpen(false)} domains={domainsSettingsDomains} />
        </>
    );
};
