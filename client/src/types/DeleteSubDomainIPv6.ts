/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteSubDomainIPv6
// ====================================================

export interface DeleteSubDomainIPv6_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface DeleteSubDomainIPv6_settings_deleteSubDomainIpAddressV6_subdomains {
  __typename: "SubDomain";
  id: string;
  ipAddressV4: string | null;
  ipAddressV6: string | null;
}

export interface DeleteSubDomainIPv6_settings_deleteSubDomainIpAddressV6 {
  __typename: "Domain";
  id: string;
  subdomains: DeleteSubDomainIPv6_settings_deleteSubDomainIpAddressV6_subdomains[];
}

export interface DeleteSubDomainIPv6_settings {
  __typename: "SettingsMutations";
  deleteSubDomainIpAddressV6: DeleteSubDomainIPv6_settings_deleteSubDomainIpAddressV6 | null;
}

export interface DeleteSubDomainIPv6 {
  authentication: DeleteSubDomainIPv6_authentication;
  settings: DeleteSubDomainIPv6_settings;
}

export interface DeleteSubDomainIPv6Variables {
  token: string;
  id: string;
  index: number;
}
