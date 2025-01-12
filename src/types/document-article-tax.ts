import { CompanyType } from "./company";
import { DocumentArticleType } from "./document-article";
import { TaxTypeEnum } from "./tax";
import { UserType } from "./user";

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

export type CreateDocumentArticleTaxPayloadType = {
  name: string;
  type: TaxTypeEnum;
  amount: number;
};

export type CreateManyDocumentArticleTaxPayloadType = {
  documentArticleTaxes: CreateDocumentArticleTaxPayloadType[];
};

export type UpdateDocumentArticleTaxPayloadType =
  Partial<CreateDocumentArticleTaxPayloadType> & {
    id: string;
  };

export type UpdateManyDocumentArticleTaxPayloadType = {
  documentArticleTaxes: UpdateDocumentArticleTaxPayloadType[];
};

export type RemoveManyDocumentArticleTaxPayloadType = {
  documentArticleTaxIds: string[];
};
