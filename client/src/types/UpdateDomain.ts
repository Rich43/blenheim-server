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

export interface UpdateDomain_settings_updateDomain {
  __typename: "Domain";
  id: string;
  subdomains: string[];
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
