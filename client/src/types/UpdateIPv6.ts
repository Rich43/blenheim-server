/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateIPv6
// ====================================================

export interface UpdateIPv6_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface UpdateIPv6_settings_updateIpv6 {
  __typename: "Settings";
  ipv4: string[];
  ipv6: string[];
  defaultSubdomains: string[];
}

export interface UpdateIPv6_settings {
  __typename: "SettingsMutations";
  updateIpv6: UpdateIPv6_settings_updateIpv6;
}

export interface UpdateIPv6 {
  authentication: UpdateIPv6_authentication;
  settings: UpdateIPv6_settings;
}

export interface UpdateIPv6Variables {
  token: string;
  id: string;
  index: number;
}
