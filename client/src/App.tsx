import { useEffect, useState } from "react";
import { AddTaskModal } from "./components/AddTaskModal";
import Topbar from "./components/Topbar";
import TaskItem from "./components/TaskItem";
import DeleteModal from "./components/DeleteModal";
import axios from "axios";

interface Todo {
  _id: string;
  text: string;
  priority: string;
  status: "To Do" | "In progress" | "Done";
}

function App() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [todoToDeleteId, setTodoToDeleteId] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/todos")
      .then(res => {
        setTodos(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const toggleAddModal = () => {
    setIsAddModalOpen(prev => !prev);
  };

  const toggleDeleteModal = (id: string) => {
    console.log(id);
    setIsDeleteModalOpen(prev => !prev);
    setTodoToDeleteId(id);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const deleteTodoHandler = (id: string) => {
    console.log("id ===", id);
    axios
      .delete(`http://localhost:8080/delete-todo/${id}`)
      .then(res => {
        console.log(res.data);
        const updatedTodos = todos.filter(todo => todo._id !== id);
        setTodos(updatedTodos);
        setIsDeleteModalOpen(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="bg-custom-gray h-screen">
      <div className="max-w-screen-md mx-auto">
        <Topbar openModalHandler={toggleAddModal} />

        <div className="flex justify-center">
          {todos.length > 0 ? (
            <div className="space-y-10">
              {todos
                .map((todo, index) => (
                  <TaskItem
                    key={index}
                    todo={todo}
                    toggleDeleteModal={() => toggleDeleteModal(todo._id)}
                  />
                ))
                .reverse()}
            </div>
          ) : (
            "You haven't added any todo yet."
          )}
        </div>
      </div>
      {isAddModalOpen && (
        <AddTaskModal addTodo={addTodo} toggleModal={toggleAddModal} />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          id={todoToDeleteId}
          deleteTodoHandler={deleteTodoHandler}
          toggleModal={toggleDeleteModal}
        />
      )}
    </div>
  );
}

export default App;
