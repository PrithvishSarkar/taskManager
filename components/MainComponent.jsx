import "../src/tailwind.css";
import { useState, useEffect } from "react";
import { ToDoInput } from "./ToDoInput.jsx";
import { ToDoList } from "./ToDoList.jsx";
import { AlertModal } from "./AlertModal.jsx";
import { EditModal } from "./EditModal.jsx";
import { DeleteDataModal } from "./DeleteDataModal.jsx";
import { Footer } from "./Footer.jsx";

function MainComponent() {
  const [showEditModal, setShowEditModal] = useState({
    show: false,
    index: -1,
  });
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showDeleteDataModal, setShowDeleteDataModal] = useState(false);
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
  const [toDoListArray, setToDoListArray] = useState(() => {
    const localStorageData = window.localStorage.getItem("to-do-list-data");
    return localStorageData ? JSON.parse(localStorageData) : tempArray;
  });
  useEffect(() => {
    window.localStorage.setItem(
      "to-do-list-data",
      JSON.stringify(toDoListArray)
    );
  }, [toDoListArray]);

  const handleAddition = (txt) => {
    if (txt.trim() === "") {
      setTimeout(() => setShowAlertModal(true), 500);
      setTimeout(() => setShowAlertModal(false), 3500);
    } else {
      setToDoListArray((previousArray) => [
        {
          text: txt,
          done: false,
          time: new Date().toLocaleTimeString(),
          date: new Date().toDateString(),
        },
        ...previousArray,
      ]);
    }
  };

  return (
    <section className="min-w-full min-h-[100vh]
    flex flex-col items-center justify-between bg-neutral-200">
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
          onAdd={handleAddition}
          updateShowDeleteDataModal={setShowDeleteDataModal}
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
