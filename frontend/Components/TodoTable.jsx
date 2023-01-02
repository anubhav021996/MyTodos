import { View, Text, StyleSheet } from "react-native";
import { wp } from "../Utilis/Scale";
import { TodoRow } from "./TodoRow";

export const TodoTable = ({ todos, deleteTodo, toggleTodo }) => {
  return (
    <View>
      <View style={styles.tableHead}>
        <Text style={styles.serialHead}>S.No.</Text>
        <Text style={styles.titleHead}>Title</Text>
        <Text style={styles.statusHead}>Status</Text>
        <Text style={styles.toggleHead}>Toggle</Text>
        <Text style={styles.deleteHead}>Delete</Text>
      </View>

      {todos.map((el, i) => (
        <TodoRow
          key={el._id}
          serial={i + 1}
          title={el.title}
          status={el.status}
          id={el._id}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tableHead: {
    flexDirection: "row",
    margin: "auto",
    marginTop: 20,
  },
  serialHead: {
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
  },
  titleHead: {
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: wp(100) < 425 ? 80 : 500,
    textAlign: "center",
  },
  statusHead: {
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 95,
    textAlign: "center",
  },
  toggleHead: {
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 70,
    textAlign: "center",
  },
  deleteHead: {
    fontWeight: "bold",
    borderWidth: 1,
    padding: 10,
    width: 65,
    textAlign: "center",
  },
});
