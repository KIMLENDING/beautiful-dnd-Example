"use client";
import { cn } from '@/utils/utils';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Check, Plus, Trash2 } from 'lucide-react';

export type TItemStatus = 'todo' | 'doing' | 'moning';

export type TItem = {
    id: string;
    status: TItemStatus;
    title: string;
    inputText: string;
};

export type TItems = {
    [key in TItemStatus]: TItem[];
};

export default function TodoLibraryExample({
    items,
    isAddItem,
    newItemTitle,
    newItemText,
    selectedStatus,
    setNewItemTitle,
    setNewItemText,
    setItems,
    onCancelAddItem,
    onInputChange,
    onAddItem,
    onDeleteItem,
    onHandleConfirmAddItem,
}: {
    items: TItems; // 아이템 리스트
    isAddItem: boolean; // 추가 모드인지 여부
    newItemTitle: string; // 새 항목 제목
    newItemText: string; // 새 항목 내용
    selectedStatus: TItemStatus; // 선택된 상태
    setNewItemTitle: (title: string) => void; // 새 항목 제목 업데이트
    setNewItemText: (text: string) => void; // 새 항목 내용 업데이트
    setItems: (items: TItems) => void;  // 아이템 업데이트
    onCancelAddItem: () => void;  // 추가 모드 취소
    onInputChange: (id: string, value: string, type: string) => void;
    onAddItem: (type: TItemStatus) => void;
    onDeleteItem: (id: string) => void;
    onHandleConfirmAddItem: () => void;
}) {
    const [columnsOrder, setColumnsOrder] = useState<TItemStatus[]>(['todo', 'doing', 'moning']);

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;

        // If we're dragging columns (parent containers)
        if (source.droppableId === 'columns') {
            const newOrder = Array.from(columnsOrder);
            const [movedColumn] = newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, movedColumn);
            setColumnsOrder(newOrder);
            return;
        }

        // If we're dragging items within or between columns
        const sourceKey = source.droppableId as TItemStatus;
        const destinationKey = destination.droppableId as TItemStatus;

        const _items = JSON.parse(JSON.stringify(items)) as typeof items;
        const [targetItem] = _items[sourceKey].splice(source.index, 1);

        _items[destinationKey].splice(destination.index, 0, targetItem);
        setItems(_items);
    };

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
    console.log(selectedStatus)

    return (
        <div className="p-4">
            <div className="mb-2">
                <h1 className="text-3xl font-bold">react-beautiful-dnd</h1>
                <span>부모 컴포넌트 dnd 가능</span>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
                    {(provided) => (
                        <div
                            className="flex gap-4"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {columnsOrder.map((statusKey, index) => (
                                <Draggable key={statusKey} draggableId={statusKey} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex-1"
                                        >
                                            <Droppable droppableId={statusKey}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        className={cn(
                                                            'flex flex-col gap-3 rounded-xl bg-gray-200 p-4 ring-1 ring-gray-300 transition-shadow dark:bg-[#000000]',
                                                            snapshot.isDraggingOver ? 'shadow-lg' : 'shadow',
                                                            'h-fit '
                                                        )}
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs font-semibold">
                                                                {statusKey.toUpperCase()}
                                                            </span>
                                                        </div>
                                                        {items[statusKey as TItemStatus].map((item: TItem, index: number) => (
                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={cn(
                                                                            'rounded-lg bg-white p-4 transition-shadow dark:bg-[#121212] group',
                                                                            snapshot.isDragging
                                                                                ? 'bg-opacity-90 shadow-2xl shadow-gray-400'
                                                                                : 'shadow',
                                                                        )}
                                                                    >
                                                                        <div className="flex justify-between items-center mb-2">
                                                                            <h5 className="font-semibold">{item.title}</h5>
                                                                            <button
                                                                                onClick={() => onDeleteItem(item.id)}
                                                                                className="p-1 rounded-full text-red-500 hover:bg-red-100  duration-200 transition-all opacity-0 group-hover:opacity-100 "
                                                                            >
                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                        </div>
                                                                        <span className="text-sm text-gray-500">Make the world beautiful</span>
                                                                        <input
                                                                            type="text"
                                                                            className='w-full mt-2 outline-none rounded p-1 bg-transparent border-b-2 '
                                                                            value={item.inputText}
                                                                            onChange={(e) => onInputChange(item.id, e.target.value, 'inputText')}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
                                                        {isAddItem ? (<>
                                                            {selectedStatus === statusKey ? (<>
                                                                <div className='rounded-lg bg-white p-4 transition-shadow dark:bg-[#121212] border-2 border-white'>
                                                                    <div className="flex justify-between items-center mb-2">
                                                                        <input
                                                                            type="text"
                                                                            placeholder="새 항목 제목"
                                                                            value={newItemTitle}
                                                                            onChange={(e) => setNewItemTitle(e.target.value)}
                                                                            className="p-2  rounded  bg-transparent outline-none border-b-2"
                                                                        />
                                                                        <div className='flex gap-2'>

                                                                            <button
                                                                                onClick={() => onCancelAddItem()}
                                                                                className="p-1 rounded-full text-red-500 hover:bg-red-100 transition-colors"
                                                                            >

                                                                                <Trash2 size={16} />
                                                                            </button>
                                                                            <button
                                                                                onClick={onHandleConfirmAddItem}
                                                                                className="p-1 rounded-full text-blue-500 hover:bg-blue-100 transition-colors"
                                                                            >
                                                                                <Check size={16} />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <span className="text-sm p-2 text-gray-500">Make the world beautiful</span>
                                                                    <input
                                                                        type="text"
                                                                        className=' w-full mt-2 outline-none rounded p-2 bg-transparent border-b-2 '
                                                                        placeholder="내용"
                                                                        value={newItemText}
                                                                        onChange={(e) => setNewItemText(e.target.value)}
                                                                    />
                                                                </div>
                                                            </>) : (<>
                                                                <div className='flex justify-center items-center'>
                                                                    <button
                                                                        onClick={() => onAddItem(statusKey as TItemStatus)}
                                                                        className=" w-fit p-1 rounded-full border-white/25 border-2 text-white hover:bg-white/40 hover:text-black hover:border-black transition-colors"
                                                                    >
                                                                        <Plus size={48} className='' />
                                                                    </button>
                                                                </div>
                                                            </>)}

                                                        </>) : (<>

                                                            <div className='flex justify-center items-center'>
                                                                <button
                                                                    onClick={() => onAddItem(statusKey as TItemStatus)}
                                                                    className=" w-fit p-1 rounded-full border-white/25 border-2 text-white hover:bg-white/40 hover:text-black hover:border-black transition-colors"
                                                                >
                                                                    <Plus size={48} className='' />
                                                                </button>
                                                            </div>
                                                        </>)

                                                        }

                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
