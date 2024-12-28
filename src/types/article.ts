export type ArticleType = {
  id: string;
  name: string;
  type: string;
  sku: string;
  description?: string;
  salePrice: number;
  purchasePrice: number;
  company?: unknown;
  category?: unknown;
  createdBy?: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateArticlePayloadType = {
  name: string;
  type: ArticleTypeEnum;
  salePrice: number;
  purchasePrice: number;
  taxIds?: string[];
  categoryId?: string;
};

export type UpdateArticlePayloadType = Partial<CreateArticlePayloadType>;

export enum ArticleTypeEnum {
  Product = "product",
  Service = "service",
}
