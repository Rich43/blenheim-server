import React, { FunctionComponent, useState } from 'react';
import { Button, Collapse, IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { AddCircle, ExpandLess, ExpandMore } from '@material-ui/icons';
import { DomainsListProps } from '../interfaces';

export const DomainsList: FunctionComponent<DomainsListProps> = (props) => {
    let innerCount = 0;
    const name = props.row ? props.row.name ? props.row.name : '' : '';
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <ListItem key={props.count}>
                <ListItemText><Button onClick={() => setOpen(!open)}>{name}</Button></ListItemText>
                <IconButton><AddCircle /></IconButton>
                <IconButton onClick={() => setOpen(!open)}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
            </ListItem>

            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {
                        props.defaultSubdomains && props.defaultSubdomains.map(subdomain => {
                            innerCount++;
                            return (
                                <ListItem key={innerCount}>{subdomain}</ListItem>
                            );
                        })
                    }
                </List>
            </Collapse>
        </>
    );
};
