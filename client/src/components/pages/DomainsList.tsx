import React, { FunctionComponent, useState } from 'react';
import { Button, Collapse, IconButton, List, ListItem, ListItemText, } from '@material-ui/core';
import { AddCircle, ExpandLess, ExpandMore } from '@material-ui/icons';
import { DomainsListProps } from '../interfaces';
import { DomainDialog } from './DomainDialog';

export const DomainsList: FunctionComponent<DomainsListProps> = (props) => {
    let innerCount = 0;
    const name = props.row ? props.row.name ? props.row.name : '' : '';
    const [open, setOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    return (
        <>
            <ListItem key={`li${props.count}`}>
                <ListItemText key={`lit${props.count}`}><Button onClick={() => setOpen(!open)}>{name}</Button></ListItemText>
                <IconButton onClick={() => setDialogOpen(true)} key={`ib1${props.count}`}><AddCircle /></IconButton>
                <IconButton onClick={() => setOpen(!open)} key={`ib2${props.count}`}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
            </ListItem>

            <Collapse in={open} timeout='auto' key={`col${props.count}`} unmountOnExit>
                <List component='div' disablePadding key={`lst${props.count}`} >
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
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Collapse>

            <DomainDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                okClicked={() => setDialogOpen(false)}
                onChange={() => {}}
                dialogTitle='Add Subdomain'
                dialogContentText={`Enter the subdomain name in the box below. For example: &lt;subdomain&gt;.${props.row.name}`}
                textBoxLabel='Subdomain:'
            />
        </>
    );
};
