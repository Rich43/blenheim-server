import React, { FunctionComponent, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Logo } from '../Logo';
import Close from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    list: {
        width: 200
    }
});

export const SideDrawer: FunctionComponent = () => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    return (
        <>
            <IconButton
                edge='start'
                color='inherit'
                aria-label='Open drawer'
                onClick={(() => setOpen(true))}>
                <MenuIcon />
            </IconButton>
            <Drawer open={open} onClose={() => setOpen(false)}>
                <Box display='flex' flexDirection='column'>
                    <Box display='flex' flexDirection='row'>
                        <Box display='flex' flexGrow={1} />
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Box>
                    <Box display='flex' flexDirection='row' justifyContent='center'>
                        <Box width={100}>
                            <Logo />
                        </Box>
                    </Box>
                    <List className={classes.list}>
                        <ListItem button>
                            <ListItemText>Domains</ListItemText>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};
