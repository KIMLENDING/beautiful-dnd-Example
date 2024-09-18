// 다른 배열로 이동시 복사되는 모드
"use client";
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Plus, Trash2 } from 'lucide-react';

export type TItemStatus = 'todo' | 'doing';

export type TItem = {
    id: string;
    status: TItemStatus;
    title: string;
    inputText: string;
};

export type TItems = {
    [key in TItemStatus]: TItem[];
};

export default function TodoLibraryExample2({
    items,
    setItems,
    onInputChange,
    onAddItem,
    onDeleteItem,
}: {
    items: TItems;
    setItems: (items: TItems) => void;
    onInputChange: (id: string, value: string, type: string) => void;
    onAddItem: (status: TItemStatus) => void;
    onDeleteItem: (id: string) => void;
}) {
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;

        const sourceKey = source.droppableId as TItemStatus;
        const destinationKey = destination.droppableId as TItemStatus;

        const _items = JSON.parse(JSON.stringify(items)) as typeof items;

        if (sourceKey === destinationKey) {
            // 같은 리스트 내에서 이동
            const [reorderedItem] = _items[sourceKey].splice(source.index, 1);
            _items[destinationKey].splice(destination.index, 0, reorderedItem);
        } else if (sourceKey === 'todo' && destinationKey === 'doing') {
            // todo에서 doing으로 이동 (복사)
            const [copiedItem] = _items[sourceKey].slice(source.index, source.index + 1);
            const newItem: TItem = {
                ...copiedItem,
                id: Date.now().toString(),
                status: 'doing'
            };
            _items[destinationKey].splice(destination.index, 0, newItem);
        } else {
            // doing에서 todo로 이동 (일반 이동)
            const [movedItem] = _items[sourceKey].splice(source.index, 1);
            movedItem.status = destinationKey;
            _items[destinationKey].splice(destination.index, 0, movedItem);
        }

        setItems(_items);
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
        <div className="p-4">
            <div className="mb-2">
                <h1 className="text-3xl font-bold">react-beautiful-dnd</h1>
                <span>with react library</span>
            </div>

            <div className="mt-4 flex">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="grid flex-1 select-none grid-cols-2 gap-4 rounded-lg">
                        {Object.keys(items).map((key) => (
                            <Droppable key={key} droppableId={key}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={cn(
                                            'flex flex-col gap-3 rounded-xl bg-gray-200 p-4 ring-1 ring-gray-300 transition-shadow dark:bg-[#000000]',
                                            snapshot.isDraggingOver ? 'shadow-lg' : 'shadow',
                                        )}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs font-semibold">{key.toLocaleUpperCase()}</span>
                                            <button
                                                onClick={() => onAddItem(key as TItemStatus)}
                                                className="p-1 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        {items[key as TItemStatus].map((item: TItem, index: number) => (
                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={cn(
                                                            'rounded-lg bg-white p-4 transition-shadow dark:bg-[#121212]',
                                                            snapshot.isDragging
                                                                ? 'bg-opacity-90 shadow-2xl shadow-gray-400'
                                                                : 'shadow',
                                                        )}
                                                    >
                                                        <div className="flex justify-between items-center mb-2">
                                                            <h5 className="font-semibold">
                                                                <input
                                                                    type="text"
                                                                    className=' w-full mt-2 p-1 rounded bg-transparent'
                                                                    value={item.title}
                                                                    onChange={(e) => onInputChange(item.id, e.target.value, 'title')}
                                                                />
                                                            </h5>
                                                            <button
                                                                onClick={() => onDeleteItem(item.id)}
                                                                className="p-1 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <span className="text-sm text-gray-500">Make the world beautiful</span>
                                                        <input
                                                            type="text"
                                                            className=' w-full mt-2 p-1 rounded bg-transparent'
                                                            value={item.inputText}
                                                            onChange={(e) => onInputChange(item.id, e.target.value, 'inputText')}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        </div>
    );
}