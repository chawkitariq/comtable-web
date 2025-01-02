import { api } from "@/configs";
import { TaxType, CreateTaxPayloadType, UpdateTaxPayloadType } from "@/types";

export class TaxApiService {
  public static async create(
    companyId: string,
    payload: CreateTaxPayloadType
  ): Promise<TaxType> {
    const { data } = await api.post(`/companies/${companyId}/taxes`, payload);
    return data;
  }

  public static async findAll(companyId: string): Promise<TaxType[]> {
    const { data } = await api.get(`/companies/${companyId}/taxes`);
    return data;
  }

  public static async findOne(contactId: string): Promise<TaxType> {
    const { data } = await api.get(`/taxes/${contactId}`);
    return data;
  }

  public static async update(
    contactId: string,
    payload: UpdateTaxPayloadType
  ): Promise<TaxType> {
    const { data } = await api.patch(`/taxes/${contactId}`, payload);
    return data;
  }

  public static async delete(contactId: string): Promise<unknown> {
    const { data } = await api.delete(`/taxes/${contactId}`);
    return data;
  }
}
