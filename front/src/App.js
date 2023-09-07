import { Route, Routes } from "react-router-dom";
import InternautesFormPage from "./pages/internautesFormPage";

function App() {
  return (
    <Routes>
      <Route path="" element={<InternautesFormPage />} />
    </Routes>
  );
}

export default App;
