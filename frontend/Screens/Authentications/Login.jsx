import { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { wp } from "../../Utilis/Scale";
import { BASE_URL } from "@env";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../Redux/Auth/actionAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialData = {
  email: "",
  password: "",
};

export const Login = ({ navigation }) => {
  const [data, setData] = useState(initialData);
  const [isupload, setIsUpload] = useState(false);
  const Dispatch = useDispatch();
  const { token } = useSelector((store) => store);

  const handleChange = (value, name) => setData({ ...data, [name]: value });

  const handleSubmit = () => {
    setIsUpload(true);
    axios
      .post(`${BASE_URL}/login`, data)
      .then(async (res) => {
        Dispatch(addToken(res.data.token));
        await AsyncStorage.setItem("token", res.data.token);
        navigation.navigate("todo");
      })
      .catch((e) => {
        if (e.response.data.errors)
          return wp(100) < 425
            ? Alert.alert(e.response.data.errors[0].msg)
            : alert(e.response.data.errors[0].msg);
        wp(100) < 425 ? Alert.alert(e.response.data) : alert(e.response.data);
      })
      .finally(() => setIsUpload(false));
  };

  useEffect(() => {
    if (token) return navigation.navigate("todo");
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        onChangeText={(text) => handleChange(text, "email")}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter your password"
        onChangeText={(text) => handleChange(text, "password")}
      />
      <Text style={styles.forgot} onPress={() => navigation.navigate("forgot")}>
        Forgot Password?
      </Text>
      <Button title="Submit" disabled={isupload} onPress={handleSubmit} />
      <Text style={styles.new} onPress={() => navigation.navigate("email")}>
        Create a new account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    marginTop: 50,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    padding: 50,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: wp(100) < 425 ? 260 : 400,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  new: {
    color: "#2196f3",
    cursor: "pointer",
    textAlign: "center",
    marginTop: 5,
  },
  forgot: {
    color: "#2196f3",
    cursor: "pointer",
    textAlign: "right",
    marginTop: -10,
    marginBottom: 15,
  },
});
