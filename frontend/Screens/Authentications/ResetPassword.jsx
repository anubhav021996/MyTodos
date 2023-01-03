import { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { wp } from "../../Utilis/Scale";
import { BASE_URL } from "@env";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken } from "../../Redux/Auth/actionAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ResetPassword = ({ route, navigation }) => {
  const [password, setPassword] = useState("");
  const [isUpload, setIsUpload] = useState(false);
  const Dispatch = useDispatch();
  const { token } = useSelector((store) => store);

  const handleSubmit = () => {
    setIsUpload(true);
    axios
      .patch(
        `${BASE_URL}/user/reset`,
        { password },
        {
          headers: {
            Authorization: "Bearer " + route.params.token,
          },
        }
      )
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
      <Text style={styles.heading}>Reset Password</Text>
      <TextInput style={styles.input} value={route.params.email} disabled />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter new password"
        onChangeText={(text) => setPassword(text)}
      />
      <Button disabled={isUpload} title="Submit" onPress={handleSubmit} />
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
