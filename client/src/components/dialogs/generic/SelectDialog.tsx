import React, { FunctionComponent } from 'react';
import { MenuItem, Select } from "@material-ui/core";
import { AbstractDialog, AbstractDialogProps } from "./AbstractDialog";

interface SelectDialogProps extends AbstractDialogProps {
    selectData: {[key: string]: string}
    initialValue: unknown;
    onChange: (
        event: React.ChangeEvent<{ name?: string; value: unknown }>,
        child: React.ReactNode,
    ) => void;
}

export const SelectDialog: FunctionComponent<SelectDialogProps> = (props) => {
    return (
        <AbstractDialog
            dialogOpen={props.dialogOpen}
            onClose={props.onClose}
            okClicked={props.okClicked}
            dialogTitle={props.dialogTitle}
            dialogContentText={props.dialogContentText}>
            <Select
                onChange={props.onChange}
                value={props.initialValue}
            >
                { Object.keys(props.selectData).map(key => {
                    return (<MenuItem value={key}>{ props.selectData[key] }</MenuItem>);
                }) }
            </Select>
        </AbstractDialog>
    );
}
