import { BrowserRouter, Route, Routes } from "react-router";
import { RootPage } from "./root";
import DefaultLayout from "@/layouts/default";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<RootPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
