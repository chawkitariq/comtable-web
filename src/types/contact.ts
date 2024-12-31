import { CompanyType } from "./company";
import { UserType } from "./user";

export type ContactType = {
  id: string;
  name: string;
  type: string;
  email?: string;
  taxNumber?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  website?: string;
  currencyCode?: string;
  company?: CompanyType;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateContactPayloadType = {
  name: string;
  type: string;
  email?: string;
  taxNumber?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  state?: string;
  country?: string;
  website?: string;
  currencyCode?: string;
};

export type UpdateContactPayloadType = Partial<CreateContactPayloadType>;
