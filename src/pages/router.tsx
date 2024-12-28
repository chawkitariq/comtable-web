import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "@/layouts/default";
import { DashboardIndexPage } from "./dashboard";
import { ArticlesIndexPage } from "./articles";
import { ArticlesEditPage } from "./articles/edit";
import { ArticlesNewPage } from "./articles/new";
import { Authenticable } from "@/components";
import { LoginPage, RegisterPage } from "./authentication";

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
          <Route index element={<DashboardIndexPage />} />

          <Route path="articles">
            <Route index element={<ArticlesIndexPage />} />
            <Route path="new" element={<ArticlesNewPage />} />
            <Route path=":articleId/edit" element={<ArticlesEditPage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
