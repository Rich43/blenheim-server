import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    TextField,
    Theme
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import React, { FunctionComponent, useState } from 'react';
import { TextFieldDialog } from "./dialogs/generic/TextFieldDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles<Theme, {}>((theme) => {
    return ({
        list: {
            maxHeight: 300,
            overflow: 'auto'
        },
    });
});

export const MutableList: FunctionComponent<{
    subheaderText: string;
    placeholderText: string;
    listItems: string[];
    onCreate: (value: string) => void;
    onUpdate: (value: string, index: number) => void;
    onDelete: (index: number) => void;
}> = ({
    subheaderText,
    placeholderText,
    listItems,
    onCreate,
    onUpdate,
    onDelete
}) => {
    const [items, setItems] = useState(listItems);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editText, setEditText] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');
    const [rowIndex, setRowIndex] = useState(0);
    const classes = useStyles();
    const create = () => {
        if (textFieldValue.length > 0) {
            setItems([...items, textFieldValue]);
            onCreate(textFieldValue);
            setTextFieldValue('');
        }
    };

    return <>
        <TextFieldDialog
            textBoxLabel=''
            textBoxValue={editText}
            onChange={event => setEditText(event.target.value)}
            dialogOpen={dialogOpen}
            okClicked={() => {
                setItems(items.map((v, i) => i === rowIndex ? editText: v));
                onUpdate(editText, rowIndex);
            }}
            onClose={() => setDialogOpen(false)}
            dialogTitle='Edit'
            dialogContentText={placeholderText}
        />
        <List
            subheader={(
                <ListSubheader>
                    {subheaderText}
                </ListSubheader>
            )}
            className={classes.list}
        >
            {
                items.map((item, index) => {
                    return (
                        <ListItem>
                            <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => {
                                    setRowIndex(index);
                                    setEditText(item);
                                    setDialogOpen(true);
                                }} edge='end' aria-label='edit'>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => {
                                    setItems(items.filter((value, idx) => { return idx !== index; }));
                                    onDelete(index);
                                }} edge='end' aria-label='delete'>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })
            }
        </List>
        <Box p={2} display='flex' flexDirection='row'>
            <TextField
                placeholder={placeholderText}
                fullWidth
                onChange={event => setTextFieldValue(event.target.value)}
                value={textFieldValue}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        create();
                    }
                }}
            />
            <IconButton onClick={() => create()} edge='end' aria-label='add'>
                <AddIcon />
            </IconButton>
        </Box>
    </>;
};
