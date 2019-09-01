import { Token_settings_domains } from "../types/Token";

interface DomainsProps {
    row: Token_settings_domains,
    defaultSubdomains: (string | null)[] | null,
    count: number
}

export type DomainsListProps = DomainsProps;
