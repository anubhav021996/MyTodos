import { BrowserRouter } from "react-router-dom";
import { AllRoutes } from "./Components/AllRoutes";
import { Navbar } from "./Components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AllRoutes />
    </BrowserRouter>
  );
}
