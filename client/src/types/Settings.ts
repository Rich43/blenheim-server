/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Settings
// ====================================================

export interface Settings_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface Settings_settings {
  __typename: "Settings";
  defaultSubdomains: string[];
  ipv4: string[];
  ipv6: string[];
}

export interface Settings {
  authentication: Settings_authentication;
  settings: Settings_settings;
}

export interface SettingsVariables {
  token: string;
}
