import { CompanyType } from "./company";
import {
  CreateDocumentArticlePayloadType,
  DocumentArticleType,
  UpdateDocumentArticlePayloadType,
} from "./document-article";
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
  documentArticles?: DocumentArticleType[];
  company?: CompanyType;
  contact?: unknown;
  category?: unknown;
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
  documentArticles?: CreateDocumentArticlePayloadType[];
};

export type UpdateDocumentPayloadType = Partial<CreateDocumentPayloadType> & {
  documentArticles?: UpdateDocumentArticlePayloadType[];
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
