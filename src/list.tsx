import { useState } from 'react';
import { TItem } from './types';
import { Item } from './item';

function getItems(): TItem[] {
  return Array.from({ length: 10 }, (_, index) => ({ id: `id:${index}` }));
}

export function List() {
  const [items] = useState<TItem[]>(() => getItems());

  return (
    <h1 className="flex flex-col gap-2 border border-solid rounded p-2 w-[300px] my-0 mx-auto">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </h1>
  );
}
