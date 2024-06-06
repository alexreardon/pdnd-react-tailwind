import { useEffect, useState } from 'react';
import { getTasks, type TItem } from './item-data';
import { Item } from './item';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { isItemData } from './item-data';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorderWithEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge';
import { triggerPostMoveFlash } from '@atlaskit/pragmatic-drag-and-drop-flourish/trigger-post-move-flash';
import { flushSync } from 'react-dom';

export function List() {
  const [items, setItems] = useState<TItem[]>(() => getTasks());

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

        // Using `flushSync` so we can query the DOM straight after this line
        flushSync(() => {
          setItems(
            reorderWithEdge({
              list: items,
              startIndex: indexOfSource,
              indexOfTarget,
              closestEdgeOfTarget,
              axis: 'vertical',
            }),
          );
        });
        // Being simple and just querying for the item after the drop.
        // We could use react context to register the element in a lookup,
        // and then we could retrieve that element after the drop and use
        // `triggerPostMoveFlash`. But this gets the job done.
        const element = document.querySelector(`[data-item-id="${sourceData.itemId}"]`);
        if (element instanceof HTMLElement) {
          triggerPostMoveFlash(element);
        }
      },
    });
  }, [items]);

  return (
    <div className="pt-6 my-0 mx-auto w-[500px]">
      <div className="flex flex-col gap-2 border border-solid rounded p-2">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
