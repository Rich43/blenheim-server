import React, { FunctionComponent, useContext } from 'react';
import { TextFieldDialog } from '../generic/TextFieldDialog';
import { StoreProvider } from '../../../StoreProvider';
import { useCreateDomainMutation } from "../../queries/CreateDomainMutation";
import { updateDomainsCache } from "../../queries/DomainsQuery";

export const CreateDomainDialog: FunctionComponent<{
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}> = ({dialogOpen, setDialogOpen}) => {
    const [createDomain] = useCreateDomainMutation();
    const store = useContext(StoreProvider);
    const [dialogText, setDialogText] = React.useState<string>('');

    return (
        <TextFieldDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            okClicked={
                () => {
                    createDomain(
                        {
                            variables: {token: store.token, id: dialogText},
                            update: updateDomainsCache('createDomain', store.token)
                        }
                    ).then();
                    setDialogOpen(false);
                }
            }
            onChange={event => setDialogText(event.target.value || '')}
            dialogTitle='Add Domain'
            dialogContentText='Enter the domain name in the box below. For example: example.com'
            textBoxLabel='Domain:'
        />
    );
};
