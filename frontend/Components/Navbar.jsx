import { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToken, addUser } from "../Redux/Auth/actionAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Navbar = () => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const { token } = useSelector((store) => store);

  useEffect(() => {
    if (token) Dispatch(addUser(token));
  }, [token]);

  useEffect(async()=>{
    let t= await AsyncStorage.getItem("token");
    Dispatch(addToken(t));
  },[]);

  const handleLogout = async () => {
    Dispatch(addToken(null));
    Dispatch(addUser(null));
    await AsyncStorage.removeItem("token");
  };

  return (
    <View style={styles.nav}>
      <Text style={styles.logo} onPress={() => Navigate("/")}>
        My Todos
      </Text>
      {token ? (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.log}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => Navigate("/login")}
        >
          <Text style={styles.log}>Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    fontFamily: "fantasy",
    fontSize: "xx-large",
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
