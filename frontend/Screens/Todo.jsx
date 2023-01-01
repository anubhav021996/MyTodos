import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { wp } from "../Utilis/Scale";

export const Todo = () => {
  return (
    <View>
      <Text style={styles.heading}>All Tasks</Text>
      <View style={styles.add}>
        <TextInput style={styles.input} placeholder="Enter your task" />
        <Button title="Add New Task" />
      </View>

      <View style={styles.tableHead}>
        <Text style={styles.serialHead}>S.No.</Text>
        <Text style={styles.titleHead}>Title</Text>
        <Text style={styles.statusHead}>Status</Text>
        <Text style={styles.toggleHead}>Toggle</Text>
        <Text style={styles.deleteHead}>Delete</Text>
      </View>

      <View style={styles.tableBody}>
        <Text style={styles.serial}>1</Text>
        <Text style={styles.title}>Title</Text>
        <Text style={styles.status}>Not Completed</Text>
        <Text style={styles.toggle}>Toggle Status</Text>
        <Text style={styles.delete}>Delete Task</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: "xx-large",
    fontWeight: "bold",
    marginBottom: 20,
    margin: "auto",
    marginTop: 20,
  },
  add: {
    flexDirection: "row",
    gap: 10,
    margin: "auto",
  },
  input: {
    width: wp(100) < 425 ? 200 : 400,
    borderWidth: 1,
    padding: 10,
  },
  tableHead: {
    flexDirection: "row",
    margin: "auto",
    marginTop: 20,
  },
  serialHead: {
    fontSize: "larger",
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
  },
  titleHead: {
    fontSize: "larger",
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: wp(100) < 425 ? 100 : 800,
    textAlign: "center",
  },
  statusHead: {
    fontSize: "larger",
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 150,
    textAlign: "center",
  },
  toggleHead: {
    fontSize: "larger",
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 140,
    textAlign: "center",
  },
  deleteHead: {
    fontSize: "larger",
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 120,
    textAlign: "center",
  },
  tableBody: {
    flexDirection: "row",
    margin: "auto",
  },
  serial: {
    fontSize: "large",
    borderWidth: 1,
    padding: 10,
    width: 70,
    textAlign: "center",
  },
  title: {
    fontSize: "large",
    borderWidth: 1,
    padding: 10,
    width: wp(100) < 425 ? 100 : 800,
  },
  status: {
    fontSize: "large",
    borderWidth: 1,
    padding: 10,
    width: 150,
  },
  toggle: {
    fontSize: "large",
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 140,
    cursor: "pointer",
  },
  delete: {
    fontSize: "large",
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 120,
    cursor: "pointer",
  },
});
