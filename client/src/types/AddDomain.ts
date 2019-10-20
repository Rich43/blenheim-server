/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDomain
// ====================================================

export interface AddDomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface AddDomain_settings_createDomain {
  __typename: "Domain";
  id: string;
  subdomains: string[];
}

export interface AddDomain_settings {
  __typename: "SettingsMutations";
  createDomain: AddDomain_settings_createDomain[] | null;
}

export interface AddDomain {
  authentication: AddDomain_authentication;
  settings: AddDomain_settings;
}

export interface AddDomainVariables {
  token: string;
  id: string;
}
