import "../src/tailwind.css";
import { useState } from "react";

// This Modal will be displayed when the user clicks on "Pen" icon present in each task
// updateShowEditModal -> State Setter Function to change the Boolean State Variable
// updateToDoListArray -> State Setter Function to change the To-Do Array
// ID -> same as index of the task list
function EditModal({ updateShowEditModal, updateToDoListArray, ID }) {
  // The 'text' State Variable stores the value of the input data
  const [text, setText] = useState("");

  // This function runs when "Pen" icon is clicked
  // This function updates the Task Info Array and closes the Modal
  const handleTaskEdit = () => {
    updateToDoListArray((previousArray) =>
      previousArray.map((item, index) => {
        return index === ID ? { ...item, text: text } : item;
      })
    );
    updateShowEditModal({ show: false, index: -1 });
  };
  
  return (
    <section className="fixed top-0 left-0 bottom-0 right-0 bg-indigo-950">
      <fieldset
        className="border-2 border-sky-200 rounded-md p-4 min-w-[90%]
        absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <legend className="px-2 font-sans italic text-sky-200 md:text-xl">
          What's your plan for today?
        </legend>
        <section
          className="flex flex-col md:flex-row justify-center items-stretch gap-4"
        >
          <input
            type="text"
            name="edited-task"
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
            onClick={handleTaskEdit}
            className="w-full md:w-auto p-2 rounded-md
          bg-emerald-200 text-emerald-900 font-bold font-sans md:text-2xl"
          >
            Edit Task
          </button>
          <button
            onClick={() => updateShowEditModal({ show: false, index: -1 })}
            className="w-full md:w-auto p-2 rounded-md
          bg-rose-200 text-rose-900 font-bold font-sans md:text-2xl"
          >
            Cancel
          </button>
        </section>
      </fieldset>
    </section>
  );
}

export { EditModal };
