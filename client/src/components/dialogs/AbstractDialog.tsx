import React, { FunctionComponent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";

export interface AbstractDialogProps {
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    okClicked: () => void;
    dialogTitle: string;
    dialogContentText: string;
}

export const AbstractDialog: FunctionComponent<AbstractDialogProps> = (props) => {
    return (
        <Dialog open={props.dialogOpen} onClose={() => props.setDialogOpen(false)}>
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.dialogContentText}
                </DialogContentText>
                { props.children }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setDialogOpen(false)} color='primary'>
                    Cancel
                </Button>
                <Button onClick={props.okClicked} color='primary'>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
