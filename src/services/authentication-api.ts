import { api } from "@/configs";
import {
  AuthenticationLoginPayloadType,
  AuthenticationLoginResponseType,
  AuthenticationRegisterPayloadType,
} from "@/types";

export class AuthenticationApiService {
  public static async login(
    payload: AuthenticationLoginPayloadType
  ): Promise<AuthenticationLoginResponseType> {
    const { data } = await api.post("/auth/login", payload);
    return data;
  }

  public static async register(
    payload: AuthenticationRegisterPayloadType
  ): Promise<unknown> {
    const { data } = await api.post("/auth/register", payload);
    return data;
  }
}
