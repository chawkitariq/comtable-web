import { DocumentType } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
    <div className="h-full w-full grid grid-rows-3 p-4 bg-white max-w-xl mx-auto">
      <div>
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
          Facture
        </h1>

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
              <span>{invoice.contactPostalCode}</span>{" "}
              <span>{invoice.contactCity}</span>
            </li>
            <li>{invoice.contactPhone}</li>
            <li>{invoice.contactEmail}</li>
          </ul>
        </div>
      </div>

      <div className="grid">
        <Table className="border">
          <TableHeader>
            <TableRow className="grid grid-cols-4">
              <TableHead className="border py-2">Déscription</TableHead>
              <TableHead className="border py-2">Quantité</TableHead>
              <TableHead className="border py-2">Prix Unitaire HT</TableHead>
              <TableHead className="border py-2">Montant HT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.documentArticles?.map((documentArticle, i) => (
              <TableRow key={i} className="grid grid-cols-4">
                <TableCell className="border">
                  {documentArticle.description}
                </TableCell>
                <TableCell className="border">
                  {documentArticle.price} ${invoice.currencyCode}
                </TableCell>
                <TableCell className="border">
                  {documentArticle.quantity}
                </TableCell>
                <TableCell className="border">
                  {documentArticle.price * documentArticle.quantity} $
                  {invoice.currencyCode}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="grid grid-cols-4">
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Total</TableCell>{" "}
              <TableCell>
                {
                  invoice.documentArticles
                    ?.reduce(
                      (total, documentArticle) =>
                        total +
                        documentArticle.price * documentArticle.quantity,
                      0
                    )
                    .toFixed(2)
                }{" "}
                ${invoice.currencyCode}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
