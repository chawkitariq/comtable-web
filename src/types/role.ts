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

export type CreateRolePayloadType = {
  name: string;
  slug?: string;
  description?: string;
};

export type UpdateRolePayloadType = Partial<CreateRolePayloadType>;
