import React, { FunctionComponent, useContext } from 'react';
import { SelectDialog } from "../generic/SelectDialog";
import { useDeleteDomainMutation } from "../../queries/DeleteDomainMutation";
import { StoreProvider } from "../../../StoreProvider";
import { updateDomainsCache } from "../../queries/DomainsQuery";
import { createDomainMap, DomainsArray } from "../../common";

export const DeleteDomainDialog: FunctionComponent<{
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    domains: DomainsArray
}> = ({dialogOpen, setDialogOpen, domains}) => {
    const [value, setValue] = React.useState<unknown>(null);
    const [deleteDomain] = useDeleteDomainMutation();
    const store = useContext(StoreProvider);
    const {domainMap, firstDomain} = createDomainMap(domains);

    if (firstDomain && !value) {
        setValue(firstDomain);
    }

    return (
        <SelectDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            okClicked={() => {
                deleteDomain(
                    {
                        variables: {token: store.token, id: String(value)},
                        update: updateDomainsCache('deleteDomain', store.token)
                    }
                ).then();
                setDialogOpen(false);
                setValue(null);
            }}
            onChange={event => setValue(event.target.value)}
            initialValue={value}
            dialogTitle='Delete domain'
            dialogContentText='Use the dropdown list below to select a domain to delete'
            selectData={domainMap}
        />
    );
};
