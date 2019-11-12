import React, { FunctionComponent } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";


export const SingleButtonDialog: FunctionComponent<{
    dialogOpen: boolean;
    okClicked: () => void;
    onClose: () => void;
    dialogTitle: string;
    dialogContent: JSX.Element;
    buttonDisabled: boolean;
}> = ({dialogOpen, okClicked, onClose, dialogTitle, dialogContent, buttonDisabled}) => {
    return (
        <Dialog open={dialogOpen} onClose={() => onClose()} disableBackdropClick={true}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                {dialogContent}
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        okClicked();
                        onClose();
                    }}
                    color='primary'
                    disabled={buttonDisabled}
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};
