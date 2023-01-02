import { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-dom";
import { wp } from "../../Utilis/Scale";
import { BASE_URL } from "@env";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../Redux/Auth/actionAuth";

const initialData = {
  email: "",
  password: "",
};

export const Login = () => {
  const [data, setData] = useState(initialData);
  const [isupload, setIsUpload] = useState(false);
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { token } = useSelector((store) => store);

  const handleChange = (value, name) => setData({ ...data, [name]: value });

  const handleSubmit = () => {
    setIsUpload(true);
    axios
      .post(`${BASE_URL}/login`, data)
      .then((res) => {
        Dispatch(addToken(res.data.token));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        Navigate("/");
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
    if (token) return Navigate("/");
  }, []);

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
      <Text style={styles.forgot} onPress={() => Navigate("/forgot")}>
        Forgot Password?
      </Text>
      <Button title="Submit" disabled={isupload} onPress={handleSubmit} />
      <Text style={styles.new} onPress={() => Navigate("/email")}>
        Create a new account
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    textAlign: "center",
    marginTop: 50,
    gap: 20,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    padding: 50,
  },
  heading: {
    fontSize: "xx-large",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: wp(100) < 425 ? 200 : 400,
    borderWidth: 1,
    padding: 10,
    margin: "auto",
  },
  new: {
    color: "#2196f3",
    cursor: "pointer",
    marginTop: -15,
  },
  forgot: {
    color: "#2196f3",
    cursor: "pointer",
    textAlign: "right",
    marginTop: -15,
  },
});
