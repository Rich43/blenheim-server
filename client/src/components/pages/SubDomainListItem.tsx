import React, { FunctionComponent } from "react";
import { IconButton, ListItem, ListItemText } from "@material-ui/core";
import { Edit, Remove } from "@material-ui/icons";
import { UpdateSubDomainDialog } from "../dialogs/custom/UpdateSubDomainDialog";

export const SubDomainListItem: FunctionComponent<{
    count: number,
    domain: string,
    subdomain: string
}> = ({count, domain, subdomain}) => {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    return (
        <>
            <ListItem key={`innerLi${count}`}>
                <ListItemText key={`innerLit${count}`}>{subdomain}</ListItemText>
                <IconButton onClick={() => setDialogOpen(true)}><Edit/></IconButton>
                <IconButton><Remove/></IconButton>
            </ListItem>
            <UpdateSubDomainDialog domainName={domain} index={count - 1} dialogOpen={dialogOpen} onClose={() => setDialogOpen(false)}/>
        </>
    );
};
