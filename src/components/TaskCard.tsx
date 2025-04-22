import React from 'react';
import { Task } from '../types/Task';
import { Card, Button } from '../ui/TaskCard/styles';

interface Props {
    task: Task;
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
  }
  
  export const TaskCard: React.FC<Props> = ({ task, onDelete, onEdit }) => {
    return (
      <Card>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>Status: {task.status}</p>
        <p>Priority: {task.priority}</p>
        <p>Due: {task.dueDate || '—'}</p>
        <Button onClick={() => onEdit(task)}>Edit</Button>
        <Button onClick={() => onDelete(Number(task.id))}>Delete</Button>
      </Card>
    );
  };
  
 