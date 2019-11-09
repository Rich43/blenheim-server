import { MutableList } from "../generic/MutableList";
import React, { FunctionComponent } from "react";

export const DefaultSubdomainsMutableList: FunctionComponent = () => {
    return (
        <MutableList
            subheaderText='Default subdomains'
            placeholderText='Enter a new default subdomain'
            listItems={['Single-line item']}
            dialogContentText='Edit the default subdomain in the text box below:'
            dialogTextBoxLabel='Enter a new default subdomain'
            dialogTitle='Editing %s'
            onCreate={() => {
            }}
            onUpdate={() => {
            }}
            onDelete={() => {
            }}
        />
    );
};
