import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import FeedbackForm from "./pages/FeedbackForm";
import AdminDashboard from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <FeedbackForm />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
    ],
  },
]);
     