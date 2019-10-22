import React, { FunctionComponent } from 'react';
import { SelectTextFieldDialog } from "../generic/SelectTextFieldDialog";
import { createDomainMap, DomainsArray } from "../../common";

export const EditDomainDialog: FunctionComponent<{
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    domains: DomainsArray
}> = ({dialogOpen, setDialogOpen, domains}) => {
    // const store = useContext(StoreProvider);
    const [dialogText, setDialogText] = React.useState<string>('');
    const [value, setValue] = React.useState<unknown>(null);
    const {domainMap, firstDomain} = createDomainMap(domains);

    if (firstDomain && !value) {
        setValue(firstDomain);
        setDialogText(firstDomain);
    }

    return (
        <SelectTextFieldDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            okClicked={
                () => {
                    setDialogOpen(false);
                }
            }
            onTextFieldChange={event => setDialogText(event.target.value || '')}
            onSelectChange={event => {
                setValue(event.target.value);
                setDialogText(String(event.target.value));
            }}
            selectInitialValue={value}
            dialogTitle='Edit Domain'
            dialogContentText='Select a domain to edit from the dropdown box then enter a new domain name in the box below.'
            textBoxLabel='Domain:'
            textBoxValue={dialogText}
            selectData={domainMap}
        />
    );
};
