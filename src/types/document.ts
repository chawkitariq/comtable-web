import { ArticleType, ArticleTypeEnum } from "./article";
import { CompanyType } from "./company";
import { TaxTypeEnum } from "./tax";
import { UserType } from "./user";

export type DocumentType = {
  id: string;
  number: string;
  orderNumber?: string;
  type: DocumentTypeEnum;
  status: DocumentStatusEnum;
  issuedAt: Date;
  dueAt: Date;
  currencyCode?: string;
  currencyRate: number;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  contactCity?: string;
  contactPostalCode?: string;
  contactState?: string;
  contactCountry?: string;
  note?: string;
  footer?: string;
  title?: string;
  subTitle?: string;
  template?: string;
  color?: string;
  articles?: DocumentArticleType[];
  company?: CompanyType;
  contact?: unknown;
  category?: unknown;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type DocumentArticleType = {
  id: string;
  name: string;
  type: ArticleTypeEnum;
  description?: string;
  sku?: string;
  quantity: number;
  price: number;
  tax: number;
  discountType: string;
  discountRate: string;
  total: string;
  company?: CompanyType;
  document?: DocumentType;
  article?: ArticleType;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type DocumentArticleTaxType = {
  id: string;
  name: string;
  type: TaxTypeEnum;
  amount: number;
  company?: CompanyType;
  document?: DocumentType;
  documentArticle?: DocumentArticleType;
  tax?: unknown;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type DocumentTotalType = {
  id: string;
  name: string;
  type: string;
  description?: string;
  code?: string;
  amount: number;
  sortOrder: number;
  company?: CompanyType;
  document?: DocumentType;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type CreateDocumentPayloadType = {
  number?: string;
  orderNumber?: string;
  type?: DocumentTypeEnum;
  status?: DocumentStatusEnum;
  issuedAt?: Date;
  dueAt?: Date;
  currencyCode?: string;
  currencyRate?: number;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  contactCity?: string;
  contactPostalCode?: string;
  contactState?: string;
  contactCountry?: string;
  note?: string;
  footer?: string;
  title?: string;
  subTitle?: string;
  template?: string;
  color?: string;
  articles?: CreateDocumentArticlePayloadType[];
};

export type CreateDocumentArticlePayloadType = {
  name?: string;
  type?: ArticleTypeEnum;
  quantity?: number;
  price?: number;
  tax?: number;
  total?: string;
  taxes?: CreateDocumentArticleTaxPayloadType[];
};

export type CreateDocumentArticleTaxPayloadType = {
  name: string;
  type: TaxTypeEnum;
  amount: number;
};

export type UpdateDocumentPayloadType = Omit<
  Partial<CreateDocumentPayloadType>,
  "articles"
> & {
  articles?: UpdateDocumentArticlePayloadType[];
};

export type UpdateDocumentArticlePayloadType = Omit<
  Partial<CreateDocumentArticlePayloadType>,
  "taxes"
> & {
  id: string;
  taxes?: UpdateDocumentArticleTaxPayloadType[];
};

export type UpdateDocumentArticleTaxPayloadType =
  Partial<CreateDocumentArticleTaxPayloadType> & {
    id: string;
  };

export enum DocumentTypeEnum {
  Invoice = "invoice",
  Bill = "bill",
}

export enum DocumentStatusEnum {
  Draft = "draft",
  Paid = "paid",
  Partial = "partial",
  Sent = "sent",
  Received = "received",
  Viewed = "viewed",
  Cancelled = "cancelled",
  Archived = "archived",
}
