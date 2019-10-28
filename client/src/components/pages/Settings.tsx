import React, { FunctionComponent } from "react";
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    Paper,
    TextField
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Container from "@material-ui/core/Container";

export const Settings: FunctionComponent = () => {
    return (
        <form>
            <Container maxWidth='sm'>
                <Paper>
                    <List subheader={
                        <ListSubheader>
                            Default subdomains
                        </ListSubheader>
                    }>
                        <ListItem>
                            <ListItemText primary="Single-line item" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                    <Box p={2}>
                        <TextField
                            placeholder='Enter a new default subdomain'
                            fullWidth={true}
                        />
                    </Box>
                </Paper>
            </Container>
        </form>
    );
};
