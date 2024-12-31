import { UserType } from "./user";

export type AuthenticationLoginPayloadType = {
  email: string;
  password: string;
};

export type AuthenticationRegisterPayloadType = AuthenticationLoginPayloadType;

export type AuthenticationTokenType = {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  expiredAt: number;
  me: UserType;
};

export type AuthenticationLoginResponseType = AuthenticationTokenType;
