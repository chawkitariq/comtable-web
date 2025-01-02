import { api } from "@/configs";
import {
  CategoryType,
  CreateCategoryPayloadType,
  UpdateCategoryPayloadType,
} from "@/types";

export class CategoryApiService {
  public static async create(
    companyId: string,
    payload: CreateCategoryPayloadType
  ): Promise<CategoryType> {
    const { data } = await api.post(
      `/companies/${companyId}/categories`,
      payload
    );
    return data;
  }

  public static async findAll(companyId: string): Promise<CategoryType[]> {
    const { data } = await api.get(`/companies/${companyId}/categories`);
    return data;
  }

  public static async findOne(contactId: string): Promise<CategoryType> {
    const { data } = await api.get(`/categories/${contactId}`);
    return data;
  }

  public static async update(
    contactId: string,
    payload: UpdateCategoryPayloadType
  ): Promise<CategoryType> {
    const { data } = await api.patch(`/categories/${contactId}`, payload);
    return data;
  }

  public static async delete(contactId: string): Promise<unknown> {
    const { data } = await api.delete(`/categories/${contactId}`);
    return data;
  }
}
