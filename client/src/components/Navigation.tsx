import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, IconButton, Theme } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1
        }
    })
);

export const Navigation: FunctionComponent = () => {
    const classes = useStyles();
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
                <IconButton
                    aria-label='Account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    color='inherit'
                    href=''
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
