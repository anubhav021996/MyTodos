import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wp } from "../Utilis/Scale";
import { BASE_URL } from "@env";
import { TodoRow } from "../Components/TodoRow";

export const Todo = () => {
  const { token, user } = useSelector((store) => store);
  const [todos, setTodos] = useState([]);
  const [isUpload, setIsUpload] = useState(false);
  const [title, setTitle] = useState("");
  const Navigate = useNavigate();

  const handleAdd = () => {
    setIsUpload(true);
    axios
      .post(
        `${BASE_URL}/todo`,
        { title },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => getTodos())
      .catch((e) => {
        if (e.response.data.errors)
          return wp(100) < 425
            ? Alert.alert(e.response.data.errors[0].msg)
            : alert(e.response.data.errors[0].msg);
        wp(100) < 425 ? Alert.alert(e.response.data) : alert(e.response.data);
      })
      .finally(() => setIsUpload(false));
  };

  const getTodos = () => {
    axios
      .get(`${BASE_URL}/todo`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setTodos(res.data);
      });
  };

  const toggleTodo = (id) => {
    axios
      .patch(
        `${BASE_URL}/todo/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => getTodos());
  };

  const deleteTodo = (id) => {
    axios
      .delete(`${BASE_URL}/todo/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => getTodos());
  };

  useEffect(() => {
    if (!token) return Navigate("/login");
    getTodos();
  }, [token]);

  return (
    <View>
      <Text style={styles.heading}>{`Welcome ${user?.name}!`}</Text>
      <View style={styles.add}>
        <TextInput
          style={styles.input}
          placeholder="Enter your task"
          onChangeText={(text) => setTitle(text)}
        />
        <Button title="Add New Task" disabled={isUpload} onPress={handleAdd} />
      </View>

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
  heading: {
    fontSize: "larger",
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
