import { useEffect, useState } from 'react';
import { type TItem } from './item-data';
import { Item } from './item';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { isItemData } from './item-data';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';

function getItems(): TItem[] {
  return Array.from({ length: 10 }, (_, index) => ({ id: `id:${index}` }));
}

export function List() {
  const [items, setItems] = useState<TItem[]>(() => getItems());

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return isItemData(source.data);
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;

        if (!isItemData(sourceData) || !isItemData(targetData)) {
          return;
        }

        const indexOfSource = items.findIndex((item) => item.id === sourceData.itemId);
        const indexOfTarget = items.findIndex((item) => item.id === targetData.itemId);

        if (indexOfTarget < 0 || indexOfSource < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        setItems(
          reorderWithEdge({
            list: items,
            startIndex: indexOfSource,
            indexOfTarget,
            closestEdgeOfTarget,
            axis: 'vertical',
          }),
        );
      },
    });
  }, [items]);

  return (
    <div className="pt-6 my-0 mx-auto w-[300px]">
      <div className="flex flex-col gap-2 border border-solid rounded p-2">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
