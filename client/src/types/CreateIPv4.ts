/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateIPv4
// ====================================================

export interface CreateIPv4_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface CreateIPv4_settings_createIpv4 {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface CreateIPv4_settings {
  __typename: "SettingsMutations";
  createIpv4: CreateIPv4_settings_createIpv4 | null;
}

export interface CreateIPv4 {
  authentication: CreateIPv4_authentication;
  settings: CreateIPv4_settings;
}

export interface CreateIPv4Variables {
  token: string;
  id: string;
}
