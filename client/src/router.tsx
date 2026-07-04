import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import FeedbackForm from "./pages/FeedbackForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <FeedbackForm />,
      },
    ],
  },
]);