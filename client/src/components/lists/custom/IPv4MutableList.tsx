import { MutableList } from "../generic/MutableList";
import React, { FunctionComponent, useContext } from "react";
import { StoreProvider } from "../../../StoreProvider";
import { useSettingsQuery } from "../../queries/SettingsQuery";
import { useDeleteIPv4Mutation } from "../../queries/mutations/delete/DeleteIPv4Mutation";
import { useUpdateIPv4Mutation } from "../../queries/mutations/update/UpdateIPv4Mutation";
import { useCreateIPv4Mutation } from "../../queries/mutations/create/CreateIPv4Mutation";

export const IPv4MutableList: FunctionComponent = () => {
    const store = useContext(StoreProvider);
    const token = store.token;
    const settings = useSettingsQuery({token: store.token});
    const [createIPv4] = useCreateIPv4Mutation();
    const [updateIPv4] = useUpdateIPv4Mutation();
    const [deleteIPv4] = useDeleteIPv4Mutation();

    if (settings.loading) {
        return (
            <span>Loading...</span>
        );
    }

    return (
        <MutableList
            subheaderText='IPv4 Addresses'
            placeholderText='Enter a new IPv4 Address'
            listItems={(settings.data && settings.data.settings.ipv4) || []}
            dialogContentText='Edit the IPv4 Address in the text box below:'
            dialogTextBoxLabel='Enter a new IPv4 Address'
            dialogTitle='Editing %s'
            onCreate={id => createIPv4({
                variables: {
                    token,
                    id
                }
            })}
            onUpdate={(id, index) => updateIPv4({
                variables: {
                    token,
                    id,
                    index
                }
            })}
            onDelete={index => deleteIPv4({
                variables: {
                    token,
                    index
                }
            })}
        />
    );
};
