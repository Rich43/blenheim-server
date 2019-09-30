import React, { FunctionComponent, useContext } from 'react';
import { DomainDialog } from './DomainDialog';
import { StoreProvider } from '../../StoreProvider';
import { useAddDomainMutation } from "../queries/AddDomainQuery";
import MenuItem from "@material-ui/core/MenuItem";

interface AddDomainProps {
    refetch: () => void;
}

export const AddDomain: FunctionComponent<AddDomainProps> = (props) => {
    const [addDomain] = useAddDomainMutation();
    const store = useContext(StoreProvider);
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [dialogText, setDialogText] = React.useState<string>('');

    return (
        <>
            <MenuItem onClick={() => setDialogOpen(true)}>Add Domain</MenuItem>
            <DomainDialog
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                okClicked={() => {
                    addDomain({ variables: { token: store.token, id: dialogText } })
                        .then(dummy => props.refetch());
                    setDialogOpen(false);
                }}
                onChange={event => setDialogText(event.target.value || '')}
                dialogTitle='Add Domain'
                dialogContentText='Enter the domain name in the box below. For example: example.com'
                textBoxLabel='Domain:'
            />
        </>
    );
}
