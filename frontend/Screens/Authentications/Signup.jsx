import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { wp } from "../../Utilis/Scale";
import { BASE_URL } from "@env";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../Redux/Auth/actionAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialData = {
  name: "",
  password: "",
};

export const Signup = ({ route, navigation }) => {
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
          Authorization: "Bearer " + route.params.token,
        },
      })
      .then(async (res) => {
        Dispatch(addToken(res.data.token));
        await AsyncStorage.setItem("token", res.data.token);
        navigation.navigate("/");
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
    if (token) return navigation.navigate("/");
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={(text) => handleChange(text, "name")}
      />
      <TextInput style={styles.input} disabled value={route.params.email} />
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
});
