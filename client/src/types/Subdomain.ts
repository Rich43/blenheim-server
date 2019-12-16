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

export interface Subdomain_settings_createSubDomain_subdomains {
  __typename: "SubDomain";
  id: string;
  ipAddressV4: string | null;
  ipAddressV6: string | null;
}

export interface Subdomain_settings_createSubDomain {
  __typename: "Domain";
  id: string;
  subdomains: Subdomain_settings_createSubDomain_subdomains[];
}

export interface Subdomain_settings {
  __typename: "SettingsMutations";
  createSubDomain: Subdomain_settings_createSubDomain | null;
}

export interface Subdomain {
  authentication: Subdomain_authentication;
  settings: Subdomain_settings;
}

export interface SubdomainVariables {
  id: string;
  name: string;
  token: string;
}
