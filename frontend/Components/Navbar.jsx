import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToken, addUser } from "../Redux/Auth/actionAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { wp } from "../Utilis/Scale";

export const Navbar = ({ navigation }) => {
  const Dispatch = useDispatch();
  const { token } = useSelector((store) => store);

  useEffect(() => {
    if (token) Dispatch(addUser(token));
  }, [token]);

  const getToken = async () => {
    let t = await AsyncStorage.getItem("token");
    Dispatch(addToken(t));
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleLogout = async () => {
    Dispatch(addToken(null));
    Dispatch(addUser(null));
    await AsyncStorage.removeItem("token");
  };

  return (
    <View style={styles.nav}>
      <Text style={styles.logo} onPress={() => navigation.navigate("todo")}>
        My Todos
      </Text>
      {token ? (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.log}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.log}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    marginTop: wp(100) < 425 ? 30 : 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  logo: {
    fontFamily: "sans-serif",
    fontSize: 25,
    fontWeight: "bold",
    cursor: "pointer",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  log: {
    fontWeight: "bold",
  },
});
