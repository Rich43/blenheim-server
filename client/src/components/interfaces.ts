import { Token_settings_domains } from "../types/Token";
import { ApolloError } from "apollo-client";

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
