import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { LoginRegister } from "./pages/LoginRegister";
import { Dashboard } from "./pages/Dashboard";
import { Editor } from "./pages/Editor";
import { Profile } from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRegister />,
  },
  {
    path: "/app",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "editor/:roomId",
        element: <Editor />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
