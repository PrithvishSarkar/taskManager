import "../src/tailwind.css";

function Footer() {
  return (
    <div
      className="min-w-full border-t border-t-rose-500 bg-rose-200 text-black text-sm 
      font-semibold flex flex-row items-center justify-center gap-2 p-1"
    >
      Made with <span className="text-red-500">&#x2764;</span> by Prithvish
      Sarkar
    </div>
  );
}

export { Footer };
