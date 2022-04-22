import React, { useRef } from 'react';
import { ColumnContainer, ColumnTitle } from '../styles';
import { AddNewItem } from './AddNewItem';
import { useAppState } from '../contexts/AppStateContext';
import { Card } from '../components/Card';
import { useItemDrag } from '../hooks/useItemDrag';
import { DragItem } from '../utils/dragItem';
import { useDrop } from 'react-dnd';
import { isHidden } from '../utils/isHidden';

interface ColumnProps {
  text: string;
  index: number;
  id: string;
}

export const Column = ({ text, index, id }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useItemDrag({
    index,
    id,
    text,
    type: 'COLUMN',
  });
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } });
      item.index = hoverIndex;
    },
  });
  drag(drop(ref));

  return (
    <ColumnContainer
      ref={ref}
      isHidden={isHidden(state.draggedItem, 'COLUMN', id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task) => (
        <Card text={task.text} key={task.id} />
      ))}
      <AddNewItem
        onAdd={(text) =>
          dispatch({ type: 'ADD_TASK', payload: { text, taskId: id } })
        }
        toggleButtonText='+ Add another task'
        dark
      />
    </ColumnContainer>
  );
};
