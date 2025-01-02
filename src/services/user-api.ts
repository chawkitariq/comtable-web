import { api } from "@/configs";
import { UserType } from "@/types";

export class UserApiService {
  public static async findAll(): Promise<UserType[]> {
    const { data } = await api.get("/users");
    return data;
  }

  public static async findMe(): Promise<UserType> {
    const { data } = await api.get("/users/me");
    return data;
  }
}
