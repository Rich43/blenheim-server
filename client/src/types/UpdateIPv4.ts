/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateIPv4
// ====================================================

export interface UpdateIPv4_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface UpdateIPv4_settings_updateIpv4 {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface UpdateIPv4_settings {
  __typename: "SettingsMutations";
  updateIpv4: UpdateIPv4_settings_updateIpv4;
}

export interface UpdateIPv4 {
  authentication: UpdateIPv4_authentication;
  settings: UpdateIPv4_settings;
}

export interface UpdateIPv4Variables {
  token: string;
  id: string;
  index: number;
}
