import React, { FunctionComponent } from 'react';
import { Domains_settings } from '../../../types/Domains';
import { Box, IconButton, Popover, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';

export const IPInfo: FunctionComponent<{
    domainsSettings: Domains_settings;
    domainIndex?: number;
    subdomainIndex?: number;
}> = ({domainsSettings, domainIndex, subdomainIndex}) => {
    let ipv4 = domainsSettings.ipv4[0];
    let ipv6 = domainsSettings.ipv6[0];
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
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
            <IconButton onClick={event => setAnchorEl(event.currentTarget)}><Info /></IconButton>
            <Popover
                open={!!anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Box p={1}>
                    <Typography>IPv4: {ipv4}</Typography>
                    <Typography>IPv6: {ipv6}</Typography>
                </Box>
            </Popover>
        </>
    );
};
