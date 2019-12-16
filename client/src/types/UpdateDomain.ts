/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateDomain
// ====================================================

export interface UpdateDomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface UpdateDomain_settings_updateDomain_subdomains {
  __typename: "SubDomain";
  id: string;
  ipAddressV4: string | null;
  ipAddressV6: string | null;
}

export interface UpdateDomain_settings_updateDomain {
  __typename: "Domain";
  id: string;
  subdomains: UpdateDomain_settings_updateDomain_subdomains[];
}

export interface UpdateDomain_settings {
  __typename: "SettingsMutations";
  updateDomain: UpdateDomain_settings_updateDomain[] | null;
}

export interface UpdateDomain {
  authentication: UpdateDomain_authentication;
  settings: UpdateDomain_settings;
}

export interface UpdateDomainVariables {
  token: string;
  id: string;
  newName: string;
}
