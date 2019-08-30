/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Token
// ====================================================

export interface Token_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface Token_settings_domains {
  __typename: "Domain";
  name: string | null;
  subdomains: (string | null)[] | null;
}

export interface Token_settings {
  __typename: "Settings";
  domains: (Token_settings_domains | null)[] | null;
  defaultSubdomains: (string | null)[] | null;
}

export interface Token {
  authentication: Token_authentication | null;
  settings: Token_settings | null;
}

export interface TokenVariables {
  token: string;
}
