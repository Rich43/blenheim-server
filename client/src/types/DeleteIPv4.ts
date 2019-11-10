/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteIPv4
// ====================================================

export interface DeleteIPv4_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface DeleteIPv4_settings_deleteIpv4 {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface DeleteIPv4_settings {
  __typename: "SettingsMutations";
  deleteIpv4: DeleteIPv4_settings_deleteIpv4 | null;
}

export interface DeleteIPv4 {
  authentication: DeleteIPv4_authentication;
  settings: DeleteIPv4_settings;
}

export interface DeleteIPv4Variables {
  token: string;
  index: number;
}
