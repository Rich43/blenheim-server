import React, { FunctionComponent, useContext } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import useReactRouter from 'use-react-router';
import { DOMAINS } from '../../App';
import { DomainsList } from './DomainsList';
import { useDomainsQuery } from '../queries/DomainsQuery';
import { StoreProvider } from '../../StoreProvider';

export const Domains: FunctionComponent = () => {
    const { history } = useReactRouter();
    const store = useContext(StoreProvider);
    const domains = useDomainsQuery({ token: store.token });
    const domainsSettings = domains.data && domains.data.settings;
    if (domains.loading) {
        return (<span>Loading...</span>);
    }
    let count = 1;
    return (
        <Card>
            <CardHeader title='Domains (First 5)' />
            <CardContent>
                <List>
                    {domainsSettings && domainsSettings.domains && domainsSettings.domains.map(domain => {
                        if (domain && count <= 5) {
                            count += 1;
                            return (<DomainsList row={domain} defaultSubdomains={domainsSettings.defaultSubdomains} count={count}/>);
                        } else {
                            return (<></>);
                        }
                    })}
                </List>
            </CardContent>
            <CardActions>
                <Button size='small' href='' onClick={() => history.push(DOMAINS)}>Configure domains</Button>
            </CardActions>
        </Card>
    );
};
