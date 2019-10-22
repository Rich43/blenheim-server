import { Domains_settings_domains } from "../types/Domains";

export interface DomainsListProps {
    row: Domains_settings_domains,
    defaultSubdomains: (string | null)[] | null,
    count: number
}

export type DomainsArray = Domains_settings_domains[] | null;

export function createDomainMap(domains: DomainsArray) {
    let firstDomain;
    const domainMap: { [key: string]: string } = {};

    if (domains) {
        for (const domain of domains) {
            if (domain && domain.id) {
                domainMap[domain.id] = domain.id;
                if (!firstDomain) {
                    firstDomain = domain.id;
                }
            }
        }
    }
    return {domainMap, firstDomain};
}
