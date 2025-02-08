import { BrowserRouter, Route, Routes } from "react-router";
import { Authenticable } from "@/components";
import { LoginPage, RegisterPage } from "./authentication";
import { CompanyEditPage, CompanyNewPage, CompanyRootPage } from "./company";
import { TaxCopyPage, TaxEditPage, TaxNewPage, TaxRootPage } from "./tax";
import { RoleRootPage, RootPage, UserRootPage } from ".";
import {
  ArticleEditPage,
  ArticleRootPage,
  ArticleNewPage,
  ArticleCopyPage,
} from "./article";
import {
  InvoiceCopyPage,
  InvoiceEditPage,
  InvoiceNewPage,
  InvoiceRootPage,
} from "./invoice";
import {
  ContactCopyPage,
  ContactEditPage,
  ContactNewPage,
  ContactRootPage,
} from "./contact";
import {
  CategoryCopyPage,
  CategoryEditPage,
  CategoryNewPage,
  CategoryRootPage,
} from "./category";
import { DefaultLayout } from "@/layouts";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authenticable />}>
          <Route index element={<RootPage />} />

          <Route element={<DefaultLayout />}>
            <Route path="companies" element={<CompanyRootPage />}>
              <Route path="new" element={<CompanyNewPage />} />
              <Route path=":companyId/edit" element={<CompanyEditPage />} />
            </Route>

            <Route path="users" element={<UserRootPage />} />
            <Route path="roles" element={<RoleRootPage />} />

            <Route path="articles" element={<ArticleRootPage />}>
              <Route path="new" element={<ArticleNewPage />} />
              <Route path=":articleId/edit" element={<ArticleEditPage />} />
              <Route path=":articleId/copy" element={<ArticleCopyPage />} />
            </Route>

            <Route path="contacts" element={<ContactRootPage />}>
              <Route path="new" element={<ContactNewPage />} />
              <Route path=":contactId/edit" element={<ContactEditPage />} />
              <Route path=":contactId/copy" element={<ContactCopyPage />} />
            </Route>

            <Route path="categories" element={<CategoryRootPage />}>
              <Route path="new" element={<CategoryNewPage />} />
              <Route path=":categoryId/edit" element={<CategoryEditPage />} />
              <Route path=":categoryId/copy" element={<CategoryCopyPage />} />
            </Route>

            <Route path="taxes" element={<TaxRootPage />}>
              <Route path="new" element={<TaxNewPage />} />
              <Route path=":taxId/edit" element={<TaxEditPage />} />
              <Route path=":taxId/copy" element={<TaxCopyPage />} />
            </Route>

            <Route path="invoices" element={<InvoiceRootPage />} />

            <Route path="invoices">
              <Route path="new" element={<InvoiceNewPage />} />
              <Route path=":invoiceId/edit" element={<InvoiceEditPage />} />
              <Route path=":invoiceId/copy" element={<InvoiceCopyPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
