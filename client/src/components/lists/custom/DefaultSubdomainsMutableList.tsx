import { MutableList } from "../generic/MutableList";
import React, { FunctionComponent, useContext } from "react";
import { StoreProvider } from "../../../StoreProvider";
import { useSettingsQuery } from "../../queries/SettingsQuery";
import { useCreateDefaultSubDomainMutation } from "../../queries/mutations/create/CreateDefaultSubDomainMutation";
import { useUpdateDefaultSubDomainMutation } from "../../queries/mutations/update/UpdateDefaultSubDomainMutation";
import { useDeleteDefaultSubDomainMutation } from "../../queries/mutations/delete/DeleteDefaultSubDomainMutation";

export const DefaultSubdomainsMutableList: FunctionComponent = () => {
    const store = useContext(StoreProvider);
    const token = store.token;
    const settings = useSettingsQuery({token: store.token});
    const [createDefaultSubDomain] = useCreateDefaultSubDomainMutation();
    const [updateDefaultSubDomain] = useUpdateDefaultSubDomainMutation();
    const [deleteDefaultSubDomain] = useDeleteDefaultSubDomainMutation();

    if (settings.loading) {
        return (
            <span>Loading...</span>
        );
    }

    return (
        <MutableList
            subheaderText='Default subdomains'
            placeholderText='Enter a new default subdomain'
            listItems={(settings.data && settings.data.settings.defaultSubdomains) || []}
            dialogContentText='Edit the default subdomain in the text box below:'
            dialogTextBoxLabel='Enter a new default subdomain'
            dialogTitle='Editing %s'
            onCreate={id => createDefaultSubDomain({
                variables: {
                    token,
                    id
                }
            })}
            onUpdate={(id, index) => updateDefaultSubDomain({
                variables: {
                    token,
                    id,
                    index
                }
            })}
            onDelete={index => deleteDefaultSubDomain({
                variables: {
                    token,
                    index
                }
            })}
        />
    );
};
