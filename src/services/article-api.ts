import { api } from "@/configs";
import { ArticleType, CreateArticlePayloadType } from "@/types";

export class ArticleApiService {
  public static async create(
    payload: CreateArticlePayloadType
  ): Promise<ArticleType> {
    const { data } = await api.post("/articles", payload);
    return data;
  }

  public static async findAll(): Promise<ArticleType[]> {
    const { data } = await api.get("/articles");
    return data;
  }
}
