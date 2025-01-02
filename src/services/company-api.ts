import { api } from "@/configs";
import {
  CompanyType,
  CreateCompanyPayloadType,
  UpdateCompanyPayloadType,
} from "@/types";

export class CompanyApiService {
  public static async create(
    payload: CreateCompanyPayloadType
  ): Promise<CompanyType> {
    const { data } = await api.post("/companies", payload);
    return data;
  }

  public static async findAll(): Promise<CompanyType[]> {
    const { data } = await api.get("/companies");
    return data;
  }

  public static async findOne(companyId: string): Promise<CompanyType> {
    const { data } = await api.get(`/companies/${companyId}`);
    return data;
  }

  public static async update(
    companyId: string,
    payload: UpdateCompanyPayloadType
  ): Promise<CompanyType> {
    const { data } = await api.patch(`/companies/${companyId}`, payload);
    return data;
  }

  public static async delete(companyId: string): Promise<unknown> {
    const { data } = await api.delete(`/companies/${companyId}`);
    return data;
  }
}
