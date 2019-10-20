import React, { FunctionComponent, useContext } from 'react';
import { TextFieldDialog } from '../generic/TextFieldDialog';
import { StoreProvider } from '../../../StoreProvider';
import { useAddDomainMutation } from "../../queries/AddDomainQuery";
import { updateDomainsCache } from "../../queries/DomainsQuery";

export const AddDomainDialog: FunctionComponent<{
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
}> = ({dialogOpen, setDialogOpen}) => {
    const [addDomain] = useAddDomainMutation();
    const store = useContext(StoreProvider);
    const [dialogText, setDialogText] = React.useState<string>('');

    return (
        <TextFieldDialog
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            okClicked={
                () => {
                    addDomain(
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
