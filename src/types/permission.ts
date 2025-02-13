import { RoleType } from "./role";

export type PermissionType = {
  id: string;
  subject: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  role?: RoleType;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePermissionPayloadType = {
  subject: string;
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
};

export type UpdatePermissionPayloadType =
  Partial<CreatePermissionPayloadType> & {
    id?: string;
  };

export type PermissionActionType = "create" | "read" | "update" | "delete";
