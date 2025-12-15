import { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { LoginData, getUsers, getTasks } from "./utils/storage";

import LoginForm from "./components/LoginForm/LoginForm";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import UserList from "./components/UserList/UserList";

import "./App.css";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
    setUsers(getUsers());
  }, []);

  if (user.role === "admin") {
    return (
      <>
        <div className="admin-header">
          <h2 className="admin-heading">Admin Dashboard</h2>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>

        <TaskForm onTaskAdded={setTasks} />

        <TaskList
          tasks={tasks}
          isAdmin={true}
          onUpdate={setTasks}
        />

        <h3 className="user-heading">Users</h3>
        <div className="user-row-container">
          {users
            .filter((u) => u.role === "user")
            .map((u) => (
              <UserList
                key={u.id}
                user={u}
                onTaskReassign={setTasks}
              />
            ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="Task-container">
        <h2 className="Task-heading">My Tasks</h2>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      <TaskList
        tasks={tasks.filter((t) => t.assigneeId === user.id)}
        isAdmin={false}
        onUpdate={setTasks}
      />
    </>
  );
};

function App() {
  useEffect(() => {
    LoginData();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
