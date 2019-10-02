import React, { FunctionComponent } from 'react';
import { SelectDialog } from "./SelectDialog";
import { Domains_settings_domains } from "../../types/Domains";

interface DeleteDomainDialogProps {
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    domains: (Domains_settings_domains | null)[] | null
}

export const DeleteDomainDialog: FunctionComponent<DeleteDomainDialogProps> = (props) => {
    const [value, setValue] = React.useState<unknown>(null);
    const domainMap: {[key: string]: string} = {};
    if (props.domains) {
        for (const domain of props.domains) {
            if (domain && domain.id) {
                domainMap[domain.id] = domain.id;
            }
        }
    }

    return (
        <SelectDialog
            dialogOpen={props.dialogOpen}
            setDialogOpen={props.setDialogOpen}
            okClicked={() => props.setDialogOpen(false)}
            onChange={event => setValue(event.target.value)}
            initialValue={value}
            dialogTitle='Delete domain'
            dialogContentText='Use the dropdown list below to select a domain to delete'
            selectData={domainMap}
        />
    );
}
