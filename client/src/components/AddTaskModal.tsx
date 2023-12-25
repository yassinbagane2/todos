import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface AddModalInterface {
  toggleModal: () => void;
  addTodo?: any;
  editTodo?: any;
  editMode?: boolean;
  taskToEdit?: any;
}

export const AddTaskModal = ({
  toggleModal,
  addTodo,
  editMode,
}: AddModalInterface) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [isValidated, setIsValidated] = useState<boolean>(false);

  useEffect(() => {
    setIsValidated(task.length > 2 && priority !== "");
  }, [task, priority]);

  async function addTodoHandler() {
    try {
      if (task.length > 3 && priority) {
        const res = await axios.post("http://localhost:8080/add-todo", {
          text: task,
          priority,
        });
        console.log(res.data);
        addTodo(res.data);
        toggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-black/40 absolute inset-0 w-screen h-screen flex justify-center items-center z-20">
      <div className="bg-white text-black shadow-md rounded-2xl min-w-[590px] px-8 py-5">
        <div className="flex items-center justify-between cursor-pointer">
          <h2 className="font-bold text-2xl">
            {editMode ? "Edit task" : "Add task"}
          </h2>
          <X onClick={toggleModal} />
        </div>
        <div className="flex flex-col mt-8">
          <label className="text-slate-600 font-semibold">Task</label>
          <input
            type="text"
            className="border border-gray-400 rounded-lg py-2 px-4 mt-2"
            name="task"
            value={task}
            onChange={e => setTask(e.target.value)}
            placeholder="Type your task here..."
          />
        </div>
        <div className="flex flex-col mt-8">
          <label className="text-slate-600 font-semibold mb-1">Priority</label>
          <div className="flex gap-3">
            <button
              onClick={() => setPriority("high")}
              className={
                priority === "high"
                  ? "border border-red-600 bg-red-600 px-8 rounded-md py-1 text-white  hover:text-white"
                  : "border border-red-600 px-8 rounded-md py-1 text-red-600"
              }
            >
              High
            </button>
            <button
              onClick={() => setPriority("medium")}
              className={
                priority === "medium"
                  ? "border border-orange-400 bg-orange-400 px-8 rounded-md py-1 text-white  hover:text-white"
                  : "border border-orange-400 px-8 rounded-md py-1 text-orange-400"
              }
            >
              Medium
            </button>
            <button
              onClick={() => setPriority("low")}
              className={
                priority === "low"
                  ? "border border-green-400 bg-green-400 px-8 rounded-md py-1 text-white  hover:text-white"
                  : "border border-green-400 px-8 rounded-md py-1 text-green-400"
              }
            >
              Low
            </button>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            onClick={addTodoHandler}
            disabled={!isValidated}
            className="border rounded-lg disabled:cursor-not-allowed disabled:bg-gray-500 py-2 px-4 text-white bg-slate-700 33"
          >
            {editMode ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};
