import { ArticleType, ArticleTypeEnum } from "./article";
import { CompanyType } from "./company";
import {
  CreateDocumentArticleTaxPayloadType,
  DocumentArticleTaxType,
  UpdateDocumentArticleTaxPayloadType,
} from "./document-article-tax";
import { UserType } from "./user";

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
  documentArticleTaxes: DocumentArticleTaxType[];
  company?: CompanyType;
  document?: DocumentType;
  article?: ArticleType;
  createdBy?: UserType;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};

export type CreateDocumentArticlePayloadType = {
  name?: string;
  type?: ArticleTypeEnum;
  quantity?: number;
  price?: number;
  tax?: number;
  total?: string;
  documentArticleTaxes?: CreateDocumentArticleTaxPayloadType[];
};

export type UpdateDocumentArticlePayloadType = Partial<
  Omit<CreateDocumentArticlePayloadType, "documentArticleTaxes">
> & {
  id?: string;
  remove?: boolean;
  documentArticleTaxes?: UpdateDocumentArticleTaxPayloadType[];
};
