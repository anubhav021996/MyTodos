import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useLocation } from "react-router-dom";
import { wp } from "../../Utilis/Scale";
import { BASE_URL } from "@env";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../Redux/Auth/actionAuth";

const initialData = {
  name: "",
  password: "",
};

export const Signup = () => {
  const { state } = useLocation();
  const [data, setData] = useState(initialData);
  const [isupload, setisupload] = useState(false);
  const Dispatch = useDispatch();
  const { token } = useSelector((store) => store);

  const handleChange = (value, name) => setData({ ...data, [name]: value });

  const handleSubmit = () => {
    setisupload(true);
    axios
      .post(`${BASE_URL}/user`, data, {
        headers: {
          Authorization: "Bearer " + state.token,
        },
      })
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
      .finally(() => setisupload(false));
  };

  useEffect(() => {
    if (token) return Navigate("/");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={(text) => handleChange(text, "name")}
      />
      <TextInput style={styles.input} disabled value={state.email} />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter your password"
        onChangeText={(text) => handleChange(text, "password")}
      />
      <Button disabled={isupload} title="Submit" onPress={handleSubmit} />
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
});
