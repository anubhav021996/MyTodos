import { Provider as ReduxProvider } from "react-redux";
import { store } from "./Redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Todo } from "./Screens/Todo";
import { Email } from "./Screens/Authentications/Email";
import { Login } from "./Screens/Authentications/Login";
import { Signup } from "./Screens/Authentications/Signup";
import { ForgotPassword } from "./Screens/Authentications/ForgotPassword";
import { ResetPassword } from "./Screens/Authentications/ResetPassword";
import { Navbar } from "./Components/Navbar";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer
        linking={{
          config: {
            screens: {
              todo: "todo",
              email: "email",
              login: "login",
              signup: "signup",
              forgot: "forgot",
              reset: "reset",
            },
          },
        }}
      >
        <BaseStack_web />
      </NavigationContainer>
    </ReduxProvider>
  );
}

const BaseStack_web = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="todo"
      screenOptions={{
        header: (props) => <Navbar {...props} />,
      }}
    >
      <Stack.Screen name="todo" component={Todo} />
      <Stack.Screen name="email" component={Email} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="forgot" component={ForgotPassword} />
      <Stack.Screen name="reset" component={ResetPassword} />
    </Stack.Navigator>
  );
};
