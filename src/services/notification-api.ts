import { api } from "@/configs";
import { NotificationType } from "@/types";

export class NotificationApiService {
  public static async readAll(
    notificationIds: string[]
  ): Promise<NotificationType[]> {
    const queryParams = new URLSearchParams({ ids: notificationIds.join(",") });
    const { data } = await api.post(`/notifications/read?${queryParams}`);
    return data;
  }

  public static async findAll(): Promise<NotificationType[]> {
    const { data } = await api.get(`/notifications`);
    return data;
  }

  public static async findOne(contactId: string): Promise<NotificationType> {
    const { data } = await api.get(`/notifications/${contactId}`);
    return data;
  }

  public static async deleteAll(notificationIds: string[]): Promise<unknown> {
    const queryParams = new URLSearchParams({ ids: notificationIds.join(",") });
    const { data } = await api.delete(`/notifications?${queryParams}`);
    return data;
  }
}
