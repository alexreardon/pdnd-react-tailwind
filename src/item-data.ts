export type TItem = { id: string; content: string };

const itemDataKey = Symbol('item');

export type TItemData = { [itemDataKey]: true; itemId: TItem['id'] };

export function getItemData(item: TItem): TItemData {
  return { [itemDataKey]: true, itemId: item.id };
}

export function isItemData(data: Record<string | symbol, unknown>): data is TItemData {
  return data[itemDataKey] === true;
}

// type TTask = {
//   id: string;
//   content: string;
// };

const tasks: TItem[] = [
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
