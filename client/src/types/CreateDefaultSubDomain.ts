/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDefaultSubDomain
// ====================================================

export interface CreateDefaultSubDomain_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface CreateDefaultSubDomain_settings_createDefaultSubDomain {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface CreateDefaultSubDomain_settings {
  __typename: "SettingsMutations";
  createDefaultSubDomain: CreateDefaultSubDomain_settings_createDefaultSubDomain | null;
}

export interface CreateDefaultSubDomain {
  authentication: CreateDefaultSubDomain_authentication;
  settings: CreateDefaultSubDomain_settings;
}

export interface CreateDefaultSubDomainVariables {
  token: string;
  id: string;
}
