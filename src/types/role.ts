import {
  CreatePermissionPayloadType,
  UpdatePermissionPayloadType,
} from "./permission";
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
  description?: string;
  permissions?: CreatePermissionPayloadType[];
};

export type UpdateRolePayloadType = Partial<
  Omit<CreateRolePayloadType, "permissions">
> & {
  permissions?: UpdatePermissionPayloadType[];
};
