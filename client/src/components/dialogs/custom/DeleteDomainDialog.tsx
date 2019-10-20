import React, { FunctionComponent, useContext } from 'react';
import { SelectDialog } from "../generic/SelectDialog";
import { Domains_settings_domains } from "../../../types/Domains";
import { useDeleteDomainMutation } from "../../queries/DeleteDomainQuery";
import { StoreProvider } from "../../../StoreProvider";
import { updateDomainsCache } from "../../queries/DomainsQuery";

export const DeleteDomainDialog: FunctionComponent<{
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    domains: Domains_settings_domains[] | null
}> = ({dialogOpen, setDialogOpen, domains}) => {
    const [value, setValue] = React.useState<unknown>(null);
    const [deleteDomain] = useDeleteDomainMutation();
    const store = useContext(StoreProvider);
    let firstDomain;
    const domainMap: { [key: string]: string } = {};

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
