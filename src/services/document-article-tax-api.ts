import { api } from "@/configs";
import {
  DocumentArticleTaxType,
  UpdateManyDocumentArticleTaxPayloadType,
  CreateManyDocumentArticleTaxPayloadType,
  RemoveManyDocumentArticleTaxPayloadType,
} from "@/types";

export class DocumentArticleTaxApiService {
  public static async createMany(
    documentArticleId: string,
    payload: CreateManyDocumentArticleTaxPayloadType
  ): Promise<DocumentArticleTaxType> {
    const { data } = await api.post(
      `/documentarticles/${documentArticleId}/documentarticletaxes`,
      payload
    );
    return data;
  }

  public static async findAll(
    documentArticleId: string
  ): Promise<DocumentArticleTaxType[]> {
    const { data } = await api.get(
      `/documentarticles/${documentArticleId}/documentarticletaxes`
    );
    return data;
  }

  public static async updateMany(
    payload: UpdateManyDocumentArticleTaxPayloadType
  ): Promise<DocumentArticleTaxType> {
    const { data } = await api.patch("documentarticletaxes", payload);
    return data;
  }

  public static async deleteMany(
    payload: RemoveManyDocumentArticleTaxPayloadType
  ): Promise<unknown> {
    const { data } = await api.request({
      url: "documentarticletaxes",
      data: payload,
    });
    return data;
  }
}
