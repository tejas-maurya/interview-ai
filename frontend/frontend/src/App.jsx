import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import authRouter from "../../../backend/src/routes/auth.routes";
const App = () => {

  return (<AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  )

};

export default App;