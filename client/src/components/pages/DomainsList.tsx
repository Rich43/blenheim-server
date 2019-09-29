import React, { FunctionComponent, useState, useContext } from 'react';
import { Button, Collapse, IconButton, List, ListItem, ListItemText, } from '@material-ui/core';
import { AddCircle, ExpandLess, ExpandMore } from '@material-ui/icons';
import { DomainsListProps } from '../interfaces';
import { DomainDialog } from './DomainDialog';
import { useSubdomainMutation } from '../queries/AddSubdomainQuery';
import { StoreProvider } from '../../StoreProvider';

export const DomainsList: FunctionComponent<DomainsListProps> = (props) => {
    let innerCount = 0;
    const name = props.row ? props.row.id ? props.row.id : '' : '';
    const [open, setOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [dialogText, setDialogText] = React.useState<string>('');
    const [subdomain] = useSubdomainMutation();
    const store = useContext(StoreProvider);

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
                okClicked={() => {
                    subdomain({ variables: { token: store.token, id: name, name: dialogText } });
                    setDialogOpen(false);
                }}
                onChange={event => setDialogText(event.target.value || '')}
                dialogTitle='Add Subdomain'
                dialogContentText={`Enter the subdomain name in the box below. For example: <subdomain>.${props.row.id}`}
                textBoxLabel='Subdomain:'
            />
        </>
    );
};
