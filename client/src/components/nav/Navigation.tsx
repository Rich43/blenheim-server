import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { UserButton } from './UserButton';

const useStyles = makeStyles(() =>
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
                <UserButton />
            </Toolbar>
        </AppBar>
    );
};
