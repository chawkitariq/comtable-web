import { CompanyType } from "./company";
import { UserType } from "./user";

export type TaxType = {
  id: string;
  name: string;
  rate: number;
  type: TaxTypeEnum;
  company?: CompanyType;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTaxPayloadType = {
  name: string;
  rate: number;
  type: TaxTypeEnum;
};

export type UpdateTaxPayloadType = Partial<CreateTaxPayloadType>;

export enum TaxTypeEnum {
  Fixed = "fixed",
  Normal = "normal",
  Inclusive = "inclusive",
  Withholding = "withholding",
  Compound = "compound",
}
