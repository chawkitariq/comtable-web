import { DocumentType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSessionStore } from "@/stores";

interface InvoiceDefaultTemplateProps {
  invoice: DocumentType;
}

export function InvoiceDefaultTemplate({
  invoice,
}: InvoiceDefaultTemplateProps) {
  const { company } = useSessionStore();
  return (
    <div className="border h-full w-full rounded grid grid-rows-3 p-4">
      <div>
        <div className="grid grid-cols-2">
          <ul>
            <li>{company?.name}</li>
            <li>{company?.address}</li>
            <li>
              <span>{company?.postalCode}</span>
              <span>{company?.city}</span>
            </li>
            <li>{company?.email}</li>
          </ul>
          <ul>
            <li>{invoice.contactName}</li>
            <li>{invoice.contactAddress}</li>
            <li>
              <span>{invoice.contactPostalCode}</span>
              <span>{invoice.contactCity}</span>
            </li>
            <li>{invoice.contactEmail}</li>
          </ul>
        </div>
      </div>

      <div>
        <Table className="border">
          <TableHeader>
            <TableRow className="grid grid-cols-4">
              <TableHead className="border py-2">Nom</TableHead>
              <TableHead className="border py-2">Prix</TableHead>
              <TableHead className="border py-2">Quantity</TableHead>
              <TableHead className="border py-2">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.documentArticles?.map((documentArticle, i) => (
              <TableRow key={i} className="grid grid-cols-4">
                <TableCell className="border">{documentArticle.name}</TableCell>
                <TableCell className="border">
                  {documentArticle.price} ${invoice.currencyCode}
                </TableCell>
                <TableCell className="border">
                  {documentArticle.quantity}
                </TableCell>
                <TableCell className="border">
                  {documentArticle.total} ${invoice.currencyCode}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div></div>
    </div>
  );
}
