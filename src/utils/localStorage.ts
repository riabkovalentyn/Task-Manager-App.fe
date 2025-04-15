import { Task } from '../types/Task';

export const loadTasks = (): Task[] => {
    const data = localStorage.getItem('tasks');
    return data ? JSON.parse(data) : [];
}


export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
