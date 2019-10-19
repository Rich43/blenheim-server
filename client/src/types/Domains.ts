/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Domains
// ====================================================

export interface Domains_authentication {
  __typename: "Authentication";
  token: string;
}

export interface Domains_settings_domains {
  __typename: "Domain";
  id: string;
  subdomains: string[];
}

export interface Domains_settings {
  __typename: "Settings";
  domains: Domains_settings_domains[];
  defaultSubdomains: string[];
}

export interface Domains {
  authentication: Domains_authentication;
  settings: Domains_settings;
}

export interface DomainsVariables {
  token: string;
}
