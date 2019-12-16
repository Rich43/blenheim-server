import React, { FunctionComponent, useState } from 'react';
import { Button, Collapse, IconButton, List, ListItem, ListItemText, } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { DomainsListProps } from '../../common';
import { CreateSubDomainDialog } from "../../dialogs/custom/CreateSubDomainDialog";
import { SubDomainListItem } from "./SubDomainListItem";

export const DomainsList: FunctionComponent<DomainsListProps> = (props) => {
    let defaultSubDomainCount = 0;
    let subDomainCount = 0;
    const name = props.row ? props.row.id ? props.row.id : '' : '';
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <ListItem key={`li${props.count}`}>
                <ListItemText key={`lit${props.count}`}><Button
                    onClick={() => setOpen(!open)}>{name}</Button></ListItemText>
                <CreateSubDomainDialog domainName={name} />
                <IconButton onClick={() => setOpen(!open)} key={`ib2${props.count}`}>{open ? <ExpandLess/> :
                    <ExpandMore/>}</IconButton>
            </ListItem>

            <Collapse in={open} timeout='auto' key={`col${props.count}`} unmountOnExit>
                <List component='div' disablePadding key={`lst${props.count}`}>
                    {
                        props.defaultSubdomains && props.defaultSubdomains.map(subdomain => {
                            defaultSubDomainCount++;
                            return (
                                <ListItem key={`innerLi${defaultSubDomainCount}`}>
                                    <ListItemText key={`innerLit${defaultSubDomainCount}`}>{subdomain}</ListItemText>
                                    Default Subdomain
                                </ListItem>
                            );
                        })
                    }
                    {
                        props.row.subdomains && props.row.subdomains.map(subdomain => {
                            subDomainCount++;
                            return (<SubDomainListItem count={subDomainCount} domain={name} subdomain={subdomain.id} />);
                        })
                    }
                </List>
            </Collapse>
        </>
    );
};
