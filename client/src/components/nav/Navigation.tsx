import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import { UserButton } from './UserButton';
import { SideDrawer } from './SideDrawer';
import { Generate } from "./Generate";

const useStyles = makeStyles({
    title: {
        flexGrow: 1
    }
});

export const Navigation: FunctionComponent = () => {
    const classes = useStyles();
    return (
        <AppBar position='static'>
            <Toolbar>
                <SideDrawer />
                <Typography variant='h6' className={classes.title}>Blenheim</Typography>
                <Generate />
                <UserButton />
            </Toolbar>
        </AppBar>
    );
};
