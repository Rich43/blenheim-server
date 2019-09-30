import React, { FunctionComponent, useContext } from 'react';
import { IconButton, } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { DomainDialog } from './DomainDialog';
import { useSubdomainMutation } from '../queries/AddSubdomainQuery';
import { StoreProvider } from '../../StoreProvider';

interface AddSubdomainProps {
    domainName: string;
    setOpen: (open: boolean) => void;
}

export const AddSubdomain: FunctionComponent<AddSubdomainProps> = (props) => {
    const [subdomain] = useSubdomainMutation();
    const store = useContext(StoreProvider);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [dialogText, setDialogText] = React.useState<string>('');

    return (
        <>
            <IconButton onClick={() => setDialogOpen(true)}><AddCircle/></IconButton>
            <DomainDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                okClicked={() => {
                    // noinspection JSIgnoredPromiseFromCall
                    subdomain({variables: {token: store.token, id: props.domainName, name: dialogText}});
                    setDialogOpen(false);
                    props.setOpen(true);
                }}
                onChange={event => setDialogText(event.target.value || '')}
                dialogTitle='Add Subdomain'
                dialogContentText={`Enter the subdomain name in the box below. For example: <subdomain>.${props.domainName}`}
                textBoxLabel='Subdomain:'
            />
        </>
    );
}
