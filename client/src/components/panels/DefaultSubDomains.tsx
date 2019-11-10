import React, { FunctionComponent, useContext } from 'react';
import { SETTINGS } from '../../App';
import { StoreProvider } from '../../StoreProvider';
import { useSettingsQuery } from "../queries/SettingsQuery";
import { ListItemText } from "@material-ui/core";
import { DashboardCard } from "./generic/DashboardCard";

export const DefaultSubDomains: FunctionComponent = () => {
    const store = useContext(StoreProvider);
    const settings = useSettingsQuery({ token: store.token });

    if (settings.loading || !settings.data) {
        return (<span>Loading...</span>);
    }

    return (
        <DashboardCard
            title='Default Sub Domains (First 5)'
            linkText='Configure settings'
            redirectURL={SETTINGS}
            renderListItem={subdomain => (<ListItemText>{subdomain}</ListItemText>)}
            list={settings.data.settings.defaultSubdomains}
        />
    );
};
