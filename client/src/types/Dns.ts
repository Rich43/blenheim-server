/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Dns
// ====================================================

export interface Dns_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface Dns_dns_generate {
  __typename: "Result";
  code: string;
  error: string;
  extra: string | null;
  success: boolean | null;
}

export interface Dns_dns {
  __typename: "Dns";
  generate: Dns_dns_generate;
}

export interface Dns {
  authentication: Dns_authentication;
  dns: Dns_dns;
}

export interface DnsVariables {
  token: string;
}
