import React, { FunctionComponent } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import { DomainsQuery } from '../queries/DomainsQuery';

export const Domains: FunctionComponent = () => {
    return (
        <Card>
            <CardHeader title='Domains' />
            <CardContent>
                <List>
                    <DomainsQuery processRow={(domain, count) => {
                        return (<ListItem key={count}>{domain.name}</ListItem>);
                    }} />
                </List>
            </CardContent>
            <CardActions>
                <Button size='small' href=''>Configure domains</Button>
            </CardActions>
        </Card>
    );
};
