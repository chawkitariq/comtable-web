import { RoleType } from "./role";

export type UserType = {
  id: string;
  email: string;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserPayloadType = {
  email: string;
  password: string;
  roleId: string;
};

export type UpdateUserPayloadType = Partial<CreateUserPayloadType>;
