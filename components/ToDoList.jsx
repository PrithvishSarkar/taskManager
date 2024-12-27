import "../src/tailwind.css";
import { SingleTask } from "./SingleTask.jsx";

// This component returns all the tasks as an unordered list
// toDoListArray -> The Task List Array containing all the task details
// udpateToDoListArray -> State Setter Function to update 'toDoListArray'
// updateShowEditModal -> State Setter Function to show or hide the Edit Modal
const ToDoList = ({
  toDoListArray,
  updateToDoListArray,
  updateShowEditModal,
}) => {
  // This function runs when the user clicks on the 'toggle task done' button
  // This function sets the 'done' value to either 'true' or 'false'
  const handleTaskToggle = (i) => {
    updateToDoListArray((previousArray) =>
      previousArray.map((item, index) => {
        return index === i ? { ...item, done: !item.done } : item;
      })
    );
  };

  // This function runs when the user clicks on 'Pen' icon to edit the task
  // This function runs to open an Edit Modal to update that particular task text
  const handleTaskEdit = (i) => {
    updateShowEditModal({ show: true, index: i });
  };

  // This function runs when the user clicks on 'Bin' icon to delete the task
  // This function runs to delete that particular task
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
