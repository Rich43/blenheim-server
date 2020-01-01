/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateSubDomainIPv6
// ====================================================

export interface UpdateSubDomainIPv6_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface UpdateSubDomainIPv6_settings_updateSubDomainIpAddressV6_subdomains {
  __typename: "SubDomain";
  id: string;
  ipAddressV4: string | null;
  ipAddressV6: string | null;
}

export interface UpdateSubDomainIPv6_settings_updateSubDomainIpAddressV6 {
  __typename: "Domain";
  id: string;
  subdomains: UpdateSubDomainIPv6_settings_updateSubDomainIpAddressV6_subdomains[];
}

export interface UpdateSubDomainIPv6_settings {
  __typename: "SettingsMutations";
  updateSubDomainIpAddressV6: UpdateSubDomainIPv6_settings_updateSubDomainIpAddressV6 | null;
}

export interface UpdateSubDomainIPv6 {
  authentication: UpdateSubDomainIPv6_authentication;
  settings: UpdateSubDomainIPv6_settings;
}

export interface UpdateSubDomainIPv6Variables {
  token: string;
  id: string;
  index: number;
  name: string;
}
