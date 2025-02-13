import { api } from "@/configs";
import {
  CreateUserPayloadType,
  UpdateUserPayloadType,
  UserType,
} from "@/types";

export class UserApiService {
  public static async create(
    payload: CreateUserPayloadType
  ): Promise<UserType> {
    const { data } = await api.post("users", payload);
    return data;
  }

  public static async findAll(): Promise<UserType[]> {
    const { data } = await api.get("/users");
    return data;
  }

  public static async findOne(userId: string): Promise<UserType> {
    const { data } = await api.get(`/users/${userId}`);
    return data;
  }

  public static async findMe(): Promise<UserType> {
    const { data } = await api.get("/users/me");
    return data;
  }

  public static async update(
    userId: string,
    payload: UpdateUserPayloadType
  ): Promise<UserType> {
    const { data } = await api.patch(`/users/${userId}`, payload);
    return data;
  }

  public static async delete(userId: string): Promise<unknown> {
    const { data } = await api.delete(`/users/${userId}`);
    return data;
  }
}
