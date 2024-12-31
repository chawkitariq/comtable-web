import { api } from "@/configs";
import {
  DocumentType,
  CreateDocumentPayloadType,
  UpdateDocumentPayloadType,
} from "@/types";

export class DocumentInvoiceApiService {
  public static async create(
    companyId: string,
    payload: CreateDocumentPayloadType
  ): Promise<DocumentType> {
    const { data } = await api.post(
      `/companies/${companyId}/invoices`,
      payload
    );
    return data;
  }

  public static async findAll(companyId: string): Promise<DocumentType[]> {
    const { data } = await api.get(`/companies/${companyId}/invoices`);
    return data;
  }

  public static async findOne(invoiceId: string): Promise<DocumentType> {
    const { data } = await api.get(`/invoices/${invoiceId}`);
    return data;
  }

  public static async update(
    invoiceId: string,
    payload: UpdateDocumentPayloadType
  ): Promise<DocumentType> {
    const { data } = await api.patch(`/invoices/${invoiceId}`, payload);
    return data;
  }

  public static async delete(invoiceId: string): Promise<unknown> {
    const { data } = await api.delete(`/invoices/${invoiceId}`);
    return data;
  }
}
