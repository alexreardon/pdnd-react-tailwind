export type TTask = { id: string; content: string };

const taskDataKey = Symbol('task');

export type TTaskData = { [taskDataKey]: true; taskId: TTask['id'] };

export function getTaskData(task: TTask): TTaskData {
  return { [taskDataKey]: true, taskId: task.id };
}

export function isTaskData(data: Record<string | symbol, unknown>): data is TTaskData {
  return data[taskDataKey] === true;
}

// type TTask = {
//   id: string;
//   content: string;
// };

const tasks: TTask[] = [
  { id: 'task-0', content: 'Organize a team-building event' },
  { id: 'task-1', content: 'Create and maintain office inventory' },
  { id: 'task-2', content: 'Update company website content' },
  { id: 'task-3', content: 'Plan and execute marketing campaigns' },
  { id: 'task-4', content: 'Coordinate employee training sessions' },
  { id: 'task-5', content: 'Manage facility maintenance' },
  { id: 'task-6', content: 'Organize customer feedback surveys' },
  { id: 'task-7', content: 'Coordinate travel arrangements' },
];

export function getTasks() {
  return tasks;
}
