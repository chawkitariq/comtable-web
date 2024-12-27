import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./home";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
