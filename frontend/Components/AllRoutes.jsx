import { Route, Routes } from "react-router-dom";
import { Login } from "../Screens/Authentications/Login";
import { ResetPassword } from "../Screens/Authentications/ResetPassword";
import { Signup } from "../Screens/Authentications/Signup";
import { Todo } from "../Screens/Todo";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reset" element={<ResetPassword />} />
    </Routes>
  );
};
