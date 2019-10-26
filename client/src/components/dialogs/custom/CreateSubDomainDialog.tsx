import React, { FunctionComponent, useContext } from 'react';
import { IconButton, } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { TextFieldDialog } from '../generic/TextFieldDialog';
import { useCreateSubDomainMutation } from '../../queries/CreateSubDomainMutation';
import { StoreProvider } from '../../../StoreProvider';

export const CreateSubDomainDialog: FunctionComponent<{
    domainName: string;
    onClose: () => void;
}> = ({domainName, onClose}) => {
    const [createSubDomain] = useCreateSubDomainMutation();
    const store = useContext(StoreProvider);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [dialogText, setDialogText] = React.useState<string>('');

    return (
        <>
            <IconButton onClick={() => setDialogOpen(true)}><Add/></IconButton>
            <TextFieldDialog
                dialogOpen={dialogOpen}
                onClose={onClose}
                okClicked={() => {
                    createSubDomain({variables: {token: store.token, id: domainName, name: dialogText}}).then();
                    setDialogOpen(false);
                    onClose();
                }}
                onChange={event => setDialogText(event.target.value || '')}
                dialogTitle='Add Subdomain'
                dialogContentText={`Enter the subdomain name in the box below. For example: <subdomain>.${domainName}`}
                textBoxLabel='Subdomain:'
            />
        </>
    );
}
