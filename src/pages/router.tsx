import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardIndexPage } from "./dashboard";
import { Authenticable } from "@/components";
import { LoginPage, RegisterPage } from "./authentication";
import {
  ArticleEditPage,
  ArticleRootPage,
  ArticleNewPage,
  ArticleCopyPage,
} from "./article";
import { RootPage } from ".";
import { DashboardLayout, DefaultLayout } from "@/layouts";
import {
  InvoiceCopyPage,
  InvoiceEditPage,
  InvoiceNewPage,
  InvoiceRootPage,
} from "./invoice";

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
            <Route path="/dashboard" element={<DashboardIndexPage />} />

            <Route path="articles" element={<ArticleRootPage />}>
              <Route path="new" element={<ArticleNewPage />} />
              <Route path=":articleId/edit" element={<ArticleEditPage />} />
              <Route path=":articleId/copy" element={<ArticleCopyPage />} />
            </Route>

            <Route path="invoices" element={<InvoiceRootPage />}>
              <Route path="new" element={<InvoiceNewPage />} />
              <Route path=":invoiceId/edit" element={<InvoiceEditPage />} />
              <Route path=":invoiceId/copy" element={<InvoiceCopyPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
