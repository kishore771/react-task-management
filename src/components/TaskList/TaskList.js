import { useDrag } from "react-dnd";
import { setTasks } from "../../utils/storage";
import "./TaskList.css";

const TaskItem = ({ task, isAdmin, onComplete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: task,
    canDrag: isAdmin && task.status !== "Completed",
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  return (
    <div
      ref={isAdmin ? drag : null}
      className={`task-card ${isDragging ? "dragging" : ""}`}
    >
      <strong className="task-title">{task.title}</strong>
      <p className="task-status">Status: {task.status}</p>

      {!isAdmin && task.status !== "Completed" && (
        <button
          onClick={() => onComplete(task.id)}
          className="complete-button"
        >
          Mark As Completed
        </button>
      )}
    </div>
  );
};

const TaskList = ({ tasks, isAdmin, onUpdate }) => {
  const onComplete = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, status: "Completed" } : t
    );
    setTasks(updated);
    onUpdate(updated);
  };

  return (
    <div className="task-grid-container">
      {tasks.length === 0 && <p>No tasks</p>}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isAdmin={isAdmin}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
};

export default TaskList;

