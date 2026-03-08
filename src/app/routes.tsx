import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { AdminPage } from "./pages/AdminPage";
import { PrintPage } from "./pages/PrintPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/admin",
    Component: AdminPage,
  },
  {
    path: "/print",
    Component: PrintPage,
  },
]);
