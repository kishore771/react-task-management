import { useState } from "react";
import { v4 as uuid } from "uuid";
import { getUsers, getTasks, setTasks } from "../../utils/storage";
import "./TaskForm.css";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [assigneeId, setAssigneeId] = useState("");

  const users = getUsers().filter((u) => u.role === "user");

  const addTask = () => {
    if (!title || !assigneeId) return;

    const assignedUser = users.find(
      (u) => u.id === Number(assigneeId)
    );

    const newTask = {
      id: uuid(),
      title,
      assigneeId: Number(assigneeId),
      status: "Pending"
    };

    const updatedTasks = [...getTasks(), newTask];
    setTasks(updatedTasks);
    onTaskAdded(updatedTasks);
    alert(
      `Task "${title}" has been assigned to ${assignedUser.username}`
    );

    setTitle("");
    setAssigneeId("");
  };

  return (
    <div className="card task-form">
      <h3 className="card-title">Create Task</h3>

      <input
        placeholder="Task title"
        value={title}
        className="input-field"
        onChange={(e) => setTitle(e.target.value)}
      />

      <select
        value={assigneeId}
        onChange={(e) => setAssigneeId(e.target.value)}
        className="select-container"
      >
        <option value="" className="options">Assign user</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </select>

      <button onClick={addTask} className="add-task-button">Add Task</button>
    </div>
  );
};

export default TaskForm;
