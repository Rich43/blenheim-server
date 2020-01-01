import React, { FunctionComponent, useContext } from "react";
import { IconButton, ListItem, ListItemText } from "@material-ui/core";
import { Edit, Remove } from "@material-ui/icons";
import { UpdateSubDomainDialog } from "../../dialogs/custom/UpdateSubDomainDialog";
import { useDeleteSubDomainMutation } from "../../queries/mutations/delete/DeleteSubDomainMutation";
import { StoreProvider } from "../../../StoreProvider";
import { Domains_settings } from "../../../types/Domains";
import { IPInfo } from "./IPInfo";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export const SubDomainListItem: FunctionComponent<{
    count: number,
    domain: string,
    subdomain: string,
    domainsSettings: Domains_settings
}> = ({count, domain, subdomain, domainsSettings}) => {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [editMenuEl, setEditMenuEl] = React.useState<null | HTMLElement>(null);
    const editMenuId = editMenuEl ? 'edit-menu' : undefined;
    const [deleteMenuEl, setDeleteMenuEl] = React.useState<null | HTMLElement>(null);
    const deleteMenuId = deleteMenuEl ? 'delete-menu' : undefined;
    const [deleteSubDomain] = useDeleteSubDomainMutation();
    const store = useContext(StoreProvider);

    return (
        <>
            <ListItem key={`innerLi${count}`}>
                <ListItemText key={`innerLit${count}`}>{subdomain}</ListItemText>
                <IPInfo domainsSettings={domainsSettings}/>
                <IconButton onClick={event => setEditMenuEl(event.currentTarget)}><Edit/></IconButton>
                <IconButton onClick={event => setDeleteMenuEl(event.currentTarget)}><Remove/></IconButton>
            </ListItem>
            <UpdateSubDomainDialog
                domainName={domain}
                oldSubDomain={subdomain}
                index={count}
                dialogOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
            <Menu
                id={editMenuId}
                anchorEl={editMenuEl}
                open={Boolean(editMenuEl)}
                onClose={() => setEditMenuEl(null)}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <MenuItem onClick={() => {
                    setEditMenuEl(null);
                    setDialogOpen(true);
                }}>Edit Subdomain Name</MenuItem>
                <MenuItem onClick={() => {
                    setEditMenuEl(null);
                }}>Edit Custom IPv4 Address</MenuItem>
                <MenuItem onClick={() => {
                    setEditMenuEl(null);
                }}>Edit Custom IPv6 Address</MenuItem>
            </Menu>
            <Menu
                id={deleteMenuId}
                anchorEl={deleteMenuEl}
                open={Boolean(deleteMenuEl)}
                onClose={() => setDeleteMenuEl(null)}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <MenuItem onClick={() => {
                    setDeleteMenuEl(null);
                    deleteSubDomain({
                        variables: {
                            token: store.token,
                            id: domain,
                            index: count
                        }
                    }).then();
                }}>Delete Subdomain</MenuItem>
                <MenuItem onClick={() => {
                    setDeleteMenuEl(null);
                }}>Delete Custom IPv4 Address</MenuItem>
                <MenuItem onClick={() => {
                    setDeleteMenuEl(null);
                }}>Delete Custom IPv6 Address</MenuItem>
            </Menu>
        </>
    );
};
