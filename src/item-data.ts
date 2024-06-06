export type TItem = { id: string };

const itemDataKey = Symbol('item');

export type TItemData = { [itemDataKey]: true; itemId: TItem['id'] };

export function getItemData(item: TItem): TItemData {
  return { [itemDataKey]: true, itemId: item.id };
}

export function isItemData(data: Record<string | symbol, unknown>): data is TItemData {
  return data[itemDataKey] === true;
}
