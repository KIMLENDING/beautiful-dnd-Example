"use client";
import { cn } from '@/utils/utils';
import { Check, Ellipsis, PencilOff, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Todo {
    _id: string;
    index: number; // 순서
    title: string;
    discription: string; // 설명
    completed: boolean;
}
interface MockData {
    _id: string;
    index: number; // 순서
    when: string; // 시간 - 이게 제목임
    discription: string; // 설명
    type: string[]; // 아침, 점심, 저녁 중복 가능 - 기본값 아침
    todo?: Todo[]; // 할일
}
const mockData2: MockData[] = Array.from({ length: 4 }, (_, index) => ({
    _id: `mock-${index}`,
    index: index,
    when: `언제 ${index} - ${['Morning', 'Afternoon', 'Evening'][Math.floor(Math.random() * 3)]}`, // Random time of day
    discription: `Description for Day ${index + 1}`,
    type: ['Morning', 'Afternoon', 'Evening'].filter(() => Math.random() > 0.5) || ['Morning'], // Randomly include times
    todo: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, todoIndex) => ({
        _id: `todo-${index}-${todoIndex}`,
        index: todoIndex,
        title: `Todo ${todoIndex} for Day ${index}`,
        discription: `This is todo number ${todoIndex} for Day ${index}`,
        completed: Math.random() > 0.5 // Randomly mark some as completed
    }))
}));

interface DropDownComponentProps {
    title: string;
    discription: string;
    _id: string;
    setEdit: (value: boolean) => void;
    setTitle: (value: string) => void;
    setDiscription: (value: string) => void;
    setChoiseTodo: (value: string) => void;
    handleDelet: () => void;
}
const DropDownComponent = (props: DropDownComponentProps) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger> <Ellipsis /> </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-[#181818] text-gray-100'>

                <DropdownMenuItem  >
                    <button className='flex flex-row items-center justify-between gap-4 w-full ' onClick={() => { props.setEdit(true); props.setTitle(props.title); props.setDiscription(props.discription); props.setChoiseTodo(props._id) }}>
                        <PencilOff />
                        <div className='flex-1 font-bold pr-1'>수정</div>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button className='flex flex-row items-center justify-between gap-4 w-full' onClick={() => props.handleDelet()}>
                        <Trash2 />
                        <div className='flex-1 font-bold pr-1'>삭제</div>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const Routin = () => {
    const [mockData, setMockData] = useState(mockData2);
    // --- Mock 데이터
    // --- requestAnimationFrame 초기화
    const [enabled, setEnabled] = useState(false);
    const [choiseTodo, setChoiseTodo] = useState('');
    const [edit, setEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [discription, setDiscription] = useState('');
    const onDragEnd = ({ source, destination }: DropResult) => {
        if (!destination) return;

        // const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
        if (source.droppableId === 'columns') {
            if (source.index === mockData[source.index].index) {
                const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
                const [targetItem] = _items.splice(source.index, 1); // 선택된 아이템
                _items.splice(destination.index, 0, targetItem); // 드롭된 위치에 아이템 추가
                for (let i = 0; i < _items.length; i++) {
                    _items[i].index = i; // db에 저장할 때 index를 다시 정렬해줘야함 
                    //db에서 가져올 때 index로 정렬해서 가져오기 위해
                }
                setMockData(_items);//
                return;
            }
        }
        const sourceKey = source.droppableId;
        const destinationKey = destination.droppableId;

        const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
        const sourceColumn = _items.find((item) => item.when === sourceKey);
        const destinationColumn = _items.find((item) => item.when === destinationKey);
        const sourceTodo = sourceColumn?.todo?.splice(source.index, 1);

        destinationColumn?.todo?.splice(destination.index, 0, ...sourceTodo!);
        for (let i = 0; i < sourceColumn!.todo!.length; i++) {
            sourceColumn!.todo![i].index = i;
        }
        for (let i = 0; i < destinationColumn!.todo!.length; i++) {
            destinationColumn!.todo![i].index = i;
        }

        setMockData(_items);
    };
    useEffect(() => {
        const animation = requestAnimationFrame(() => setEnabled(true));

        return () => {
            cancelAnimationFrame(animation);
            setEnabled(false);
        };
    }, []);

    const handleCompleted = (todoId: string) => {
        return () => {
            const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
            for (let i = 0; i < _items.length; i++) {
                const todo = _items[i].todo?.find((todo) => todo._id === todoId);
                if (todo) {
                    todo.completed = !todo.completed;
                    setMockData(_items);
                    return;
                }
            }
        }
    };
    const handleEdit = (todoId: string) => {
        return () => {
            const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
            for (let i = 0; i < _items.length; i++) {
                const todo = _items[i].todo?.find((todo) => todo._id === todoId);
                if (todo) {
                    todo.title = title;
                    todo.discription = discription;
                    setMockData(_items);
                    setEdit(false);
                    setTitle('');
                    setDiscription('');
                    return;
                }
            }
        }
    };
    const handleDelet = (todoId: string) => {
        console.log('todoId', todoId);
        return () => {
            const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
            for (let i = 0; i < _items.length; i++) {
                const todo = _items[i].todo?.find((todo) => todo._id === todoId);
                if (todo) {
                    _items[i].todo = _items[i].todo?.filter((todo) => todo._id !== todoId); // 삭제
                    setMockData(_items);
                    return;
                }
            }
        }
    };

    if (!enabled) {
        return null;
    }
    return (
        <div className='m-4'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
                    {(provided) => (
                        <div
                            className="flex gap-4"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {mockData.map((Data, index) => (
                                <Draggable key={Data.when} draggableId={Data.when} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex-1"
                                        >
                                            <Droppable droppableId={Data.when}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        className={cn(
                                                            'flex flex-col gap-3 rounded-xl p-4 active:ring-1 active:ring-gray-300 bg-[#181818] transition-all',
                                                            snapshot.isDraggingOver ? 'shadow-lg' : 'shadow',
                                                            'h-fit '
                                                        )}
                                                    >
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-xs font-semibold">
                                                                {Data.when.toUpperCase()}
                                                            </span>
                                                            <Ellipsis />
                                                            <Plus />
                                                            <Trash2 />
                                                        </div>
                                                        {Data.todo?.map((todo, index) => (
                                                            <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                                                {(provided, snapshot) => (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={cn(
                                                                            'rounded-lg bg-[#181818] p-4 transition-shadow group hover:ring-1 hover:ring-gray-300 ',
                                                                            snapshot.isDragging
                                                                                ? 'bg-opacity-90 shadow-md shadow-gray-400'
                                                                                : 'shadow shadow-[#272727]',
                                                                        )}
                                                                    >
                                                                        {edit && choiseTodo === todo._id ? (<>
                                                                            <div className='flex flex-row gap-4 items-center'>
                                                                                <button onClick={handleCompleted(todo._id)} className={cn("p-1 text-xs font-semibold text-gray-900 rounded-full border-2 w-fit h-fit", todo.completed ? 'bg-green-500' : 'bg-opacity-0')}>
                                                                                    {todo.completed ? <Check size={16} /> : <><Check size={16} className='opacity-0' /></>}
                                                                                </button>
                                                                                <div className='flex flex-col w-full gap-1'>
                                                                                    <div className="flex justify-between items-center">
                                                                                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="text-sm font-semibold border-white border-b-2 bg-transparent" />
                                                                                        <button onClick={handleEdit(todo._id)}><Check /></button>
                                                                                    </div>
                                                                                    <input type="text" value={discription} onChange={(e) => { setDiscription(e.target.value) }} className="text-xs text-gray-500 border-white border-b-2 bg-transparent" />
                                                                                </div>
                                                                            </div>
                                                                        </>) : (<>
                                                                            <div className='flex flex-row gap-4 items-center '>
                                                                                <button onClick={handleCompleted(todo._id)} className={cn("p-1 text-xs font-semibold text-gray-900 rounded-full border-2 w-fit h-fit", todo.completed ? 'bg-green-500' : 'bg-opacity-0')}>
                                                                                    {todo.completed ? <Check size={16} /> : <><Check size={16} className='opacity-0' /></>}
                                                                                </button>
                                                                                <div className='flex flex-col w-full gap-1'>
                                                                                    <div className="flex justify-between items-center">
                                                                                        <span className="text-sm font-semibold">
                                                                                            {todo.title}
                                                                                        </span>
                                                                                        <DropDownComponent title={todo.title} _id={todo._id} discription={todo.discription} handleDelet={handleDelet(todo._id)} setEdit={setEdit} setTitle={setTitle} setDiscription={setDiscription} setChoiseTodo={setChoiseTodo} />
                                                                                    </div>
                                                                                    <span className="text-xs text-gray-500">
                                                                                        {todo.discription}
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </>)}
                                                                    </div>
                                                                )}
                                                            </Draggable>
                                                        ))}
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
                </Droppable >
            </DragDropContext>
        </div>
    )
}

export default Routin