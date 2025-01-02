import { UserType } from "./user";

export type RoleType = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
};
