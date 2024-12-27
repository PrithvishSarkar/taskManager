import "../src/tailwind.css";
import { useState } from "react";

// This component takes in the Task Input
// onAdd -> This Prop adds the valid typed task in the Task List
// updateShowDeleteDataModal -> State Setter Function to show or hide the Delete Data Modal
const ToDoInput = ({
  updateShowDeleteDataModal,
  updateShowAlertModal,
  updateToDoListArray,
}) => {
  // The 'text' State Variable contains the value of the text input
  const [text, setText] = useState("");

  // This function runs when the user clicks on 'Add Task' button
  // It adds new task in the list
  const handleAddition = () => {
    if (text.trim() === "") {
      updateShowAlertModal(true);
      setTimeout(() => updateShowAlertModal(false), 3000);
    } else {
      updateToDoListArray((previousArray) => [
        {
          text: text,
          done: false,
          time: new Date().toLocaleTimeString(),
          date: new Date().toDateString(),
        },
        ...previousArray,
      ]);
    }
  };

  return (
    <fieldset className="border-2 border-sky-200 rounded-md p-4">
      <legend className="px-2 font-sans italic text-sky-200 md:text-xl">
        What's your plan for today?
      </legend>
      <section className="flex flex-col md:flex-row justify-center items-center gap-4">
        <input
          type="text"
          name="task"
          placeholder="Enter Your Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="md:grow w-full md:w-auto p-2
          md:text-2xl text-center font-bold text-sky-400
          outline-0 outline-offset-0 rounded-md border-2 border-sky-400
          bg-transparent placeholder:text-sky-200
          focus:ring-2 focus:ring-sky-800"
        />
        <button
          onClick={handleAddition}
          className="w-full md:w-auto p-2 rounded-md
          bg-emerald-200 text-emerald-900 font-bold font-sans md:text-2xl"
        >
          Add Task
        </button>
        <button
          onClick={() => updateShowDeleteDataModal(true)}
          className="w-full md:w-auto p-2 rounded-md
          bg-rose-200 text-rose-900 font-bold font-sans md:text-2xl"
        >
          Delete All
        </button>
      </section>
    </fieldset>
  );
};

export { ToDoInput };
