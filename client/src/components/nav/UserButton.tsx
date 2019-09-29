import React, { FunctionComponent, useContext } from 'react';
import { createStyles, IconButton } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useReactRouter from 'use-react-router';
import { StoreProvider } from '../../StoreProvider';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() =>
    createStyles({
        avatar: {
            backgroundColor: deepPurple[500]
        }
    })
);

export const UserButton: FunctionComponent = () => {
    const { history } = useReactRouter();
    const [menuEl, setMenuEl] = React.useState<null | HTMLElement>(null);
    const id = menuEl ? 'avatar-menu' : undefined;
    const store = useContext(StoreProvider);
    const classes = useStyles();

    function handleLogout() {
        setMenuEl(null);
        history.push('/logout');
    }

    return (
        <>
            <IconButton aria-describedby={id} onClick={event => setMenuEl(event.currentTarget)}>
                <Avatar className={classes.avatar}>{store.user.substr(0, 2).toUpperCase()}</Avatar>
            </IconButton>
            <Menu
                id={id}
                anchorEl={menuEl}
                open={Boolean(menuEl)}
                onClose={() => setMenuEl(null)}
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
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};
