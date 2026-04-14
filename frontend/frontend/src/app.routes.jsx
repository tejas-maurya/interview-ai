import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/register";
import Protected from "./features/auth/components/Protected";
export const router = createBrowserRouter([
     {
    path: "/",          // 👈 ADD THIS
    element:<Protected><h1>homepage</h1></Protected>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);
