/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSubDomainIPv4
// ====================================================

export interface UpdateSubDomainIPv4_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface UpdateSubDomainIPv4_settings_updateSubDomainIpAddressV4_subdomains {
  __typename: "SubDomain";
  id: string;
  ipAddressV4: string | null;
  ipAddressV6: string | null;
}

export interface UpdateSubDomainIPv4_settings_updateSubDomainIpAddressV4 {
  __typename: "Domain";
  id: string;
  subdomains: UpdateSubDomainIPv4_settings_updateSubDomainIpAddressV4_subdomains[];
}

export interface UpdateSubDomainIPv4_settings {
  __typename: "SettingsMutations";
  updateSubDomainIpAddressV4: UpdateSubDomainIPv4_settings_updateSubDomainIpAddressV4 | null;
}

export interface UpdateSubDomainIPv4 {
  authentication: UpdateSubDomainIPv4_authentication;
  settings: UpdateSubDomainIPv4_settings;
}

export interface UpdateSubDomainIPv4Variables {
  token: string;
  id: string;
  index: number;
  name: string;
}
