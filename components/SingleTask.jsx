import "../src/tailwind.css";

function SingleTask({ toDoItem, onTaskToggle, onDelete, onEdit }) {
  return (
    <section
      className="flex flex-row justify-between items-center
      p-2 mb-2 rounded-md custom-list-background-image"
    >
      <div
        data-type="main-content"
        className="flex flex-row justify-start items-center gap-2 max-w-[70%] md:max-w-[85%]"
      >
        <button
          onClick={onTaskToggle}
          className={`p-1 rounded-md ${
            toDoItem.done ? "bg-emerald-200" : "bg-rose-400"
          }`}
        >
          {toDoItem.done ? "✔" : "❌"}
        </button>
        <span className="flex flex-col justify-center items-start">
          <span
            data-type="todo-task"
            className="text-base md:text-xl text-indigo-950 font-serif font-semibold
            first-letter:capitalize"
          >
            {toDoItem.text}
          </span>
          <span className="text-xs md:text-sm text-indigo-950 font-mono font-semibold">
            {toDoItem.time}
          </span>
          <span className="text-xs md:text-sm text-indigo-950 font-mono font-semibold">
            {toDoItem.date}
          </span>
        </span>
      </div>

      <div data-type="operation-button">
        {/* trashbin -> delete */}
        <button
          onClick={onDelete}
          className="p-1 text-sky-200 text-lg md:text-2xl bg-indigo-950 rounded-md mr-1"
        >
          &#128465;
        </button>

        {/* pen -> edit */}
        <button
          onClick={onEdit}
          className="p-1 text-sky-200 text-lg md:text-2xl bg-indigo-950 rounded-md mr-1"
        >
          &#128393;
        </button>
      </div>
    </section>
  );
}

export { SingleTask };
