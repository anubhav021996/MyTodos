import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { AllRoutes } from "./Components/AllRoutes";
import { Navbar } from "./Components/Navbar";
import { store } from "./Redux/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
    <BrowserRouter>
      <Navbar />
      <AllRoutes />
    </BrowserRouter>
    </ReduxProvider>
  );
}
