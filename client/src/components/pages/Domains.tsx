import React, { FunctionComponent } from 'react';
import List from '@material-ui/core/List';
import { DomainsQuery } from '../queries/DomainsQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import { DomainsList } from './DomainsList';

export const Domains: FunctionComponent = () => {
    return (
        <List subheader={
            <ListSubheader component='div'>
                Domains and Subdomains
            </ListSubheader>
        }>
            <DomainsQuery processRow={DomainsList} />
        </List>
    );
};
