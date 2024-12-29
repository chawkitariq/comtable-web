import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardIndexPage } from "./dashboard";
import { Authenticable } from "@/components";
import { LoginPage, RegisterPage } from "./authentication";
import {
  ArticleEditPage,
  ArticleDefaultPage,
  ArticleNewPage,
  ArticleCopyPage,
} from "./article";
import { DefaultPage } from ".";
import { DashboardLayout, DefaultLayout } from "@/layouts";

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
          <Route index element={<DefaultPage />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndexPage />} />

            <Route path="articles">
              <Route index element={<ArticleDefaultPage />} />
              <Route path="new" element={<ArticleNewPage />} />
              <Route path=":articleId/edit" element={<ArticleEditPage />} />
              <Route path=":articleId/copy" element={<ArticleCopyPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
