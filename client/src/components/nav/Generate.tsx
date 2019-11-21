import React, { FunctionComponent, useContext, useState } from "react";
import { Box, Button, Theme, Typography } from "@material-ui/core";
import { QUERY } from "../queries/DnsQuery";
import { StoreProvider } from "../../StoreProvider";
import Query from 'react-apollo/Query';
import { Dns, DnsVariables } from "../../types/Dns";
import { SingleButtonDialog } from "../dialogs/generic/SingleButtonDialog";
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles<Theme, {}>((theme) => {
    return ({
        icon: {
            paddingRight: theme.spacing(1),
        },
    });
});

export const Generate: FunctionComponent = () => {
    const store = useContext(StoreProvider);
    const classes = useStyles();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState(false);

    return (
        <>
            <SingleButtonDialog
                dialogOpen={dialogOpen}
                okClicked={() => {}}
                onClose={() => {
                    setDialogOpen(false);
                    setError(false);
                    setResult('');
                }}
                dialogTitle='Generate'
                dialogContent={(
                    <>
                        <Typography variant='subtitle1'>Generating configuration files...</Typography>
                        <Box p={1} />
                        {dialogOpen && (
                            <Query<Dns, DnsVariables>
                                query={QUERY}
                                variables={{token: store.token}}
                                fetchPolicy='no-cache'
                            >
                                {({ loading, error, data }): JSX.Element => {
                                    if (error) {
                                        setError(true);
                                        setResult(error.message || '');
                                        return (<></>);
                                    }
                                    if (loading) {
                                        return (<></>);
                                    }
                                    if (data && data.dns.generate.success) {
                                        setError(false);
                                        setResult('Generated.');
                                    } else {
                                        setError(true);
                                        setResult((data && data.dns.generate.error) || '');
                                    }
                                    return (<></>);
                                }}
                            </Query>
                        )}
                        {dialogOpen && result.length > 0 && (
                            <Typography variant='subtitle1' color={error ? 'error' : undefined}>
                                {error ?
                                    <ErrorIcon color='error' className={classes.icon} /> :
                                    <InfoIcon color='primary' className={classes.icon} />
                                }
                                {result}
                            </Typography>
                        )}
                    </>
                )}
                buttonDisabled={result === ''}
            />
            <Box pr={2}>
                <Button variant='contained' onClick={() => setDialogOpen(true)}>Generate</Button>
            </Box>
        </>
    );
};
