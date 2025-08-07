import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [sortType, setSortType] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [openSection, setOpenSection] = useState({
    tasklist: true,
    completedTasks: true,
    taskForm: false,
  });
  const activeTask = sortTask(tasks.filter((task) => !task.completed));
  const completedTask = sortTask(tasks.filter((task) => task.completed));

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  function addTask(task) {
    setTasks([...tasks, { ...task, completed: false, id: Date.now() }]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function completeTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
  }

  function sortTask(tasks) {
    return tasks.slice().sort((a, b) => {
      if (sortType === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return sortOrder === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority.toLowerCase()]
          : priorityOrder[b.priority.toLowerCase()] -
              priorityOrder[a.priority.toLowerCase()];
      } else {
        return sortOrder === "asc"
          ? new Date(a.deadline) - new Date(b.deadline)
          : new Date(b.deadline) - new Date(a.deadline);
      }
    });
  }

  function toggleSortOrder(type) {
    if (sortType === type) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortType(type);
      setSortOrder("asc");
    }
  }

  return (
    <div className="app">
      <div className="task-container">
        <h1>Task List with Priority</h1>
        {openSection.taskForm && <TaskForm addTask={addTask} />}
        <button
          className={`close-button ${!openSection.taskForm ? "" : "open"}`}
          onClick={() => toggleSection("taskForm")}
        >
          +
        </button>
      </div>
      <div className="task-container">
        <h2>Tasks:</h2>
        <div className="sort-controls">
          <button
            className={`sort-button ${sortType === "date" ? "active" : ""}`}
            onClick={() => toggleSortOrder("date")}
          >
            By Date {sortType === "date" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            className={`sort-button ${sortType === "priority" ? "active" : ""}`}
            onClick={() => toggleSortOrder("priority")}
          >
            By Priority
            {sortType === "priority" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
        {openSection.tasklist && (
          <TasksList
            deleteTask={deleteTask}
            activeTasks={activeTask}
            completeTask={completeTask}
          />
        )}
        <button
          className={`close-button ${!openSection.tasklist ? "" : "open"}`}
          onClick={() => toggleSection("tasklist")}
        >
          +
        </button>
      </div>
      <div className="completed-task-container">
        <h2>Completed Tasks:</h2>
        {openSection.completedTasks && (
          <CompletedTasksList
            className="completed-task-list"
            completedTask={completedTask}
            deleteTask={deleteTask}
          />
        )}
        <button
          className={`close-button ${
            !openSection.completedTasks ? "" : "open"
          }`}
          onClick={() => toggleSection("completedTasks")}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;

function TasksList({ activeTasks, deleteTask, completeTask }) {
  return (
    <ul className="task-list">
      {activeTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          completeTask={completeTask}
        />
      ))}
    </ul>
  );
}

function CompletedTasksList({ completedTask, deleteTask }) {
  return (
    <ul className="completed-task-list">
      {completedTask.map((task) => (
        <TaskItem key={task.id} task={task} deleteTask={deleteTask} />
      ))}
    </ul>
  );
}

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim(" ") && deadline) {
      addTask({ title, priority, deadline });
      setTitle("");
      setPriority("Low");
      setDeadline("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} action="">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <input
        className="datetime-local"
        type="datetime-local"
        required
        value={deadline}
        onChange={(event) => setDeadline(event.target.value)}
      />
      <button className="toggle-button" type="submit">
        Add Task
      </button>
    </form>
  );
}

function TaskItem({ task, deleteTask, completeTask }) {
  const { title, priority, deadline, id, completed } = task;

  return (
    <li className={`task-item ${priority.toLowerCase()}`}>
      <div className="task-info">
        <div>
          {title} <strong>{priority}</strong>
        </div>
        <div className="task-deadline">
          Due: {new Date(deadline).toLocaleString()}
        </div>
      </div>
      <div className="task-buttons">
        {!completed && (
          <button className="complete-button" onClick={() => completeTask(id)}>
            Complete
          </button>
        )}
        <button className="delete-button" onClick={() => deleteTask(id)}>
          Delete
        </button>
      </div>
    </li>
  );
}
