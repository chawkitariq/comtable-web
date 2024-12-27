import { BrowserRouter, Route, Routes } from "react-router";
import DefaultLayout from "@/layouts/default";
import { DashboardIndexPage } from "./dashboard";
import { ArticlesIndexPage } from "./articles";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<DashboardIndexPage />} />
          <Route path="articles" element={<ArticlesIndexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
