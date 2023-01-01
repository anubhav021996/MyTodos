import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const Navigate = useNavigate();

  return (
    <View style={styles.nav}>
      <Text style={styles.logo} onPress={() => Navigate("/")}>
        My Todos
      </Text>
      <Button title="Login" onPress={() => Navigate("/login")} />
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
});
