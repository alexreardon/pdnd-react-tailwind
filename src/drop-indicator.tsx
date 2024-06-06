import { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/dist/types/types';
import { CSSProperties, HTMLProps } from 'react';

const edgeStyles: Record<Edge, HTMLProps<HTMLElement>['className']> = {
  top: 'h-[--line-thickness] top-[--line-offset] right-0 left-0',
  right: 'w-[--line-thickness] top-0 right-[--line-offset] bottom-0',
  bottom: 'h-[--line-thickness] right-0 bottom-[--line-offset] left-0',
  left: 'w-[--line-thickness] top-0 bottom-0 left-[--line-offset]',
};

const strokeSize = '2px';

export function DropIndicator({ edge, gap }: { edge: Edge; gap: string }) {
  const lineOffset = `calc(-0.5 * (${gap} + ${strokeSize}))`;
  console.log('rendering drop indicator', { edge, gap, lineOffset });

  return (
    <div
      style={
        {
          '--line-thickness': strokeSize,
          '--line-offset': lineOffset,
        } as CSSProperties
      }
      className={`absolute z-10 bg-blue-600 pointer-events-none ${edgeStyles[edge]}`}
    ></div>
  );
}
