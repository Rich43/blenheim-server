/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteDomain
// ====================================================

export interface DeleteDomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface DeleteDomain_settings_deleteDomain_subdomains {
  __typename: "SubDomain";
  id: string;
  ipAddressV4: string | null;
  ipAddressV6: string | null;
}

export interface DeleteDomain_settings_deleteDomain {
  __typename: "Domain";
  id: string;
  subdomains: DeleteDomain_settings_deleteDomain_subdomains[];
}

export interface DeleteDomain_settings {
  __typename: "SettingsMutations";
  deleteDomain: DeleteDomain_settings_deleteDomain[] | null;
}

export interface DeleteDomain {
  authentication: DeleteDomain_authentication;
  settings: DeleteDomain_settings;
}

export interface DeleteDomainVariables {
  token: string;
  id: string;
}
