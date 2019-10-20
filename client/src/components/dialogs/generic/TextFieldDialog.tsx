import React, { FunctionComponent } from 'react';
import { TextField } from "@material-ui/core";
import { AbstractDialog, AbstractDialogProps } from "./AbstractDialog";

interface TextFieldDialogProps extends AbstractDialogProps {
    textBoxLabel: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
}

export const TextFieldDialog: FunctionComponent<TextFieldDialogProps> = (props) => {
    return (
        <AbstractDialog
            dialogOpen={props.dialogOpen}
            setDialogOpen={props.setDialogOpen}
            okClicked={props.okClicked}
            dialogTitle={props.dialogTitle}
            dialogContentText={props.dialogContentText}>
            <TextField
                autoFocus
                margin='dense'
                id={props.textBoxLabel}
                label={props.textBoxLabel}
                fullWidth
                onChange={props.onChange}
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        props.okClicked();
                    }
                }}
            />
        </AbstractDialog>
    );
}
