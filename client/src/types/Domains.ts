/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Domains
// ====================================================

export interface Domains_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface Domains_settings_domains {
  __typename: "Domain";
  id: string | null;
  subdomains: (string | null)[] | null;
}

export interface Domains_settings {
  __typename: "Settings";
  domains: (Domains_settings_domains | null)[] | null;
  defaultSubdomains: (string | null)[] | null;
}

export interface Domains {
  authentication: Domains_authentication | null;
  settings: Domains_settings | null;
}

export interface DomainsVariables {
  token: string;
}
