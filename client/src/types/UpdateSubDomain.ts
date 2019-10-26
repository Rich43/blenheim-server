/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSubDomain
// ====================================================

export interface UpdateSubDomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface UpdateSubDomain_settings_updateSubDomain {
  __typename: "Domain";
  id: string;
  subdomains: string[];
}

export interface UpdateSubDomain_settings {
  __typename: "SettingsMutations";
  updateSubDomain: UpdateSubDomain_settings_updateSubDomain | null;
}

export interface UpdateSubDomain {
  authentication: UpdateSubDomain_authentication;
  settings: UpdateSubDomain_settings;
}

export interface UpdateSubDomainVariables {
  token: string;
  id: string;
  index: number;
  name: string;
}
