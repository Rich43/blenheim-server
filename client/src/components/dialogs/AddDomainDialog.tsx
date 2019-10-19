import React, { FunctionComponent, useContext } from 'react';
import { TextFieldDialog } from './TextFieldDialog';
import { StoreProvider } from '../../StoreProvider';
import { useAddDomainMutation } from "../queries/AddDomainQuery";
import { QUERY } from "../queries/DomainsQuery";
import { AddDomain_settings_createDomain } from "../../types/AddDomain";
import { Domains, DomainsVariables } from "../../types/Domains";

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
            okClicked={() => {
                addDomain({
                        variables: {token: store.token, id: dialogText},
                        update: (cache, {data}) => {
                            const domains: (AddDomain_settings_createDomain | null)[] =
                                data!.settings!.createDomain!.map(item => {
                                return {
                                    __typename: "Domain",
                                    id: item!.id,
                                    subdomains: item!.subdomains
                                };
                            });
                            cache.writeQuery<Domains, DomainsVariables>({
                                query: QUERY,
                                data: {
                                    settings: {
                                        __typename: "Settings",
                                        domains: domains,
                                        defaultSubdomains: null
                                    },
                                    authentication: null
                                }
                            });
                        }
                    }
                ).then();
                setDialogOpen(false);
            }}
            onChange={event => setDialogText(event.target.value || '')}
            dialogTitle='Add Domain'
            dialogContentText='Enter the domain name in the box below. For example: example.com'
            textBoxLabel='Domain:'
        />
    );
}
