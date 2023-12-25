import { useState } from "react";
import { PenSquare, Trash2 } from "lucide-react";
import axios from "axios";

const TaskItem = ({ todo, index, toggleDeleteModal }: any) => {
  const priorityClassName =
    todo.priority === "high"
      ? "text-red-500 font-medium"
      : todo.priority === "medium"
      ? "text-orange-400 font-medium"
      : "text-green-400 font-medium";
  const [taskStatus, setTaskStatus] = useState(todo.status);

  const handleStatusChange = () => {
    const statusOrder = ["Progress", "Done", "To do"];
    const currentIndex = statusOrder.indexOf(taskStatus);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];

    axios
      .put(`http://localhost:8080/update-progress/${todo._id}`, {
        progress: newStatus,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));

    setTaskStatus(newStatus);
  };

  return (
    <>
      <div
        key={index}
        className="relative grid grid-cols-5 items-center gap-6 p-6 bg-white rounded-2xl w-[780px]"
      >
        <div className="col-span-1 max-w-44">
          <div className="text-gray-400 font-medium">Task</div>
          <div>{todo.text}</div>
        </div>
        <div className="col-span-1 flex flex-col justify-start">
          <div className="text-gray-400 font-medium">Priority</div>
          <div className={priorityClassName}>{todo.priority}</div>
        </div>
        <button
          className="rounded-lg bg-gray-300 w-fit px-4 py-1 text-sm"
          onClick={handleStatusChange}
        >
          {taskStatus}
        </button>
        <div className="col-span-1">circle</div>
        <div className="col-span-1 flex gap-3">
          <PenSquare className="cursor-pointer" />
          <Trash2
            onClick={toggleDeleteModal}
            className="text-red-500 cursor-pointer"
          />
        </div>
      </div>
    </>
  );
};

export default TaskItem;
