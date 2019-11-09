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
import React, { FunctionComponent, useEffect, useState } from 'react';
import { TextFieldDialog } from '../../dialogs/generic/TextFieldDialog';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles<Theme, {}>(() => {
    return ({
        list: {
            maxHeight: 300,
            overflow: 'auto'
        }
    });
});

export const MutableList: FunctionComponent<{
    subheaderText: string;
    placeholderText: string;
    dialogTitle: string;
    dialogTextBoxLabel: string;
    dialogContentText: string;
    listItems: string[];
    onCreate: (value: string) => void;
    onUpdate: (value: string, index: number) => void;
    onDelete: (index: number) => void;
}> = ({
    subheaderText,
    placeholderText,
    dialogTitle,
    dialogTextBoxLabel,
    dialogContentText,
    listItems,
    onCreate,
    onUpdate,
    onDelete
}) => {
    const [items, setItems] = useState(listItems);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [scroll, setScroll] = useState(false);
    const [editText, setEditText] = useState('');
    const [originalEditText, setOriginalEditText] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');
    const [rowIndex, setRowIndex] = useState(0);
    const listRef = React.createRef<HTMLUListElement>();
    const classes = useStyles();

    useEffect(() => {
        if (scroll) {
            listRef.current && listRef.current.scrollTo(0, listRef.current.scrollHeight);
            setScroll(false);
        }
    }, [items, listRef, scroll]);

    const create = () => {
        if (textFieldValue.length > 0) {
            setItems([...items, textFieldValue]);
            onCreate(textFieldValue);
            setTextFieldValue('');
            setScroll(true);
        }
    };

    return <>
        <TextFieldDialog
            textBoxLabel={dialogTextBoxLabel}
            textBoxValue={editText}
            onChange={event => setEditText(event.target.value)}
            dialogOpen={dialogOpen}
            okClicked={() => {
                setItems(items.map((v, i) => i === rowIndex ? editText : v));
                onUpdate(editText, rowIndex);
            }}
            onClose={() => setDialogOpen(false)}
            dialogTitle={dialogTitle.replace('%s', originalEditText)}
            dialogContentText={dialogContentText}
        />
        <List
            subheader={(
                <ListSubheader>
                    {subheaderText}
                </ListSubheader>
            )}
            className={classes.list}
            ref={listRef}
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
                                    setOriginalEditText(item);
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
