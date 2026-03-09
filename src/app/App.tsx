import { RouterProvider } from "react-router";
import { DataProvider } from "./context/DataContext";
import { Toaster } from "./components/ui/sonner";
import { router } from "./routes";

export default function App() {
  return (
    <DataProvider>
      <Toaster position="bottom-right" />
      <RouterProvider router={router} />
    </DataProvider>
  );
}
