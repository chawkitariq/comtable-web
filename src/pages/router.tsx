import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Authenticable } from "@/components";
import { RootPage } from "./root";
import { LoginPage, RegisterPage } from "./authentication";
import { CompanyEditPage, CompanyNewPage, CompanyRootPage } from "./company";
import { TaxCopyPage, TaxEditPage, TaxNewPage, TaxRootPage } from "./tax";
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
import { UserCopyPage, UserEditPage, UserNewPage, UserRootPage } from "./user";
import { RoleCopyPage, RoleEditPage, RoleNewPage, RoleRootPage } from "./role";
import {
  InvitationCopyPage,
  InvitationEditPage,
  InvitationNewPage,
  InvitationRootPage,
} from "./invitation";
import { DefaultLayout } from "@/layouts";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authenticable />}>
          <Route element={<DefaultLayout />}>
            <Route index element={<Navigate to="/companies" replace />} />

            <Route path="companies" element={<CompanyRootPage />}>
              <Route path="new" element={<CompanyNewPage />} />
              <Route path=":companyId/edit" element={<CompanyEditPage />} />
            </Route>

            <Route path="users" element={<UserRootPage />}>
              <Route path="new" element={<UserNewPage />} />
              <Route path=":userId/edit" element={<UserEditPage />} />
              <Route path=":userId/copy" element={<UserCopyPage />} />
            </Route>

            <Route path="invitations" element={<InvitationRootPage />}>
              <Route path="new" element={<InvitationNewPage />} />
              <Route
                path=":invitationId/edit"
                element={<InvitationEditPage />}
              />
              <Route
                path=":invitationId/copy"
                element={<InvitationCopyPage />}
              />
            </Route>

            <Route path="roles" element={<RoleRootPage />}>
              <Route path="new" element={<RoleNewPage />} />
              <Route path=":roleId/edit" element={<RoleEditPage />} />
              <Route path=":roleId/copy" element={<RoleCopyPage />} />
            </Route>

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
