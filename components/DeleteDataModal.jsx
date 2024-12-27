import "../src/tailwind.css";

// This Modal will be displayed when the user clicks on "Delete All" button
// This Modal asks for a confirmation before deletion
// All the data from the Local Storage will be deleted permanently
// updateShowDeleteDataModal -> State Setter Function to change the Boolean State Variable
function DeleteDataModal({ updateShowDeleteDataModal }) {
  return (
    <section className="fixed top-0 left-0 bottom-0 right-0 bg-transparent backdrop-blur-md">
      <div
        className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        p-4 min-w-[90%] md:min-w-[40%] border-none rounded-lg bg-rose-300"
      >
        <p className="mb-2 text-center text-2xl font-medium font-sans text-neutral-800">
          <span className="font-bold text-red-800">Warning!!</span> <br />
          You will lose all the stored data and the application will load again!
          <br />
          <br />
          Do you really want to delete?
        </p>
        <div className="mt-4 flex flex-row items-center justify-between">
          <button
            onClick={() => {
              window.localStorage.removeItem("to-do-list-data");
              window.location.reload();
            }}
            className="px-4 py-1 border-none outline-0 rounded-md 
            bg-red-600 text-white text-lg font-bold"
          >
            Delete
          </button>
          <button
            onClick={() => updateShowDeleteDataModal(false)}
            className="px-4 py-1 border-none outline-0 rounded-md 
            bg-emerald-600 text-white text-lg font-bold"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export { DeleteDataModal };
