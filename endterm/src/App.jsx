import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layots/RootLayout";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const ItemsList = lazy(() => import("./pages/ItemsList"));
const ItemDetails = lazy(() => import("./pages/ItemDetails"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const Favorites = lazy(() => import("./pages/Favorites"));

const Loading = <p style={{ textAlign: "center", marginTop: 40 }}>Loading…</p>;

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={Loading}>
        <RootLayout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Suspense fallback={Loading}><Home /></Suspense> },
      { path: "about", element: <Suspense fallback={Loading}><About /></Suspense> },
      { path: "items", element: <Suspense fallback={Loading}><ItemsList /></Suspense> },
      { path: "items/:id", element: <Suspense fallback={Loading}><ItemDetails /></Suspense> },
      { path: "login", element: <Suspense fallback={Loading}><Login /></Suspense> },
      { path: "signup", element: <Suspense fallback={Loading}><Signup /></Suspense> },
      { path: "profile", element: <Suspense fallback={Loading}><Profile /></Suspense> },
      { path: "favorites", element: <Favorites /> },

    ],
  },
]);

export default function App() {
  // throw new Error("TEST ERROR BOUNDARY"); // ErrorBoundary проверка бонуски
  return <RouterProvider router={router} />;
}
