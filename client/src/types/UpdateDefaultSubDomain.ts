/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateDefaultSubDomain
// ====================================================

export interface UpdateDefaultSubDomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface UpdateDefaultSubDomain_settings_updateDefaultSubDomain {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface UpdateDefaultSubDomain_settings {
  __typename: "SettingsMutations";
  updateDefaultSubDomain: UpdateDefaultSubDomain_settings_updateDefaultSubDomain;
}

export interface UpdateDefaultSubDomain {
  authentication: UpdateDefaultSubDomain_authentication;
  settings: UpdateDefaultSubDomain_settings;
}

export interface UpdateDefaultSubDomainVariables {
  token: string;
  id: string;
  index: number;
}
