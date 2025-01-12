import { api } from "@/configs";
import {
  DocumentArticleType,
  UpdateManyDocumentArticlePayloadType,
  CreateManyDocumentArticlePayloadType,
  RemoveManyDocumentArticlePayloadType,
} from "@/types";

export class DocumentArticleApiService {
  public static async createMany(
    documentId: string,
    payload: CreateManyDocumentArticlePayloadType
  ): Promise<DocumentArticleType> {
    const { data } = await api.post(
      `/documents/${documentId}/documentarticles`,
      payload
    );
    return data;
  }

  public static async findAll(
    documentId: string
  ): Promise<DocumentArticleType[]> {
    const { data } = await api.get(`/documents/${documentId}/documentarticles`);
    return data;
  }

  public static async updateMany(
    payload: UpdateManyDocumentArticlePayloadType
  ): Promise<DocumentArticleType> {
    const { data } = await api.patch("documentarticles", payload);
    return data;
  }

  public static async deleteMany(
    payload: RemoveManyDocumentArticlePayloadType
  ): Promise<unknown> {
    const { data } = await api.request({
      url: "documentarticles",
      data: payload,
    });
    return data;
  }
}
