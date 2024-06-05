import { TItem } from './types';
import { GripVertical } from 'lucide-react';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { HTMLAttributes, useEffect, useRef, useState } from 'react';
import invariant from 'tiny-invariant';
import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import { createPortal } from 'react-dom';

type ItemState =
  | {
      type: 'idle';
    }
  | {
      type: 'preview';
      container: HTMLElement;
    }
  | {
      type: 'is-dragging';
    }
  | {
      type: 'is-dragging-over';
      closestEdge: Edge | null;
    };

const stateStyles: { [Key in ItemState['type']]?: HTMLAttributes<HTMLDivElement>['className'] } = {
  'is-dragging': 'opacity-40',
};

export function Item({ item }: { item: TItem }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<ItemState>({ type: 'idle' });

  useEffect(() => {
    const element = ref.current;
    invariant(element);
    return combine(
      draggable({
        element,
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: '16px',
              y: '8px',
            }),
            render({ container }) {
              setState({ type: 'preview', container });
            },
          });
        },
        onDragStart: () => setState({ type: 'is-dragging' }),
        onDrop: () => setState({ type: 'idle' }),
      }),
      dropTargetForElements({
        element,
      }),
    );
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`flex flex-row items-center border border-solid rounded p-2 pl-0 hover:bg-slate-100 hover:cursor-grab ${stateStyles[state.type] ?? ''}`}
      >
        <div className="w-6 flex justify-center">
          <GripVertical size={10} />
        </div>
        <span>Item: ({item.id})</span>
      </div>
      {state.type === 'preview' ? createPortal(<DragPreview item={item} />, state.container) : null}
    </>
  );
}

function DragPreview({ item }: { item: TItem }) {
  return <div className="border-solid rounded p-2 bg-white">Item: ({item.id})</div>;
}
