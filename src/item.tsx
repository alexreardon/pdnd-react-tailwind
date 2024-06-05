import { TItem } from './types';
import { GripVertical } from 'lucide-react';

export function Item({ item }: { item: TItem }) {
  return (
    <div className="flex flex-row items-center border border-solid rounded p-2 pl-0 hover:bg-slate-100 hover:cursor-grab">
      <div className="w-6 flex justify-center">
        <GripVertical size={10} />
      </div>
      <span>Item: ({item.id})</span>
    </div>
  );
}
