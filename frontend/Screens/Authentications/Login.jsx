import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useNavigate } from "react-router-dom";
import { wp } from "../../Utilis/Scale";

const initialData = {
  email: "",
  password: "",
};

export const Login = () => {
  const [data, setData] = useState(initialData);
  const Navigate = useNavigate();

  const handleChange = (name, e) => {
    const { value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChange={() => handleChange("name")}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        type="password"
        placeholder="Enter your password"
        onChange={() => handleChange("password")}
      />
      <Text style={styles.forgot} onPress={() => Navigate("/reset")}>
        Forgot Password?
      </Text>
      <Button title="Submit" onPress={handleSubmit} />
      <Text style={styles.new} onPress={() => Navigate("/signup")}>
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
