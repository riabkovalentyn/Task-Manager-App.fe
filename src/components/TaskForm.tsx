import React, { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus } from '../types/Task';
import { Form, Input, Select, Button, Error } from '../ui/TaskForm/styles';

interface Props {
  onSubmit: (task: Task) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
}

export const TaskForm: React.FC<Props> = ({ onSubmit, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState<{ title?: string; dueDate?: string }>({});

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate instanceof Date ? editingTask.dueDate.toISOString().split('T')[0] : editingTask.dueDate || '');
    }
  }, [editingTask]);

  const validate = () => {
    const newErrors: { title?: string; dueDate?: string } = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (dueDate && isNaN(Date.parse(dueDate))) newErrors.dueDate = 'Invalid date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const task: Task = {
        id: editingTask?.id || Date.now().toString(),
        title,
        description,
        priority,
        status,
        dueDate: dueDate ? new Date(dueDate) : null,
        createdAt: editingTask?.createdAt instanceof Date ? editingTask.createdAt : new Date(editingTask?.createdAt || new Date().toISOString()),
        updatedAt: undefined
    };
    onSubmit(task);
    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('todo');
    setDueDate('');
    setErrors({});
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <div>
        <Input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          aria-label="Title"
        />
        {errors.title && <Error role="alert">{errors.title}</Error>}
      </div>
      <Input
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        aria-label="Description"
      />
      <Select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} aria-label="Priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <Select value={status} onChange={e => setStatus(e.target.value as TaskStatus)} aria-label="Status">
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </Select>
      <div>
        <Input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          aria-label="Due Date"
        />
        {errors.dueDate && <Error role="alert">{errors.dueDate}</Error>}
      </div>
      <Button type="submit">{editingTask ? 'Update' : 'Add'} Task</Button>
      {editingTask && onCancelEdit && (
        <Button type="button" onClick={onCancelEdit} aria-label="Cancel Edit">
          Cancel
        </Button>
      )}
    </Form>
  );
};
