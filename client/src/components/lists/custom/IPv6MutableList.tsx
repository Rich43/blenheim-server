import { MutableList } from "../generic/MutableList";
import React, { FunctionComponent, useContext } from "react";
import { StoreProvider } from "../../../StoreProvider";
import { useSettingsQuery } from "../../queries/SettingsQuery";

export const IPv6MutableList: FunctionComponent = () => {
    const store = useContext(StoreProvider);
    const settings = useSettingsQuery({token: store.token});
    if (settings.loading) {
        return (
            <span>Loading...</span>
        );
    }
    return (
        <MutableList
            subheaderText='IPv6 Addresses'
            placeholderText='Enter a new IPv6 Address'
            listItems={settings.data && settings.data.settings.ipv6 || []}
            dialogContentText='Edit the IPv6 Address in the text box below:'
            dialogTextBoxLabel='Enter a new IPv6 Address'
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
