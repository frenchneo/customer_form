import { Navigate, Route, Routes } from "react-router-dom";
import InternautesFormPage from "./pages/internautesFormPage";
import AdminPage from "./pages/adminPage";
import LoginPage from "./pages/loginPage";
import { AuthContext } from "./ctx/authContext";
import { useContext } from "react";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <Routes>
      {authContext.isAuthenticated ? (
        <>
          <Route path="" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="" />} />
        </>
      ) : (
        <>
          <Route path="login" element={<LoginPage />} />
          <Route path="" element={<InternautesFormPage />} />
          <Route path="*" element={<Navigate to="" />} />
        </>
      )}
    </Routes>
  );
}

export default App;
