import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { FunctionComponent } from 'react';

export const MutableList: FunctionComponent<{
    subheaderText: string;
}> = ({
    subheaderText
}) => {
    return <>
        <List subheader={
            <ListSubheader>
                {subheaderText}
            </ListSubheader>
        }>
            <ListItem>
                <ListItemText primary='Single-line item' />
                <ListItemSecondaryAction>
                    <IconButton edge='end' aria-label='delete'>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        </List>
        <Box p={2}>
            <TextField
                placeholder='Enter a new default subdomain'
                fullWidth
            />
        </Box>
    </>;
};
