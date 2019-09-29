/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Subdomain
// ====================================================

export interface Subdomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface Subdomain_settings_createSubDomain {
  __typename: "Domain";
  id: string | null;
  subdomains: (string | null)[] | null;
}

export interface Subdomain_settings {
  __typename: "SettingsMutations";
  createSubDomain: Subdomain_settings_createSubDomain | null;
}

export interface Subdomain {
  authentication: Subdomain_authentication | null;
  settings: Subdomain_settings | null;
}

export interface SubdomainVariables {
  id: string;
  name: string;
  token: string;
}
