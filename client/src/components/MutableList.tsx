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
import EditIcon from '@material-ui/icons/Edit';
import React, { FunctionComponent, useState } from 'react';
import { TextFieldDialog } from "./dialogs/generic/TextFieldDialog";

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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editText, setEditText] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');
    const [rowIndex, setRowIndex] = useState(0);

    return <>
        <TextFieldDialog
            textBoxLabel=''
            onChange={event => setEditText(event.target.value)}
            dialogOpen={dialogOpen}
            okClicked={() => setItems(items.map((v, i) => i === rowIndex ? editText: v))}
            onClose={() => setDialogOpen(false)}
            dialogTitle='Edit'
            dialogContentText={placeholderText}
        />
        <List subheader={
            <ListSubheader>
                {subheaderText}
            </ListSubheader>
        }>
            {
                items.map((item, index) => {
                    return (
                        <ListItem>
                            <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => {
                                    setRowIndex(index);
                                    setDialogOpen(true);
                                }} edge='end' aria-label='delete'>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => {
                                    setItems(items.filter((value, idx) => { return idx !== index; }));
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
