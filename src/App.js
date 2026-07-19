import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const fetchTasks = () => {
    axios
      .get("http://localhost:5000/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = () => {
    if (text.trim() === "") {
      alert("Task cannot be empty!");
      return;
    }

    axios
      .post("http://localhost:5000/add", { text })
      .then(() => {
        setText("");
        fetchTasks();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>MERN To-Do App</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTask}>Add Task</button>

      <ul style={{ listStyle: "none" }}>
        {tasks.map((task) => (
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;