
import { ApolloError } from "apollo-client";
import { FunctionComponent } from "react";
import { Domains_settings_domains } from "../types/Domains";

export interface DomainsListProps {
    row: Domains_settings_domains,
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
