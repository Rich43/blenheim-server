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
import { TextFieldDialog } from "../../dialogs/generic/TextFieldDialog";
import { useUpdateSubDomainIPv4Mutation } from "../../queries/mutations/update/UpdateSubDomainIPv4Mutation";
import { useUpdateSubDomainIPv6Mutation } from "../../queries/mutations/update/UpdateSubDomainIPv6Mutation";
import { useDeleteSubDomainIPv4Mutation } from "../../queries/mutations/delete/DeleteSubDomainIPv4Mutation";
import { useDeleteSubDomainIPv6Mutation } from "../../queries/mutations/delete/DeleteSubDomainIPv6Mutation";

export const SubDomainListItem: FunctionComponent<{
    domain: string,
    subdomain: string,
    domainsSettings: Domains_settings,
    domainIndex: number
    subdomainIndex: number,
}> = ({subdomainIndex, domain, subdomain, domainsSettings, domainIndex}) => {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [IPv4DialogOpen, setIPv4DialogOpen] = React.useState<boolean>(false);
    const [IPv6DialogOpen, setIPv6DialogOpen] = React.useState<boolean>(false);
    const [editMenuEl, setEditMenuEl] = React.useState<null | HTMLElement>(null);
    const editMenuId = editMenuEl ? 'edit-menu' : undefined;
    const [deleteMenuEl, setDeleteMenuEl] = React.useState<null | HTMLElement>(null);
    const deleteMenuId = deleteMenuEl ? 'delete-menu' : undefined;
    const domainsSubdomain = domainsSettings.domains[domainIndex].subdomains[subdomainIndex];
    const [IPv4Address, setIPv4Address] = React.useState<string>(domainsSubdomain.ipAddressV4 || '');
    const [IPv6Address, setIPv6Address] = React.useState<string>(domainsSubdomain.ipAddressV6 || '');
    const [deleteSubDomain] = useDeleteSubDomainMutation();
    const [updateIPv4SubDomain] = useUpdateSubDomainIPv4Mutation();
    const [updateIPv6SubDomain] = useUpdateSubDomainIPv6Mutation();
    const [deleteIPv4SubDomain] = useDeleteSubDomainIPv4Mutation();
    const [deleteIPv6SubDomain] = useDeleteSubDomainIPv6Mutation();
    const store = useContext(StoreProvider);

    return (
        <>
            <ListItem key={`innerLi${subdomainIndex}`}>
                <ListItemText key={`innerLit${subdomainIndex}`}>{subdomain}</ListItemText>
                <IPInfo domainsSettings={domainsSettings} domainIndex={domainIndex} subdomainIndex={subdomainIndex}/>
                <IconButton onClick={event => setEditMenuEl(event.currentTarget)}><Edit/></IconButton>
                <IconButton onClick={event => setDeleteMenuEl(event.currentTarget)}><Remove/></IconButton>
            </ListItem>
            <UpdateSubDomainDialog
                domainName={domain}
                oldSubDomain={subdomain}
                index={subdomainIndex}
                dialogOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
            <TextFieldDialog
                textBoxLabel="IPv4 Address"
                textBoxValue={IPv4Address}
                onChange={event => setIPv4Address(event.target.value || '')}
                dialogOpen={IPv4DialogOpen}
                okClicked={() => {
                    updateIPv4SubDomain({
                        variables: {
                            token: store.token,
                            id: domain,
                            index: subdomainIndex,
                            name: IPv4Address
                        }
                    }).then();
                }}
                onClose={() => {
                    setIPv4DialogOpen(false);
                    setIPv4Address('');
                }}
                dialogTitle="Custom IPv4 Address"
                dialogContentText="Enter custom IPv4 Address"
            />
            <TextFieldDialog
                textBoxLabel="IPv6 Address"
                textBoxValue={IPv6Address}
                onChange={event => setIPv6Address(event.target.value || '')}
                dialogOpen={IPv6DialogOpen}
                okClicked={() => {
                    updateIPv6SubDomain({
                        variables: {
                            token: store.token,
                            id: domain,
                            index: subdomainIndex,
                            name: IPv6Address
                        }
                    }).then();
                }}
                onClose={() => {
                    setIPv6DialogOpen(false);
                    setIPv6Address('');
                }}
                dialogTitle="Custom IPv6 Address"
                dialogContentText="Enter custom IPv6 Address"
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
                    setIPv4DialogOpen(true);
                }}>Edit Custom IPv4 Address</MenuItem>
                <MenuItem onClick={() => {
                    setEditMenuEl(null);
                    setIPv6DialogOpen(true);
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
                            index: subdomainIndex
                        }
                    }).then();
                }}>Delete Subdomain</MenuItem>
                <MenuItem onClick={() => {
                    setDeleteMenuEl(null);
                    deleteIPv4SubDomain({
                        variables: {
                            token: store.token,
                            id: domain,
                            index: subdomainIndex
                        }
                    }).then();
                }}>Delete Custom IPv4 Address</MenuItem>
                <MenuItem onClick={() => {
                    setDeleteMenuEl(null);
                    deleteIPv6SubDomain({
                        variables: {
                            token: store.token,
                            id: domain,
                            index: subdomainIndex
                        }
                    }).then();
                }}>Delete Custom IPv6 Address</MenuItem>
            </Menu>
        </>
    );
};
