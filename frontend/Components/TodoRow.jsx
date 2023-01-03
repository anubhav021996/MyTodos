import { StyleSheet, Text, View } from "react-native";
import { wp } from "../Utilis/Scale";

export const TodoRow = ({
  serial,
  title,
  status,
  id,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <View style={styles.tableBody}>
      <Text style={styles.serial}>{serial}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.status}>
        {status ? "Completed" : "Not Completed"}
      </Text>
      <Text style={styles.toggle} onPress={() => toggleTodo(id)}>
        Toggle Status
      </Text>
      <Text style={styles.delete} onPress={() => deleteTodo(id)}>
        Delete Task
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tableBody: {
    flexDirection: "row",
    margin: "auto",
  },
  serial: {
    borderWidth: 1,
    padding: 10,
    width: 58,
    textAlign: "center",
  },
  title: {
    borderWidth: 1,
    padding: 10,
    width: wp(100) < 425 ? 80 : 500,
  },
  status: {
    borderWidth: 1,
    padding: 10,
    width: 91,
    textAlign: "center",
  },
  toggle: {
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 67,
    cursor: "pointer",
    textAlign: "center",
  },
  delete: {
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 65,
    cursor: "pointer",
    textAlign: "center",
  },
});
