import { useState, useEffect } from "react";
import "./tailwind.css";

const ToDoHeader = ({ text, setText, onAdd }) => {
  return (
    <fieldset
      className="border-2 border-sky-200
    rounded-md
    p-4"
    >
      <legend
        className="px-2
      font-sans
      italic
      text-sky-200 md:text-xl"
      >
        What's your plan for today?
      </legend>
      <section
        className="flex flex-col md:flex-row
      justify-around md:justify-center
      items-center
      gap-4"
      >
        <input
          type="text"
          placeholder="Enter Your ToDo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full md:w-auto
          md:text-2xl
          text-center
          font-bold
          p-2
          text-sky-400
          outline-0 outline-offset-0
          rounded-md
          border-2
          border-sky-400
          bg-transparent
          focus:ring-2 focus:ring-sky-800
          placeholder:text-sky-200"
        />
        <button
          onClick={onAdd}
          className="w-full md:w-auto
          bg-emerald-200
          text-emerald-900
          font-bold
          font-sans
          p-2
          rounded-md
          md:text-2xl"
        >
          Add ToDo
        </button>
      </section>
    </fieldset>
  );
};

const ToDoList = ({ id, task, onDelete, onEdit }) => {
  const [date, setDate] = useState(new Date());
  const [taskDone, setTaskDone] = useState(false);

  return (
    <li
      key={id}
      className="flex flex-row
      justify-between
      items-center
      p-2 mb-2
      rounded-md
      custom-list-background-image"
    >
      <div
        data-type="main-content"
        className="flex flex-row
        justify-start
        items-center
        max-w-[70%] md:max-w-[85%]"
      >
        <button
          onClick={() => setTaskDone(!taskDone)}
          className={`p-1 mr-2
            rounded-md
            ${taskDone ? "bg-emerald-200" : "bg-rose-400"}`}
        >
          {taskDone ? "✔" : "❌"}
        </button>
        <span
          className="flex flex-col
        justify-center
        items-start"
        >
          <span
            data-type="todo-task"
            className="text-base md:text-xl
            text-indigo-950
            font-serif
            font-semibold
            first-letter:capitalize"
          >
            {task}
          </span>
          <span
            className="text-xs md:text-sm
          text-indigo-950
          font-mono
          font-semibold"
          >
            {date.toLocaleTimeString()}
          </span>
          <span
            className="text-xs md:text-sm
          text-indigo-950
          font-mono
          font-semibold"
          >
            {date.toDateString()}
          </span>
        </span>
      </div>

      <div data-type="operation-button">
        <button
          onClick={() => onDelete(id)}
          className="p-1
          bg-indigo-950
          text-sky-200
          rounded-md
          text-lg md:text-2xl"
        >
          &#128465;
        </button>{" "}
        {/* trashbin-delete */}
        <button
          onClick={() => {
            onEdit(id);
            setDate(new Date());
          }}
          className="p-1
          bg-indigo-950
          text-sky-200
          rounded-md
          text-lg md:text-2xl"
        >
          &#128393;
        </button>{" "}
        {/* pen-edit */}
      </div>
    </li>
  );
};

const ToDoLists = ({ toDoArray, onDelete, onEdit }) => {
  return (
    <ul className="mt-8 list-none">
      {toDoArray.map((toDoItem, index) => (
        <ToDoList
          id={index}
          task={toDoItem}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default function App() {
  const [toDoTask, setToDoTask] = useState("");
  
  // I am fetching todo list data from the local storage if present
  // For the 1st render: no data in local storage -> the list is set to an empty array
  const [toDoListArray, setToDoListArray] = useState(() => {
    const storedToDoListArray = window.localStorage.getItem("storedToDoList");
    return storedToDoListArray ? JSON.parse(storedToDoListArray) : [];
  });

  // Side effect is used to store todo list array as a key-value pair in the local storage
  useEffect(() => {
    window.localStorage.setItem("storedToDoList", JSON.stringify(toDoListArray));
  }, [toDoListArray]);

  const handleAddition = () => {
    if (toDoTask !== "") {
      setToDoListArray((previousList) => [...previousList, toDoTask]);
      setToDoTask("");
    }
  };
  const handleDelete = (id) => {
    setToDoListArray((previousList) =>
      previousList.filter((_, index) => index !== id)
    );
  };
  const handleEdit = (id) => {
    const prompt = window.prompt(`Edit the task ${id + 1}`);
    if (prompt !== null || undefined) {
      setToDoListArray((previousList) =>
        previousList.map((value, index) => {
          if (index !== id) return value;
          else return prompt;
        })
      );
    }
  };

  return (
    <div
      data-type="container"
      className="max-w-[90vw]
      mx-auto my-4 p-2
      border-none
      rounded-md
      bg-indigo-950"
    >
      <ToDoHeader
        text={toDoTask}
        setText={setToDoTask}
        onAdd={handleAddition}
      />
      <ToDoLists
        toDoArray={toDoListArray}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
