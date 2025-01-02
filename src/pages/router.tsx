import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardIndexPage } from "./dashboard";
import { Authenticable } from "@/components";
import { LoginPage, RegisterPage } from "./authentication";
import { DashboardLayout, DefaultLayout } from "@/layouts";
import { RootPage } from ".";
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

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Authenticable>
              <DefaultLayout />
            </Authenticable>
          }
        >
          <Route index element={<RootPage />} />

          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<DashboardIndexPage />} />

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

            <Route path="invoices" element={<InvoiceRootPage />} />
          </Route>
        </Route>

        <Route path="invoices">
          <Route path="new" element={<InvoiceNewPage />} />
          <Route path=":invoiceId/edit" element={<InvoiceEditPage />} />
          <Route path=":invoiceId/copy" element={<InvoiceCopyPage />} />
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
