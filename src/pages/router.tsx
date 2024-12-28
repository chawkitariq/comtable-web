import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "@/layouts/default";
import { DashboardIndexPage } from "./dashboard";
import { ArticlesIndexPage } from "./articles";
import { ArticlesEditPage } from "./articles/edit";
import { ArticlesNewPage } from "./articles/new";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<DashboardIndexPage />} />
          <Route path="articles">
            <Route index element={<ArticlesIndexPage />} />
            <Route path="new" element={<ArticlesNewPage />} />
            <Route path=":articleId/edit" element={<ArticlesEditPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
