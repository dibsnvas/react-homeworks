import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ItemsList from "./pages/ItemsList";
import ItemDetails from "./pages/ItemDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "items", element: <ItemsList /> },
      { path: "items/:id", element: <ItemDetails /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "profile", element: <Profile /> }, // защищена внутри компонента
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
