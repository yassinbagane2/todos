import { Plus } from "lucide-react";

interface Topbar {
  openModalHandler: () => void;
}
const Topbar = ({ openModalHandler }: Topbar) => {
  return (
    <div className="flex justify-between py-20 px-4 text-gray-900">
      <h1 className="font-bold text-4xl tracking-wider">Task list</h1>
      <button
        onClick={openModalHandler}
        className="flex items-center gap-1 bg-custom-purple shadow-sm shadow-purple-700 text-white font-open-sans rounded-lg px-6 py-2"
      >
        <Plus size={16} /> Add task
      </button>
    </div>
  );
};

export default Topbar;
