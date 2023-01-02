import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wp } from "../Utilis/Scale";
import { BASE_URL } from "@env";

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
        <View key={el._id} style={styles.tableBody}>
          <Text style={styles.serial}>{i + 1}</Text>
          <Text style={styles.title}>{el.title}</Text>
          <Text style={styles.status}>
            {el.status ? "Completed" : "Not Completed"}
          </Text>
          <Text style={styles.toggle}>Toggle Status</Text>
          <Text style={styles.delete}>Delete Task</Text>
        </View>
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
