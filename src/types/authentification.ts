export type AuthenticationLoginPayloadType = {
  email: string;
  password: string;
};

export type AuthenticationRegisterPayloadType = AuthenticationLoginPayloadType;

export type AuthenticationTokenType = {
  tokenType: string;
  accessToken: string;
  tokenExpiredAt: number;
};

export type AuthenticationLoginResponseType = AuthenticationTokenType;
