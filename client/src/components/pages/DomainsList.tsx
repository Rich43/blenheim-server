import React, { FunctionComponent, useState } from 'react';
import {
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField
} from '@material-ui/core';
import { AddCircle, ExpandLess, ExpandMore } from '@material-ui/icons';
import { DomainsListProps } from '../interfaces';

export const DomainsList: FunctionComponent<DomainsListProps> = (props) => {
    let innerCount = 0;
    const name = props.row ? props.row.name ? props.row.name : '' : '';
    const [open, setOpen] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    return (
        <>
            <ListItem key={props.count}>
                <ListItemText><Button onClick={() => setOpen(!open)}>{name}</Button></ListItemText>
                <IconButton onClick={() => setDialogOpen(true)}><AddCircle /></IconButton>
                <IconButton onClick={() => setOpen(!open)}>{open ? <ExpandLess /> : <ExpandMore />}</IconButton>
            </ListItem>

            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    {
                        props.defaultSubdomains && props.defaultSubdomains.map(subdomain => {
                            innerCount++;
                            return (
                                <ListItem key={innerCount}>
                                    <ListItemText>{subdomain}</ListItemText>
                                    Default Subdomain
                                </ListItem>
                            );
                        })
                    }
                    {
                        props.row.subdomains && props.row.subdomains.map(subdomain => {
                            innerCount++;
                            return (
                                <ListItem key={innerCount}>
                                    <ListItemText>{subdomain}</ListItemText>
                                </ListItem>
                            );
                        })
                    }
                </List>
            </Collapse>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>Add Subdomain</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter the subdomain name in the box below. For example: &lt;subdomain&gt;.{props.row.name}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='subdomain'
                        label='Subdomain:'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={() => setDialogOpen(false)} color='primary'>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
