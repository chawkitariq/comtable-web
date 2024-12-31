import { api } from "@/configs";
import {
  ArticleType,
  CreateArticlePayloadType,
  UpdateArticlePayloadType,
} from "@/types";

export class ArticleApiService {
  public static async create(
    companyId: string,
    payload: CreateArticlePayloadType
  ): Promise<ArticleType> {
    const { data } = await api.post(
      `/companies/${companyId}/articles`,
      payload
    );
    return data;
  }

  public static async findAll(companyId: string): Promise<ArticleType[]> {
    const { data } = await api.get(`/companies/${companyId}/articles`);
    return data;
  }

  public static async findOne(articleId: string): Promise<ArticleType> {
    const { data } = await api.get(`/articles/${articleId}`);
    return data;
  }

  public static async update(
    articleId: string,
    payload: UpdateArticlePayloadType
  ): Promise<ArticleType> {
    const { data } = await api.patch(`/articles/${articleId}`, payload);
    return data;
  }

  public static async delete(articleId: string): Promise<unknown> {
    const { data } = await api.delete(`/articles/${articleId}`);
    return data;
  }
}
