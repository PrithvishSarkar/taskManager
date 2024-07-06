import './App.css';
import { useState, useRef } from 'react';

// Header Component to track task completion
function Header({ toDoArray, count }) {
  if (count === toDoArray.length && toDoArray.length !== 0) {
    setTimeout(
      () => alert(`YaY!! \nYou have completed all ${count} tasks!`), 200
    );
  }
  return (
    <header className="header">
      <section className="introduction">
        Manage You Tasks <br /> Effectively!
      </section>
      <section className="taskCount">
        Completed: <br /> {count}/{toDoArray.length}
      </section>
    </header>
  );
}

// Form Component for user(s) to input data
function Form({ idValue, setData, setCount }) {
  const [input, setInput] = useState('');
  const handleClick = () => {
    if (input.trim() === '') {
      alert("Task Cannot be Empty!!");
      return;
    }
    setData(
      previousData => [
        ...previousData,
        {id: idValue.current++, task: input, isCompleted: false}
      ]
    );
    setInput('');
  };
  const handleReset = () => {
    setData([]); setCount(0);
  };
  return (
    <form onSubmit={e => e.preventDefault()} className="inputForm">
      <input
        type="text"
        autoFocus={true}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter you tasks here.."
        className="form formInput"
      />
      <button type="submit" onClick={handleClick} className="form formButton">
        Add Tasks
      </button>
      <button type="button" onClick={handleReset} className='form formReset'>
        Delete All Tasks
      </button>
    </form>
  );
}

// ListItem Component to decorate the list items
function ListItem({ todo, onEditTask, onDeleteTask, setCount }) {
  const handleCheckBoxClick = (e) => {
    if (e.target.value === "✗") {
      e.target.value = "✓";
      e.target.textContent = "✓";
      e.target.style.backgroundColor = "#006400"; // Dark Green
      todo.isCompleted = true;
      setTimeout(
        () => alert("Congratulations!! \nYou have completed the task!"),
        100
      );
      setCount((count) => count + 1);
    } else {
      todo.isCompleted = false;
      e.target.value = "✗";
      e.target.textContent = "✗";
      e.target.style.backgroundColor = "#8b0000"; // Dark Red
      setCount((count) => count - 1);
    }
  };
  const handleEditTask = () => {
    const newTask = prompt("Enter the Changed Task: ", todo.task);
    if (newTask !== null && newTask.trim() !== '')
      onEditTask(todo.id, newTask);
    else alert("Invalid!!");
  };
  const handleDeleteTask = () => {
    const confirmation = confirm("Do you really want to delete this task?");
    if (confirmation) {
      onDeleteTask(todo.id);
      if (todo.isCompleted)
        setCount(count => count - 1);
    }
    else alert("Task NOT Deleted!");
  };
  return (
    <li key={todo.id} className="listItems">
      <button
        type="button"
        onClick={handleCheckBoxClick}
        className="listCheckBox"
        value="&#10007;"
      >
        &#10007;
      </button>
      {todo.task}
      <button
        type="button"
        onClick={handleEditTask}
        className="listButton"
      >
        Edit Task
      </button>
      <button
        type="button"
        onClick={handleDeleteTask}
        className="listButton"
      >
        Delete Task
      </button>
    </li>
  );
}

// To-Do-List Component to display all the added tasks
function List({ todos, setToDo, setCount }) {
  const handleEditTask = (id, newTask) => {
    setToDo(
      previousToDo => previousToDo.map(
        todo => (todo.id === id) ? { ...todo, task: newTask } : todo
      )
    );
  };
  const handleDeleteTask = (id) => {
    setToDo(
      previousToDo => previousToDo.filter(todo => (todo.id !== id))
    );
  };
  return (
    <ul style={{listStyleType: "none"}}>
      {
        todos.map(
          todo => <ListItem
            todo={todo}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            setCount={setCount}
          />
        )
      }
    </ul>
  );
}

// App Component clubs all the required components
export default function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const dataLength = useRef(data.length);
  return (
    <>
      <Header toDoArray={data} count={count} />
      <Form idValue={dataLength} setData={setData} setCount={setCount} />
      <List todos={data} setToDo={setData} setCount={setCount} />
    </>
  );
}