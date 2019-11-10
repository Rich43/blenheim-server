import React, { FunctionComponent, useContext } from 'react';
import { TextFieldDialog } from '../generic/TextFieldDialog';
import { StoreProvider } from '../../../StoreProvider';
import { useUpdateSubDomainMutation } from "../../queries/mutations/update/UpdateSubDomainMutation";

export const UpdateSubDomainDialog: FunctionComponent<{
    domainName: string;
    oldSubDomain: string;
    index: number;
    dialogOpen: boolean;
    onClose: () => void;
}> = ({domainName, oldSubDomain, index, dialogOpen, onClose}) => {
    const [updateSubDomain] = useUpdateSubDomainMutation();
    const store = useContext(StoreProvider);
    const [dialogText, setDialogText] = React.useState<string>(oldSubDomain);

    return (
        <TextFieldDialog
            dialogOpen={dialogOpen}
            onClose={onClose}
            okClicked={() => {
                updateSubDomain(
                    {
                        variables: {token: store.token, id: domainName, index: index, name: dialogText}
                    }
                ).then();
            }}
            onChange={event => setDialogText(event.target.value || '')}
            dialogTitle='Edit Subdomain'
            dialogContentText={`Enter the subdomain name in the box below. For example: <subdomain>.${domainName}`}
            textBoxLabel='Subdomain:'
            textBoxValue={dialogText}
        />
    );
};
