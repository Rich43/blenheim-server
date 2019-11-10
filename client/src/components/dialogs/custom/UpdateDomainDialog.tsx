import React, { FunctionComponent, useContext } from 'react';
import { SelectTextFieldDialog } from "../generic/SelectTextFieldDialog";
import { createDomainMap, DomainsArray } from "../../common";
import { StoreProvider } from "../../../StoreProvider";
import { useUpdateDomainMutation } from "../../queries/mutations/update/UpdateDomainMutation";
import { updateDomainsCache } from "../../queries/DomainsQuery";

export const UpdateDomainDialog: FunctionComponent<{
    dialogOpen: boolean;
    onClose: () => void;
    domains: DomainsArray
}> = ({dialogOpen, onClose, domains}) => {
    const store = useContext(StoreProvider);
    const [dialogText, setDialogText] = React.useState<string>('');
    const [value, setValue] = React.useState<unknown>(null);
    const {domainMap, firstDomain} = createDomainMap(domains);
    const [updateDomain] = useUpdateDomainMutation();

    if (firstDomain && !value) {
        setValue(firstDomain);
        setDialogText(firstDomain);
    }

    return (
        <SelectTextFieldDialog
            dialogOpen={dialogOpen}
            onClose={onClose}
            okClicked={() => {
                updateDomain(
                    {
                        variables: {
                            token: store.token,
                            id: String(value),
                            newName: dialogText
                        },
                        update: updateDomainsCache('updateDomain', store.token)
                    }
                ).then();
                setValue(null);
                setDialogText('');
            }}
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
