import React, { FunctionComponent, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { createStyles, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { StoreProvider } from '../StoreProvider';
import { deepPurple } from '@material-ui/core/colors';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useReactRouter from 'use-react-router';

const useStyles = makeStyles(() =>
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
    const { history } = useReactRouter();
    const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null);
    const id = menuEl ? 'avatar-menu' : undefined;

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        setMenuEl(event.currentTarget);
    }

    function handleClose() {
        setMenuEl(null);
        store.user = '';
        store.token = '';
        history.push('/');
    }

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
                <IconButton aria-describedby={id} onClick={handleClick}>
                    <Avatar className={classes.avatar}>{store.user.substr(0, 2).toUpperCase()}</Avatar>
                </IconButton>
            </Toolbar>
            <Menu
                id={id}
                anchorEl={menuEl}
                open={Boolean(menuEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        </AppBar>
    );
};
