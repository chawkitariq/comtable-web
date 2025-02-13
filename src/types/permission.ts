import { RoleType } from "./role";

export type PermissionType = {
  id: string;
  name: string;
  role?: RoleType;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePermissionPayloadType = {
  name: string;
};

export type UpdatePermissionPayloadType =
  Partial<CreatePermissionPayloadType> & {
    id?: string;
  };
