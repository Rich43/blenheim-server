import React, { FunctionComponent } from 'react';
import { SelectDialog } from "./SelectDialog";

interface DeleteDomainDialogProps {
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}

export const DeleteDomainDialog: FunctionComponent<DeleteDomainDialogProps> = (props) => {
    return (
        <SelectDialog
            dialogOpen={props.dialogOpen}
            setDialogOpen={props.setDialogOpen}
            okClicked={() => props.setDialogOpen(false)}
            onChange={() => {}}
            dialogTitle='Delete domain'
            dialogContentText='Use the dropdown list below to select a domain to delete'
            selectData={ {'1': 'test.com'} }
        />
    );
}
