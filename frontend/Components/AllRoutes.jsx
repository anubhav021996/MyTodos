import { Route, Routes } from "react-router-dom";
import { Email } from "../Screens/Authentications/Email";
import { ForgotPassword } from "../Screens/Authentications/ForgotPassword";
import { Login } from "../Screens/Authentications/Login";
import { ResetPassword } from "../Screens/Authentications/ResetPassword";
import { Signup } from "../Screens/Authentications/Signup";
import { Todo } from "../Screens/Todo";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Todo />} />
      <Route path="/email" element={<Email />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset" element={<ResetPassword />} />
    </Routes>
  );
};
