import React, { FunctionComponent } from 'react';
import { DomainsListProps } from "../pages/DomainsList";
import { ListItem } from "@material-ui/core";

export const DomainsList: FunctionComponent<DomainsListProps> = (props) => {
    return (<ListItem key={props.count}>{props.row.name}</ListItem>);
};
