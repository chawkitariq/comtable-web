import { CompanyType } from "./company";
import { UserType } from "./user";

export type CategoryType = {
  id: string;
  name: string;
  slug: string;
  type: CategoryTypeEnum;
  color?: string;
  company?: CompanyType;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCategoryPayloadType = {
  name: string;
  slug?: string;
  type: CategoryTypeEnum;
  color?: string;
};

export type UpdateCategoryPayloadType = Partial<CreateCategoryPayloadType>;

export enum CategoryTypeEnum {
  Income = "income",
  Expense = "expense",
  Item = "item",
  Other = "other",
}
