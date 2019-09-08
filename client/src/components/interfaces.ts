import { Token_settings_domains } from "../types/Token";
import { ApolloError } from "apollo-client";
import { FunctionComponent } from "react";

interface DomainsProps {
    row: Token_settings_domains,
    defaultSubdomains: (string | null)[] | null,
    count: number
}

export type DomainsListProps = DomainsProps;

interface QueryProps {
    data: any | undefined;
    error?: ApolloError;
    loading: boolean;
}

export type QueryResultProps = QueryProps;

export interface QueryInputProps {
    queryResult: FunctionComponent<QueryResultProps>;
}
