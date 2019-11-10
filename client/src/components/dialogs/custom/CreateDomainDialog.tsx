import React, { FunctionComponent, useContext } from 'react';
import { TextFieldDialog } from '../generic/TextFieldDialog';
import { StoreProvider } from '../../../StoreProvider';
import { useCreateDomainMutation } from "../../queries/mutations/create/CreateDomainMutation";
import { updateDomainsCache } from "../../queries/DomainsQuery";

export const CreateDomainDialog: FunctionComponent<{
    dialogOpen: boolean;
    onClose: () => void;
}> = ({dialogOpen, onClose}) => {
    const [createDomain] = useCreateDomainMutation();
    const store = useContext(StoreProvider);
    const [dialogText, setDialogText] = React.useState<string>('');

    return (
        <TextFieldDialog
            dialogOpen={dialogOpen}
            onClose={onClose}
            okClicked={
                () => {
                    createDomain(
                        {
                            variables: {token: store.token, id: dialogText},
                            update: updateDomainsCache('createDomain', store.token)
                        }
                    ).then();
                }
            }
            onChange={event => setDialogText(event.target.value || '')}
            dialogTitle='Add Domain'
            dialogContentText='Enter the domain name in the box below. For example: example.com'
            textBoxLabel='Domain:'
            textBoxValue={dialogText}
        />
    );
};
