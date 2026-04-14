import { useNavigate } from "react-router-dom"; 
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { RouterProvider } from "react-router-dom";
const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;