import { ArticleType, ArticleTypeEnum } from "./article";
import { CompanyType } from "./company";
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
};

export type CreateManyDocumentArticlePayloadType = {
  documentArticles: CreateDocumentArticlePayloadType[];
};

export type UpdateDocumentArticlePayloadType =
  Partial<CreateDocumentArticlePayloadType> & {
    id: string;
  };

export type UpdateManyDocumentArticlePayloadType = {
  documentArticles: UpdateDocumentArticlePayloadType[];
};

export type RemoveManyDocumentArticlePayloadType = {
  documentArticleIds: string[];
};
