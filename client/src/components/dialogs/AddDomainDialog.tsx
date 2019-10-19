import React, { FunctionComponent, useContext } from 'react';
import { TextFieldDialog } from './TextFieldDialog';
import { StoreProvider } from '../../StoreProvider';
import { useAddDomainMutation } from "../queries/AddDomainQuery";
import { domainsFromCache, QUERY } from "../queries/DomainsQuery";
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
            okClicked={
                () => {
                    addDomain({
                            variables: {token: store.token, id: dialogText},
                            update: (cache, {data}) => {
                                const domainsQuery = domainsFromCache(cache, store.token);
                                if (domainsQuery && data) {
                                    cache.writeQuery<Domains, DomainsVariables>(
                                        {
                                            query: QUERY,
                                            data: {
                                                ...domainsQuery,
                                                settings: {
                                                    ...domainsQuery.settings,
                                                    domains: [
                                                        ...domainsQuery.settings.domains,
                                                        data.settings.createDomain
                                                    ]
                                                }
                                            }
                                        }
                                    );
                                }
                            }
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
