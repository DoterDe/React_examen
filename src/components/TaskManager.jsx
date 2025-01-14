import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Input, Row, Col, Select, DatePicker } from "antd";
import moment from "moment";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [searchTag, setSearchTag] = useState(""); 
  const [priorityFilter, setPriorityFilter] = useState(""); 
  const [dateFilter, setDateFilter] = useState(null); 
  const [taskToEdit, setTaskToEdit] = useState(null); 

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now() }]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setTaskToEdit(task); 
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setTaskToEdit(null); 
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesTag = task.tags.toLowerCase().includes(searchTag.toLowerCase());
    const matchesPriority = priorityFilter
      ? task.priority.toLowerCase() === priorityFilter.toLowerCase()
      : true;
    const matchesDate = dateFilter
      ? new Date(task.date).toLocaleDateString() === dateFilter.format("MM/DD/YYYY")
      : true;

    return matchesTag && matchesPriority && matchesDate;
  });

  return (
    <div>
      <h1 className="form-title">{taskToEdit ? "Редактировать задачу" : "Добавить задачу"}</h1>  
      
      <TaskForm 
        addTask={addTask} 
        updateTask={updateTask} 
        taskToEdit={taskToEdit} 
      />
      
      <Row gutter={16} style={{ marginBottom: 20 }} align="middle">
        <Col span={8}>
          <Input
            placeholder="Поиск по тегам"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
          />
        </Col>
        <Col span={8}>
          <Select
            placeholder="Приоритет"
            value={priorityFilter}
            onChange={(value) => setPriorityFilter(value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="">Все</Select.Option>
            <Select.Option value="low">Низкий</Select.Option>
            <Select.Option value="medium">Средний</Select.Option>
            <Select.Option value="high">Высокий</Select.Option>
          </Select>
        </Col>
        <Col span={8}>
          <DatePicker
            placeholder="Фильтр по дате"
            value={dateFilter}
            onChange={(date) => setDateFilter(date)}
            style={{ width: "100%" }}
          />
        </Col>
      </Row>

      <TaskList
        tasks={filteredTasks} 
        deleteTask={deleteTask}
        editTask={editTask} 
      />
    </div>
  );
}

export default TaskManager;


