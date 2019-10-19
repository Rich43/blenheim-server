import React, { FunctionComponent } from 'react';
import { SelectDialog } from "./SelectDialog";
import { Domains_settings_domains } from "../../types/Domains";

export const DeleteDomainDialog: FunctionComponent<{
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    domains: (Domains_settings_domains | null)[] | null
}> = ({dialogOpen, setDialogOpen, domains}) => {
    const [value, setValue] = React.useState<unknown>(null);
    let firstDomain;
    const domainMap: {[key: string]: string} = {};

    if (domains) {
        for (const domain of domains) {
            if (domain && domain.id) {
                domainMap[domain.id] = domain.id;
                if (!firstDomain) {
                    firstDomain = domain.id;
                }
            }
        }
    }

    if (firstDomain && !value) {
        setValue(firstDomain);
    }

    return (
        <SelectDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            okClicked={() => setDialogOpen(false)}
            onChange={event => setValue(event.target.value)}
            initialValue={value}
            dialogTitle='Delete domain'
            dialogContentText='Use the dropdown list below to select a domain to delete'
            selectData={domainMap}
        />
    );
};
