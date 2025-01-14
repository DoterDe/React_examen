import React from "react";
import { List, Button } from "antd";

function TaskList({ tasks, deleteTask, editTask }) {
  return (
    <List
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          key={task.id}
          actions={[
            <Button onClick={() => editTask(task.id)}>Редактировать</Button>,
            <Button onClick={() => deleteTask(task.id)} danger>
              Удалить
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={task.title}
            description={`Дата: ${task.date}, Приоритет: ${task.priority}`}
          />
          <div>Теги: {task.tags}</div>
          <div>Описание: {task.description}</div>
        </List.Item>
      )}
    />
  );
}

export default TaskList;
