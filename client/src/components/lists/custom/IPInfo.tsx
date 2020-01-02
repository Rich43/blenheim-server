import React, { FunctionComponent } from "react";
import { Domains_settings } from "../../../types/Domains";
import { Box, Typography } from "@material-ui/core";

export const IPInfo: FunctionComponent<{
    domainsSettings: Domains_settings;
    domainIndex?: number;
    subdomainIndex?: number;
}> = ({domainsSettings, domainIndex, subdomainIndex}) => {
    let ipv4 = domainsSettings.ipv4[0];
    let ipv6 = domainsSettings.ipv6[0];
    if (domainIndex !== undefined && subdomainIndex !== undefined) {
        const ipv4Subdomain = domainsSettings.domains[domainIndex].subdomains[subdomainIndex].ipAddressV4;
        const ipv6Subdomain = domainsSettings.domains[domainIndex].subdomains[subdomainIndex].ipAddressV6;
        if (ipv4Subdomain) {
            ipv4 = ipv4Subdomain;
        }
        if (ipv6Subdomain) {
            ipv6 = ipv6Subdomain;
        }
    }
    return (
        <>
            <Typography>{ipv4}</Typography>
            <Box pr={1}/>
            <Typography>{ipv6}</Typography>
            <Box pr={1}/>
        </>
    );
};
