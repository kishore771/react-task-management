import { useDrop } from "react-dnd";
import { getTasks, setTasks } from "../../utils/storage";
import "./UserList.css";

const UserList = ({ user, onTaskReassign }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (task) => {
      if (task.assigneeId === user.id) {
        return;
      }

      const updatedTasks = getTasks().map((t) =>
        t.id === task.id ? { ...t, assigneeId: user.id } : t
      );

      setTasks(updatedTasks);
      onTaskReassign(updatedTasks);

      alert(`Task "${task.title}" has been reassigned to ${user.username}`);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  return (
    <div
      ref={drop}
      className={`user-card ${isOver ? "hover" : ""}`}
    >
      <h3 className="user-name"> {user.username}</h3>
    </div>
  );
};

export default UserList;

