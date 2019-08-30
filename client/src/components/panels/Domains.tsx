import React, { FunctionComponent } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { DomainsQuery } from '../queries/DomainsQuery';
import useReactRouter from 'use-react-router';
import { DOMAINS } from '../../App';
import { DomainsList } from './DomainsList';

export const Domains: FunctionComponent = () => {
    const { history } = useReactRouter();
    return (
        <Card>
            <CardHeader title='Domains' />
            <CardContent>
                <List>
                    <DomainsQuery processRow={DomainsList} />
                </List>
            </CardContent>
            <CardActions>
                <Button size='small' href='' onClick={() => history.push(DOMAINS)}>Configure domains</Button>
            </CardActions>
        </Card>
    );
};
