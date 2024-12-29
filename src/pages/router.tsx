import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardIndexPage } from "./dashboard";
import { Authenticable } from "@/components";
import { LoginPage, RegisterPage } from "./authentication";
import {
  ArticlesEditPage,
  ArticlesIndexPage,
  ArticlesNewPage,
} from "./articles";
import { IndexPage } from ".";
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
          <Route index element={<IndexPage />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardIndexPage />} />

            <Route path="articles">
              <Route index element={<ArticlesIndexPage />} />
              <Route path="new" element={<ArticlesNewPage />} />
              <Route path=":articleId/edit" element={<ArticlesEditPage />} />
            </Route>
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
