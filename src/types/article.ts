export type ArticleType = {
  id: string;
  name: string;
  sku: string;
  description?: string;
  salePrice: number;
  purchasePrice: number;
  quantity: number;
  company?: unknown;
  category?: unknown;
  tax?: unknown;
  createdBy?: unknown;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateArticlePayloadType = {
  name: string;
  type: string;
  salePrice: number;
  purchasePrice: number;
  disabled?: boolean;
  taxIds?: string[];
  categoryId?: string;
};
