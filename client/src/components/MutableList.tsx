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
import React, { FunctionComponent, useState } from 'react';

export const MutableList: FunctionComponent<{
    subheaderText: string;
    placeholderText: string;
    listItems: string[];
}> = ({
    subheaderText,
    placeholderText,
    listItems
}) => {
    const [items, setItems] = useState(listItems);
    const [textFieldValue, setTextFieldValue] = useState('');
    return <>
        <List subheader={
            <ListSubheader>
                {subheaderText}
            </ListSubheader>
        }>
            {
                items.map(item => {
                    return (
                        <ListItem>
                            <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => {
                                    setItems(items.filter(value => { return value !== item; }));
                                }} edge='end' aria-label='delete'>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })
            }
        </List>
        <Box p={2}>
            <TextField
                placeholder={placeholderText}
                fullWidth
                onChange={event => setTextFieldValue(event.target.value)}
                value={textFieldValue}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        setItems([...items, textFieldValue]);
                        setTextFieldValue('');
                    }
                }}
            />
        </Box>
    </>;
};
