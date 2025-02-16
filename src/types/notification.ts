import { UserType } from "./user";

export type NotificationType = {
  id: string;
  subject: string;
  message: string;
  receiver?: UserType;
  isReaded: boolean;
  createdAt: Date;
  updatedAt: Date;
};
