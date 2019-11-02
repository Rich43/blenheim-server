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
    placeholderText: string;
    listItems: string[];
}> = ({
    subheaderText,
    placeholderText,
    listItems
}) => {
    return <>
        <List subheader={
            <ListSubheader>
                {subheaderText}
            </ListSubheader>
        }>
            {
                listItems.map(item => {
                    return (
                        <ListItem>
                            <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <IconButton edge='end' aria-label='delete'>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })
            }
        }
        </List>
        <Box p={2}>
            <TextField
                placeholder={placeholderText}
                fullWidth
            />
        </Box>
    </>;
};
