import React, { FunctionComponent, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, IconButton, Theme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { StoreProvider } from '../StoreProvider';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1
        },
        avatar: {
            backgroundColor: deepPurple[500]
        }
    })
);

export const Navigation: FunctionComponent = () => {
    const classes = useStyles();
    const store = useContext(StoreProvider);
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='Open drawer'
                    href=''>
                    <MenuIcon />
                </IconButton>
                <Typography variant='h6' className={classes.title}>Blenheim</Typography>
                <IconButton href=''>
                    <Avatar className={classes.avatar}>{store.user.substr(0, 2).toUpperCase()}</Avatar>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
