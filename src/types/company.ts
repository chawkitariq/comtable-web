import { UserType } from "./user";

export type CompanyType = {
  id: string;
  name: string;
  email?: string;
  taxNumber?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  currency?: string;
  locale: string;
  isEnabled: boolean;
  createdBy: UserType;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCompanyPayloadType = {
  name: string;
  email?: string;
  taxNumber?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  currency?: string;
  locale?: string;
};

export type UpdateCompanyPayloadType = Partial<CreateCompanyPayloadType>;
