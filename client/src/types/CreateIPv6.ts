/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateIPv6
// ====================================================

export interface CreateIPv6_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface CreateIPv6_settings_createIpv6 {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface CreateIPv6_settings {
  __typename: "SettingsMutations";
  createIpv6: CreateIPv6_settings_createIpv6 | null;
}

export interface CreateIPv6 {
  authentication: CreateIPv6_authentication;
  settings: CreateIPv6_settings;
}

export interface CreateIPv6Variables {
  token: string;
  id: string;
}
