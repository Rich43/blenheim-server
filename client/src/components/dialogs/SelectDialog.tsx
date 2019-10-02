import React, { FunctionComponent } from 'react';
import { MenuItem, Select } from "@material-ui/core";
import { AbstractDialog, AbstractDialogProps } from "./AbstractDialog";

interface TextFieldDialogProps extends AbstractDialogProps {
    selectData: {[key: string]: string}
    onChange: (
        event: React.ChangeEvent<{ name?: string; value: unknown }>,
        child: React.ReactNode,
    ) => void;
}

export const TextFieldDialog: FunctionComponent<TextFieldDialogProps> = (props) => {
    return (
        <AbstractDialog
            dialogOpen={props.dialogOpen}
            setDialogOpen={props.setDialogOpen}
            okClicked={props.okClicked}
            dialogTitle={props.dialogTitle}
            dialogContentText={props.dialogContentText}>
            <Select
                onChange={props.onChange}
            >
                { Object.keys(props.selectData).map(key => {
                    return (<MenuItem value={key}>{ props.selectData[key] }</MenuItem>);
                }) }
            </Select>
        </AbstractDialog>
    );
}
