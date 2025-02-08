import { api } from "@/configs";
import {
  CreateRolePayloadType,
  RoleType,
  UpdateRolePayloadType,
} from "@/types";

export class RoleApiService {
  public static async create(
    payload: CreateRolePayloadType
  ): Promise<RoleType> {
    const { data } = await api.post("/roles", payload);
    return data;
  }

  public static async findAll(): Promise<RoleType[]> {
    const { data } = await api.get("/roles");
    return data;
  }

  public static async update(
    roleId: string,
    payload: UpdateRolePayloadType
  ): Promise<RoleType> {
    const { data } = await api.patch(`/roles/${roleId}`, payload);
    return data;
  }

  public static async findOne(roleId: string): Promise<RoleType> {
    const { data } = await api.get(`/roles/${roleId}`);
    return data;
  }

  public static async delete(roleId: string): Promise<unknown> {
    const { data } = await api.delete(`/roles/${roleId}`);
    return data;
  }
}
