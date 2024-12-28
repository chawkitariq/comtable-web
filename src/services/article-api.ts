import { api } from "@/configs";
import { ArticleType } from "@/types";

export class ArticleApiService {
  public static async findAll(): Promise<ArticleType[]> {
    const { data } = await api.get("/articles");
    return data;
  }
}
