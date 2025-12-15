export const LoginData = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem(
      "users",
      JSON.stringify([
        { id: 1, username: "admin", password: "admin123", role: "admin" },
        { id: 2, username: "user1", password: "user1@2025", role: "user" },
        { id: 3, username: "user2", password: "user2@2025", role: "user" }
      ])
    );
  }

  if (!localStorage.getItem("tasks")) {
    localStorage.setItem("tasks", JSON.stringify([]));
  }
};

export const getUsers = () =>
  JSON.parse(localStorage.getItem("users")) || [];

export const getTasks = () =>
  JSON.parse(localStorage.getItem("tasks")) || [];

export const setTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));
