/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteDefaultSubDomain
// ====================================================

export interface DeleteDefaultSubDomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface DeleteDefaultSubDomain_settings_deleteDefaultSubDomain {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface DeleteDefaultSubDomain_settings {
  __typename: "SettingsMutations";
  deleteDefaultSubDomain: DeleteDefaultSubDomain_settings_deleteDefaultSubDomain | null;
}

export interface DeleteDefaultSubDomain {
  authentication: DeleteDefaultSubDomain_authentication;
  settings: DeleteDefaultSubDomain_settings;
}

export interface DeleteDefaultSubDomainVariables {
  token: string;
  index: number;
}
