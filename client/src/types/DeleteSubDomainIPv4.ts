/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteSubDomainIPv4
// ====================================================

export interface DeleteSubDomainIPv4_authentication {
  __typename: "Authentication";
  token: string | null;
}

export interface DeleteSubDomainIPv4_settings_deleteSubDomainIpAddressV4_subdomains {
  __typename: "SubDomain";
  id: string;
  ipAddressV4: string | null;
  ipAddressV6: string | null;
}

export interface DeleteSubDomainIPv4_settings_deleteSubDomainIpAddressV4 {
  __typename: "Domain";
  id: string;
  subdomains: DeleteSubDomainIPv4_settings_deleteSubDomainIpAddressV4_subdomains[];
}

export interface DeleteSubDomainIPv4_settings {
  __typename: "SettingsMutations";
  deleteSubDomainIpAddressV4: DeleteSubDomainIPv4_settings_deleteSubDomainIpAddressV4 | null;
}

export interface DeleteSubDomainIPv4 {
  authentication: DeleteSubDomainIPv4_authentication;
  settings: DeleteSubDomainIPv4_settings;
}

export interface DeleteSubDomainIPv4Variables {
  token: string;
  id: string;
  index: number;
}
