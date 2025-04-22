import { Task } from '../types/Task';

const priorityWeight: { [key: string]: number } = {
    high: 3,
    medium: 2,
    low: 1
};

export const sortByDay = (tasks: Task[]) => {
    [...tasks].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
}

export const sortByPriority = (tasks: Task[]) => {
    return [...tasks].sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
};