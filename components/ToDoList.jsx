import "../src/tailwind.css";
import { SingleTask } from "./SingleTask.jsx";

const ToDoList = ({
  toDoListArray,
  updateToDoListArray,
  updateShowEditModal,
}) => {
  const handleTaskToggle = (i) => {
    updateToDoListArray((previousArray) =>
      previousArray.map((item, index) => {
        return index === i ? { ...item, done: !item.done } : item;
      })
    );
  };
  const handleTaskEdit = (i) => {
    updateShowEditModal({ show: true, index: i });
  };
  const handleTaskDelete = (i) => {
    updateToDoListArray((previousArray) =>
      previousArray.filter((_, index) => index !== i)
    );
  };
  return (
    <ul className="mt-8 list-none">
      {toDoListArray.map((toDoItem, index) => (
        <li key={index}>
          <SingleTask
            toDoItem={toDoItem}
            onTaskToggle={() => handleTaskToggle(index)}
            onEdit={() => handleTaskEdit(index)}
            onDelete={() => handleTaskDelete(index)}
          />
        </li>
      ))}
    </ul>
  );
};

export { ToDoList };
