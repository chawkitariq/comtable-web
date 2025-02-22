import { CategoryType } from "./category";
import { CompanyType } from "./company";
import { TaxType } from "./tax";
import { UserType } from "./user";

export type ArticleType = {
  id: string;
  name: string;
  type: string;
  sku: string;
  description?: string;
  salePrice: number;
  purchasePrice: number;
  taxes?: TaxType[];
  company?: CompanyType;
  category?: CategoryType;
  createdBy?: UserType;
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
