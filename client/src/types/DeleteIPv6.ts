/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteIPv6
// ====================================================

export interface DeleteIPv6_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface DeleteIPv6_settings_deleteIpv6 {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface DeleteIPv6_settings {
  __typename: "SettingsMutations";
  deleteIpv6: DeleteIPv6_settings_deleteIpv6 | null;
}

export interface DeleteIPv6 {
  authentication: DeleteIPv6_authentication;
  settings: DeleteIPv6_settings;
}

export interface DeleteIPv6Variables {
  token: string;
  index: number;
}
