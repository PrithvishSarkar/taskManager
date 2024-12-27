import "../src/tailwind.css";
import { useState, useEffect } from "react";
import { ToDoInput } from "./ToDoInput.jsx";
import { ToDoList } from "./ToDoList.jsx";
import { AlertModal } from "./AlertModal.jsx";
import { EditModal } from "./EditModal.jsx";
import { DeleteDataModal } from "./DeleteDataModal.jsx";
import { Footer } from "./Footer.jsx";

// This component contains all the Components and Modals
function MainComponent() {
  // This State Variable shows or hides the Edit Modal along with the index
  // The 'index' is required to uniquely identify the task to be edited
  const [showEditModal, setShowEditModal] = useState({
    show: false,
    index: -1,
  });

  // This State Variable shows or hides the Alert Modal
  // The Alert Modal is displayed to warn the user against empty task input
  const [showAlertModal, setShowAlertModal] = useState(false);

  // This State Variable shows or hides the Delete Data Modal
  // The Delete Date Modal is invoked when the user clicks on 'DeleteAll' button
  // After confirmation, all the Local Storage data related to this App is deleted
  const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);

  // This is a Temporary Array containing dummy To-Do Data
  // On the initial render, this data will be displayed as an example
  const tempArray = [
    {
      text: "Complete Mathematics homework by EOD",
      done: false,
      time: new Date().toLocaleTimeString(),
      date: new Date().toDateString(),
    },
    {
      text: "Evening Walk for 3 kilometers",
      done: false,
      time: new Date().toLocaleTimeString(),
      date: new Date().toDateString(),
    },
    {
      text: "Fix all the bugs in the new ReactJS Application",
      done: false,
      time: new Date().toLocaleTimeString(),
      date: new Date().toDateString(),
    },
  ];

  // This is the Array containing the information about user's tasks
  // It is the same as 'tempArray' during initial render
  // It fetches data from Local Storage to protect the data even after refresh or unmounting
  const [toDoListArray, setToDoListArray] = useState(() => {
    const localStorageData = window.localStorage.getItem("to-do-list-data");
    return localStorageData ? JSON.parse(localStorageData) : tempArray;
  });

  // A Side Effect runs to update Local Storage data
  // This Side Effect runs whenever the 'toDoListArray' is updated
  useEffect(() => {
    window.localStorage.setItem(
      "to-do-list-data",
      JSON.stringify(toDoListArray)
    );
  }, [toDoListArray]);

  return (
    <section
      className="min-w-full min-h-[100vh]
    flex flex-col items-center justify-between bg-neutral-200"
    >
      {showAlertModal && <AlertModal />}
      {showEditModal.show && (
        <EditModal
          updateShowEditModal={setShowEditModal}
          updateToDoListArray={setToDoListArray}
          ID={showEditModal.index}
        />
      )}
      {showDeleteDataModal && (
        <DeleteDataModal updateShowDeleteDataModal={setShowDeleteDataModal} />
      )}
      <div
        data-type="container"
        className="w-[90%] my-4 p-2 border-none rounded-md bg-indigo-950"
      >
        <ToDoInput
          updateShowAlertModal={setShowAlertModal}
          updateShowDeleteDataModal={setShowDeleteDataModal}
          updateToDoListArray={setToDoListArray}
        />
        <ToDoList
          toDoListArray={toDoListArray}
          updateToDoListArray={setToDoListArray}
          updateShowEditModal={setShowEditModal}
        />
      </div>
      <Footer />
    </section>
  );
}

export { MainComponent };
