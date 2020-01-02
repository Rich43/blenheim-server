import React, { FunctionComponent, useState } from 'react';
import { Button, Collapse, IconButton, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { DomainsListProps } from '../../common';
import { CreateSubDomainDialog } from "../../dialogs/custom/CreateSubDomainDialog";
import { SubDomainListItem } from "./SubDomainListItem";
import { IPInfo } from "./IPInfo";

export const DomainsList: FunctionComponent<DomainsListProps> =
    ({
         domainsSettings,
         domainIndex
     }) => {
        let defaultSubDomainCount = 0;
        let subDomainCount = 0;
        const domainsSettingsDomain = domainsSettings.domains[domainIndex];
        const name = domainsSettingsDomain ? domainsSettingsDomain.id ? domainsSettingsDomain.id : '' : '';
        const [open, setOpen] = useState<boolean>(false);

        return (
            <>
                <ListItem key={`li${domainIndex}`}>
                    <ListItemText key={`lit${domainIndex}`}>
                        <Button onClick={() => setOpen(!open)}>{name}</Button>
                    </ListItemText>
                    <CreateSubDomainDialog domainName={name}/>
                    <IconButton onClick={() => setOpen(!open)} key={`ib2${domainIndex}`}>
                        {open ? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </ListItem>

                <Collapse in={open} timeout='auto' key={`col${domainIndex}`} unmountOnExit>
                    <List component='div' disablePadding key={`lst${domainIndex}`}>
                        {
                            domainsSettings.defaultSubdomains && domainsSettings.defaultSubdomains.map(subdomain => {
                                const listItem = <><ListItem key={`innerLi${defaultSubDomainCount}`}>
                                    <ListItemText
                                        key={`innerLit${defaultSubDomainCount}`}>{subdomain}</ListItemText>
                                    <IPInfo domainsSettings={domainsSettings}/>
                                    <Typography>Default Subdomain</Typography>
                                </ListItem></>;
                                defaultSubDomainCount++;
                                return listItem;
                            })
                        }
                        {
                            domainsSettingsDomain.subdomains && domainsSettingsDomain.subdomains.map(subdomain => {
                                const subDomainListItem = (
                                    <>
                                        <SubDomainListItem
                                            domain={name}
                                            subdomain={subdomain.id}
                                            domainsSettings={domainsSettings}
                                            domainIndex={domainIndex}
                                            subdomainIndex={subDomainCount}
                                        />
                                    </>
                                );
                                subDomainCount++;
                                return subDomainListItem;
                            })
                        }
                    </List>
                </Collapse>
            </>
        );
    };
