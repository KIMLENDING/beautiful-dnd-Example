// 이게 기본 드래그앤드롭 예제 코드
"use client";
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

export default function App() {

  // --- Mock 데이터


  const [items, setItems] = useState([...Array(4)].map((_, i) => ({ id: `${i}${i}${i}`, content: `item-${i}` })));
  // --- Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    console.log('>>> source', source); // 선택된 아이템
    console.log('>>> destination', destination); // 드롭된 위치
    const _items = [...items];
    const [targetItem] = _items.splice(source.index, 1); // 선택된 아이템
    _items.splice(destination.index, 0, targetItem); // 드롭된 위치에 아이템 추가
    setItems(_items); // 업데이트

  };

  // --- requestAnimationFrame 초기화
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }
  // --- requestAnimationFrame 초기화 END

  return (
    <div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className='rounded-full'>
        <input type="color" className='rounded-full border-none ring-0' />
      </div>
    </div>
  );
}
