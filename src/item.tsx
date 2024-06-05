import { TItem } from './types';

export function Item({ item }: { item: TItem }) {
  return (
    <div className="border border-solid rounded p-2 hover:bg-slate-100 hover:cursor-grab">
      Item: {item.id}
    </div>
  );
}
