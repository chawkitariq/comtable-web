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
    <div className="h-full w-full grid grid-rows-[1fr_1fr_4fr_1fr_1fr] gap-24 bg-white p-8 max-w-3xl mx-auto text-primary/85">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Facture {invoice.number}
        </h1>
        <h2 className="text-xl font-semibold tracking-tight text-primary/60">
          {invoice.issuedAt.toLocaleDateString('fr-FR', {
            dateStyle: 'long'
          })}
        </h2>
      </div>

      <div className="grid grid-cols-2">
        <div>
          <h4 className="text-xl font-semibold tracking-tight">
            Émetteur
          </h4>
          <ul>
            <li>{company?.name}</li>
            <li>{company?.address}</li>
            <li>
              <span>{company?.postalCode}</span>
              <span>{company?.city}</span>
            </li>
            <li>{company?.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xl font-semibold tracking-tight">
            Destinataire
          </h4>
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

      <Table>
        <TableHeader>
          <TableRow className="grid grid-cols-[1fr_3fr_repeat(3,_1fr)] bg-primary/90 text-primary-foreground shadow hover:bg-primary/90">
            <TableHead className="text-inherit py-2">Nom</TableHead>
            <TableHead className="text-inherit py-2">Description</TableHead>
            <TableHead className="text-inherit py-2">Quantité</TableHead>
            <TableHead className="text-inherit py-2">Prix unitaire</TableHead>
            <TableHead className="text-inherit py-2">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoice.documentArticles?.map((documentArticle, i) => (
            <TableRow
              key={i}
              className="grid grid-cols-[1fr_3fr_repeat(3,_1fr)]"
            >
              <TableCell>{documentArticle.name}</TableCell>
              <TableCell>{documentArticle.description}</TableCell>
              <TableCell>
                {documentArticle.price} ${invoice.currencyCode}
              </TableCell>
              <TableCell>{documentArticle.quantity}</TableCell>
              <TableCell>
                {documentArticle.price * documentArticle.quantity} $
                {invoice.currencyCode}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table className="ml-auto max-w-xs">
        <TableBody>
          <TableRow className="flex justify-between items-center gap-4">
            <TableHead>Total</TableHead>
            <TableHead>
              {invoice.documentArticles
                ?.reduce(
                  (total, documentArticle) =>
                    total + documentArticle.price * documentArticle.quantity,
                  0
                )
                .toFixed(2)}{" "}
              ${invoice.currencyCode}
            </TableHead>
          </TableRow>
          <TableRow></TableRow>
        </TableBody>
      </Table>

      <div></div>
    </div>
  );
}
