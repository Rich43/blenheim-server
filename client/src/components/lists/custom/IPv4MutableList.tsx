import { MutableList } from "../generic/MutableList";
import React, { FunctionComponent, useContext } from "react";
import { StoreProvider } from "../../../StoreProvider";
import { useSettingsQuery } from "../../queries/SettingsQuery";

export const IPv4MutableList: FunctionComponent = () => {
    const store = useContext(StoreProvider);
    const settings = useSettingsQuery({token: store.token});
    if (settings.loading) {
        return (
            <span>Loading...</span>
        );
    }
    return (
        <MutableList
            subheaderText='IPv4 Addresses'
            placeholderText='Enter a new IPv4 Address'
            listItems={settings.data && settings.data.settings.ipv4|| []}
            dialogContentText='Edit the IPv4 Address in the text box below:'
            dialogTextBoxLabel='Enter a new IPv4 Address'
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
