import { createBrowserRouter } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FeedbackForm />,
  },
]);