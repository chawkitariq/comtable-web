import {
  CreatePermissionPayloadType,
  PermissionType,
  UpdatePermissionPayloadType,
} from "./permission";
import { RoleType } from "./role";
import { UserType } from "./user";

export type InvitationType = {
  id: string;
  email: string;
  expiredAt?: Date;
  status: InvitationStatusEnum;
  role?: RoleType;
  sender?: UserType;
  receiver?: UserType;
  permissions?: PermissionType[];
  isPending: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateInvitationPayloadType = {
  email: string;
  expiredAt?: Date;
  roleId?: string;
  permissions?: CreatePermissionPayloadType[];
};

export type UpdateInvitationPayloadType = Partial<
  Omit<CreateInvitationPayloadType, "permissions">
> & {
  permissions?: UpdatePermissionPayloadType[];
};

export enum InvitationStatusEnum {
  Pending = "pending",
  Expired = "expired",
  Canceled = "canceled",
  Accepted = "accepted",
  Rejected = "rejected",
  Archived = "archived",
}

export enum InvitationFetchTypeEnum {
  All = "all",
  Sended = "sended",
  Received = "received",
}
