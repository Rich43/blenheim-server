import React, { FunctionComponent, useContext } from 'react';
import { IconButton, } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { TextFieldDialog } from './TextFieldDialog';
import { useSubdomainMutation } from '../queries/AddSubdomainQuery';
import { StoreProvider } from '../../StoreProvider';

export const AddSubdomainDialog: FunctionComponent<{
    domainName: string;
    setOpen: (open: boolean) => void;
}> = ({domainName, setOpen}) => {
    const [subdomain] = useSubdomainMutation();
    const store = useContext(StoreProvider);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [dialogText, setDialogText] = React.useState<string>('');

    return (
        <>
            <IconButton onClick={() => setDialogOpen(true)}><Add/></IconButton>
            <TextFieldDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                okClicked={() => {
                    // noinspection JSIgnoredPromiseFromCall
                    subdomain({variables: {token: store.token, id: domainName, name: dialogText}});
                    setDialogOpen(false);
                    setOpen(true);
                }}
                onChange={event => setDialogText(event.target.value || '')}
                dialogTitle='Add Subdomain'
                dialogContentText={`Enter the subdomain name in the box below. For example: <subdomain>.${domainName}`}
                textBoxLabel='Subdomain:'
            />
        </>
    );
}
