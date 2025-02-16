import { api } from "@/configs";
import {
  InvitationType,
  CreateInvitationPayloadType,
  UpdateInvitationPayloadType,
} from "@/types";

export class InvitationApiService {
  public static async create(
    payload: CreateInvitationPayloadType
  ): Promise<InvitationType> {
    const { data } = await api.post(`/invitations`, payload);
    return data;
  }

  public static async findAll(): Promise<InvitationType[]> {
    const { data } = await api.get(`/invitations`);
    return data;
  }

  public static async findAllSended(): Promise<InvitationType[]> {
    const { data } = await api.get(`/invitations/sended`);
    return data;
  }

  public static async findAllReceived(): Promise<InvitationType[]> {
    const { data } = await api.get(`/invitations/received`);
    return data;
  }

  public static async findOne(contactId: string): Promise<InvitationType> {
    const { data } = await api.get(`/invitations/${contactId}`);
    return data;
  }

  public static async update(
    contactId: string,
    payload: UpdateInvitationPayloadType
  ): Promise<InvitationType> {
    const { data } = await api.patch(`/invitations/${contactId}`, payload);
    return data;
  }

  public static async read(contactId: string): Promise<InvitationType> {
    const { data } = await api.get(`/invitations/${contactId}/read`);
    return data;
  }

  public static async cancel(contactId: string): Promise<InvitationType> {
    const { data } = await api.post(`/invitations/${contactId}/cancel`);
    return data;
  }

  public static async accept(contactId: string): Promise<InvitationType> {
    const { data } = await api.post(`/invitations/${contactId}/accept`);
    return data;
  }

  public static async reject(contactId: string): Promise<InvitationType> {
    const { data } = await api.post(`/invitations/${contactId}/reject`);
    return data;
  }

  public static async delete(contactId: string): Promise<unknown> {
    const { data } = await api.delete(`/invitations/${contactId}`);
    return data;
  }
}
