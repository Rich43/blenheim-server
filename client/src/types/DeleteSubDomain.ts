/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteSubDomain
// ====================================================

export interface DeleteSubDomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface DeleteSubDomain_settings_deleteSubDomain {
  __typename: "Domain";
  id: string;
  subdomains: string[];
}

export interface DeleteSubDomain_settings {
  __typename: "SettingsMutations";
  deleteSubDomain: DeleteSubDomain_settings_deleteSubDomain | null;
}

export interface DeleteSubDomain {
  authentication: DeleteSubDomain_authentication;
  settings: DeleteSubDomain_settings;
}

export interface DeleteSubDomainVariables {
  token: string;
  id: string;
  index: number;
}
