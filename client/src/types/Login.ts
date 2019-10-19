/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Login
// ====================================================

export interface Login_authentication {
  __typename: "Authentication";
  login: string | null;
}

export interface Login {
  authentication: Login_authentication;
}

export interface LoginVariables {
  username: string;
  password: string;
}
