import React, { FunctionComponent, useContext } from "react";
import { IconButton, ListItem, ListItemText } from "@material-ui/core";
import { Edit, Remove } from "@material-ui/icons";
import { UpdateSubDomainDialog } from "../../dialogs/custom/UpdateSubDomainDialog";
import { useDeleteSubDomainMutation } from "../../queries/mutations/delete/DeleteSubDomainMutation";
import { StoreProvider } from "../../../StoreProvider";
import { Domains_settings } from "../../../types/Domains";
import { IPInfo } from "./IPInfo";

export const SubDomainListItem: FunctionComponent<{
    count: number,
    domain: string,
    subdomain: string,
    domainsSettings: Domains_settings
}> = ({count, domain, subdomain, domainsSettings}) => {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [deleteSubDomain] = useDeleteSubDomainMutation();
    const store = useContext(StoreProvider);

    return (
        <>
            <ListItem key={`innerLi${count}`}>
                <ListItemText key={`innerLit${count}`}>{subdomain}</ListItemText>
                <IPInfo domainsSettings={domainsSettings}/>
                <IconButton onClick={() => setDialogOpen(true)}><Edit/></IconButton>
                <IconButton onClick={() => {
                    deleteSubDomain({
                        variables: {
                            token: store.token,
                            id: domain,
                            index: count - 1
                        }
                    }).then()
                }}><Remove/></IconButton>
            </ListItem>
            <UpdateSubDomainDialog
                domainName={domain}
                oldSubDomain={subdomain}
                index={count - 1}
                dialogOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </>
    );
};
