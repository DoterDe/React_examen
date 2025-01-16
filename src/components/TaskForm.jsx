import React, { useState, useEffect } from "react";
import { Input, Button, Select, DatePicker } from "antd";
import moment from "moment";

function TaskForm({ addTask, updateTask, taskToEdit }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    date: null,
    tags: "",
    priority: "",
  });

  const { TextArea } = Input;
  const { Option } = Select;

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description,
        date: moment(taskToEdit.date),
        tags: taskToEdit.tags,
        priority: taskToEdit.priority,
      });
    }
  }, [taskToEdit]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() === "") return;

    if (taskToEdit) {
      updateTask(task);
    } else {
      addTask({ ...task, id: Date.now() });
    }

    setTask({
      title: "",
      description: "",
      date: null,
      tags: "",
      priority: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          placeholder="Название задачи"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
      </div>
      <div>
        <DatePicker
          placeholder="Дата и время"
          value={task.date}
          onChange={(date) => setTask({ ...task, date })}
          showTime
        />
      </div>
      <div>
        <TextArea
          placeholder="Описание"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Теги"
          value={task.tags}
          onChange={(e) => setTask({ ...task, tags: e.target.value })}
        />
      </div>
      <div>
        <Select
          placeholder="Приоритет"
          value={task.priority}
          onChange={(value) => setTask({ ...task, priority: value })}
          style={{ width: "100%" }}
        >
          <Option value="low">Низкий</Option>
          <Option value="medium">Средний</Option>
          <Option value="high">Высокий</Option>
        </Select>
      </div>
      <div>
        <Button type="primary" htmlType="submit">
          {taskToEdit ? "Сохранить изменения" : "Добавить задачу"}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;
