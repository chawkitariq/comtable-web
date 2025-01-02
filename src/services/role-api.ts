import { api } from "@/configs";
import { RoleType } from "@/types";

export class RoleApiService {
  public static async findAll(): Promise<RoleType[]> {
    const { data } = await api.get("/roles");
    return data;
  }

  public static async findMe(): Promise<RoleType> {
    const { data } = await api.get("/roles/me");
    return data;
  }
}
