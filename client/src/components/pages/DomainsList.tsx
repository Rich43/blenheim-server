import React, { useState, FunctionComponent } from 'react';
import { ListItem, ListItemText, Collapse, List } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { DomainsListProps } from '../interfaces';

export const DomainsList: FunctionComponent<DomainsListProps> = (props) => {
    let innerCount = 0;
    const name = props.row ? props.row.name ? props.row.name : '' : '';
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <ListItem button key={props.count} onClick={() => setOpen(!open)}>
                <ListItemText>{name}</ListItemText>
                {open ? <ExpandLess /> : <ExpandMore />}
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
