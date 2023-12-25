import React from "react";
import TaskItem from "./TaskItem";

interface Todo {
  id: number;
  text: string;
  priority: string;
  status: "To Do" | "In Progress" | "Done";
}

interface TaskListProps {
  toggleDelete: () => void;
  todos: Todo[]; // Specify the type of 'todos' as an array of Todo
}

const TasksList: React.FC<TaskListProps> = ({ toggleDelete, todos }) => {
  return (
    <div className="space-y-10">
      {todos?.map((todo, index) => (
        <TaskItem key={index} todo={todo} toggleDelete={toggleDelete} />
      ))}
    </div>
  );
};

export default TasksList;
