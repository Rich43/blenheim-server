import { MutableList } from "../generic/MutableList";
import React, { FunctionComponent, useContext } from "react";
import { StoreProvider } from "../../../StoreProvider";
import { useSettingsQuery } from "../../queries/SettingsQuery";

export const DefaultSubdomainsMutableList: FunctionComponent = () => {
    const store = useContext(StoreProvider);
    const settings = useSettingsQuery({token: store.token});
    if (settings.loading) {
        return (
            <span>Loading...</span>
        );
    }
    return (
        <MutableList
            subheaderText='Default subdomains'
            placeholderText='Enter a new default subdomain'
            listItems={settings.data && settings.data.settings.defaultSubdomains || []}
            dialogContentText='Edit the default subdomain in the text box below:'
            dialogTextBoxLabel='Enter a new default subdomain'
            dialogTitle='Editing %s'
            onCreate={() => {
            }}
            onUpdate={() => {
            }}
            onDelete={() => {
            }}
        />
    );
};
