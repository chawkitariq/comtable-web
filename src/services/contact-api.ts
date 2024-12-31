import { api } from "@/configs";
import {
  ContactType,
  CreateContactPayloadType,
  UpdateContactPayloadType,
} from "@/types";

export class ContactApiService {
  public static async create(
    companyId: string,
    payload: CreateContactPayloadType
  ): Promise<ContactType> {
    const { data } = await api.post(
      `/companies/${companyId}/contacts`,
      payload
    );
    return data;
  }

  public static async findAll(companyId: string): Promise<ContactType[]> {
    const { data } = await api.get(`/companies/${companyId}/contacts`);
    return data;
  }

  public static async findOne(contactId: string): Promise<ContactType> {
    const { data } = await api.get(`/contacts/${contactId}`);
    return data;
  }

  public static async update(
    contactId: string,
    payload: UpdateContactPayloadType
  ): Promise<ContactType> {
    const { data } = await api.patch(`/contacts/${contactId}`, payload);
    return data;
  }

  public static async delete(contactId: string): Promise<unknown> {
    const { data } = await api.delete(`/contacts/${contactId}`);
    return data;
  }
}
