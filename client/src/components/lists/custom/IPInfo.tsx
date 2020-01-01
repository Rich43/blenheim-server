import React, { FunctionComponent } from "react";
import { Domains_settings } from "../../../types/Domains";
import { Box, Typography } from "@material-ui/core";

export const IPInfo: FunctionComponent<{
    domainsSettings: Domains_settings
}> = ({domainsSettings}) => {
    return (
        <>
            <Typography>{domainsSettings.ipv4[0]}</Typography>
            <Box pr={1}/>
            <Typography>{domainsSettings.ipv6[0]}</Typography>
            <Box pr={1}/>
        </>
    );
};
