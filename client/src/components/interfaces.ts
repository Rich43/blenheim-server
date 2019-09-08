import { Token_settings_domains } from "../types/Token";
import { ApolloError } from "apollo-client";
import { FunctionComponent } from "react";

export interface DomainsListProps {
    row: Token_settings_domains,
    defaultSubdomains: (string | null)[] | null,
    count: number
}

export interface QueryProps {
    data: any | undefined;
    error?: ApolloError;
    loading: boolean;
}

export interface QueryInputProps {
    queryResult: FunctionComponent<QueryProps>;
}
