import React, { FunctionComponent, useState } from 'react';
import { Button, Collapse, IconButton, List, ListItem, ListItemText, } from '@material-ui/core';
import { Edit, ExpandLess, ExpandMore, Remove } from '@material-ui/icons';
import { DomainsListProps } from '../interfaces';
import { AddSubdomainDialog } from "../dialogs/AddSubdomainDialog";

export const DomainsList: FunctionComponent<DomainsListProps> = (props) => {
    let innerCount = 0;
    const name = props.row ? props.row.id ? props.row.id : '' : '';
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <ListItem key={`li${props.count}`}>
                <ListItemText key={`lit${props.count}`}><Button
                    onClick={() => setOpen(!open)}>{name}</Button></ListItemText>
                <AddSubdomainDialog domainName={name} setOpen={setOpen}/>
                <IconButton onClick={() => setOpen(!open)} key={`ib2${props.count}`}>{open ? <ExpandLess/> :
                    <ExpandMore/>}</IconButton>
            </ListItem>

            <Collapse in={open} timeout='auto' key={`col${props.count}`} unmountOnExit>
                <List component='div' disablePadding key={`lst${props.count}`}>
                    {
                        props.defaultSubdomains && props.defaultSubdomains.map(subdomain => {
                            innerCount++;
                            return (
                                <ListItem key={`innerLi${innerCount}`}>
                                    <ListItemText key={`innerLit${innerCount}`}>{subdomain}</ListItemText>
                                    Default Subdomain
                                </ListItem>
                            );
                        })
                    }
                    {
                        props.row.subdomains && props.row.subdomains.map(subdomain => {
                            innerCount++;
                            return (
                                <ListItem key={`innerLi${innerCount}`}>
                                    <ListItemText key={`innerLit${innerCount}`}>{subdomain}</ListItemText>
                                    <IconButton><Edit/></IconButton>
                                    <IconButton><Remove/></IconButton>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Collapse>
        </>
    );
};
