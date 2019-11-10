import React, { FunctionComponent } from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import useReactRouter from 'use-react-router';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core";

const useStyles = makeStyles<Theme, {}>((theme) => {
    return ({
        card: {
            minHeight: 175
        },
        cardHeader: {
            minHeight: 75
        }
    });
});

export const DashboardCard: FunctionComponent<{
    title: string;
    redirectURL: string;
    renderListItem: (listItem: string, count: number) => JSX.Element;
    list: string[];
    linkText: string;
}> = ({title, redirectURL, renderListItem, list, linkText}) => {
    const { history } = useReactRouter();
    const styles = useStyles();

    let count = 1;
    return (
        <Card>
            <CardHeader title={title} className={styles.cardHeader}/>
            <CardContent className={styles.card}>
                <List>
                    {list.map(listItem => {
                        if (listItem && count <= 5) {
                            count += 1;
                            return (renderListItem(listItem, count));
                        } else {
                            return (<></>);
                        }
                    })}
                </List>
            </CardContent>
            <CardActions>
                <Button size='small' href='' onClick={() => history.push(redirectURL)}>{linkText}</Button>
            </CardActions>
        </Card>
    );
};