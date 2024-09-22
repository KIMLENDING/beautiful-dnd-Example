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
import { useRef } from 'react';

interface Todo {
    _id: string;
    indexDB: number; // 순서
    title: string;
    discription: string; // 설명
    completed: boolean;
}
interface MockData {
    _id: string;
    indexDB: number; // 순서
    title: string; // 시간 - 이게 제목임
    discription: string; // 설명
    type: string[]; // 아침, 점심, 저녁 중복 가능 - 기본값 아침
    todo?: Todo[]; // 할일
}
const mockData2: MockData[] = Array.from({ length: 4 }, (_, index) => ({
    _id: `mock-${index}`,
    indexDB: index,
    title: `언제 ${index} - ${['Morning', 'Afternoon', 'Evening'][Math.floor(Math.random() * 3)]}`, // Random time of day
    discription: `Description for Day ${index + 1}`,
    type: ['Morning', 'Afternoon', 'Evening'].filter(() => Math.random() > 0.5) || ['Morning'], // Randomly include times
    todo: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, todoIndex) => ({
        _id: `todo-${index}-${todoIndex}`,
        indexDB: todoIndex,
        title: `Todo ${todoIndex} for Day ${index}`,
        discription: `This is todo number ${todoIndex} for Day ${index}`,
        completed: Math.random() > 0.5 // Randomly mark some as completed
    }))
}));

interface DropDownComponent2Props {
    title: string;
    discription: string;
    _id: string;
    setEdit2: (value: boolean) => void;
    setTitle: (value: string) => void;
    setDiscription: (value: string) => void;
    setChoisePId: (value: string) => void;
    handleDelet2: () => void;
}
const DropDownComponent2 = (props: DropDownComponent2Props) => {
    return (
        <DropdownMenu >
            <DropdownMenuTrigger> <Ellipsis /> </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-[#1F1F1F] text-gray-100'>
                <DropdownMenuItem  >
                    <button className='flex flex-row items-center justify-between gap-4 w-full '
                        onClick={() => { props.setEdit2(true); props.setTitle(props.title); props.setDiscription(props.discription); props.setChoisePId(props._id) }}>
                        <PencilOff />
                        <div className='flex-1 font-bold pr-1'>수정</div>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <button className='flex flex-row items-center justify-between gap-4 w-full' onClick={() => props.handleDelet2()}>
                        <Trash2 />
                        <div className='flex-1 font-bold pr-1'>삭제</div>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

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
            <DropdownMenuContent className='bg-[#1F1F1F] text-gray-100'>
                <DropdownMenuItem  >
                    <button className='flex flex-row items-center justify-between gap-4 w-full '
                        onClick={() => { props.setEdit(true); props.setTitle(props.title); props.setDiscription(props.discription); props.setChoiseTodo(props._id) }}>
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
    const [enabled, setEnabled] = useState(false); // 드래그 앤 드롭 활성화 여부
    const [choiseTodo, setChoiseTodo] = useState(''); // 선택된 todo Id
    const [choisePId, setChoisePId] = useState(''); // 선택된 부모요소 id -즉 부모 컴포넌트 선택
    const [ishoverId, setHoverId] = useState(''); // 호버된 아이디
    const [edit, setEdit] = useState(false); // 수정 모드
    const [edit2, setEdit2] = useState(false); // 수정 모드
    const [title, setTitle] = useState(''); // 제목
    const [discription, setDiscription] = useState(''); // 설명
    const [isHovered, setHover] = useState(false);
    const [addTodo, setAddTodo] = useState(false);// 할일 추가
    const scrollRef = useRef<HTMLDivElement[]>([]);
    const [scrollId, setScrollId] = useState(0);// 스크롤 아이디


    const onDragEnd = ({ source, destination, type, draggableId }: DropResult) => {
        if (!destination) return;
        if (source.droppableId === 'columns') {
            if (source.index === mockData[source.index].indexDB) {
                const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
                const [targetItem] = _items.splice(source.index, 1); // 선택된 아이템
                _items.splice(destination.index, 0, targetItem); // 드롭된 위치에 아이템 추가
                for (let i = 0; i < _items.length; i++) {
                    _items[i].indexDB = i; // db에 저장할 때 index를 다시 정렬해줘야함 
                    //db에서 가져올 때 index로 정렬해서 가져오기 위해
                }
                setMockData(_items);//
                return;
            }
        }
        const sourceKey = source.droppableId;
        const destinationKey = destination.droppableId;

        const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
        const sourceColumn = _items.find((item) => item.title === sourceKey);
        const destinationColumn = _items.find((item) => item.title === destinationKey);
        const sourceTodo = sourceColumn?.todo?.splice(source.index, 1);

        destinationColumn?.todo?.splice(destination.index, 0, ...sourceTodo!);

        for (let i = 0; i < sourceColumn!.todo!.length; i++) {
            sourceColumn!.todo![i].indexDB = i;
        }
        for (let i = 0; i < destinationColumn!.todo!.length; i++) {
            destinationColumn!.todo![i].indexDB = i;
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
    const handleEdit2 = (mockId: string) => {

        return () => {
            const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
            for (let i = 0; i < _items.length; i++) {
                if (_items[i]._id === mockId) {
                    _items[i].title = title;
                    _items[i].discription = discription;
                    setMockData(_items);
                    setEdit2(false);
                    setTitle('');
                    setDiscription('');

                    return;
                }
            }
        }
    }

    const handleDelet = (todoId: string) => {

        return () => {

            const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
            for (let i = 0; i < _items.length; i++) {
                const todo = _items[i].todo?.find((todo) => todo._id === todoId);
                if (todo) {
                    _items[i].todo = _items[i].todo?.filter((todo) => todo._id !== todoId); // 삭제
                    if (_items[i].todo?.length !== 0) { // 삭제 후 index 재정렬
                        for (let k = 0; k < _items[i].todo!.length; k++) {
                            _items[i].todo![k].indexDB = k;
                        }
                    }
                    setMockData(_items);

                    return;
                }
            }
        }
    };
    const handleDelet2 = (mockId: string) => {
        return () => {

            const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
            const index = _items.findIndex((item) => item._id === mockId);
            _items.splice(index, 1);// 삭제
            for (let i = 0; i < _items.length; i++) {
                _items[i].indexDB = i; // 삭제 후 index 재정렬
            }
            setMockData(_items);
        }
    }

    useEffect(() => {
        if (scrollRef.current[scrollId]) {
            scrollRef.current[scrollId].scrollTop = scrollRef.current[scrollId].scrollHeight;
            setScrollId(10000000000); // 초기화
        }
    }, [scrollId, mockData])
    if (!enabled) {
        return null;
    }
    return (
        <div className='flex m-4 '>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="columns" direction="horizontal" type="droppableListItem">
                    {(provided) => (
                        <div
                            className=" flex gap-8 w-full h-full"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {mockData.map((Data, index1) => (
                                <Draggable key={Data._id} draggableId={Data._id} index={index1}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="flex-1"
                                        >
                                            <Droppable droppableId={Data.title}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.droppableProps}
                                                        className={cn(
                                                            'min-w-[240px] max-w-[520px] flex flex-col gap-3 rounded-xl p-4 active:ring-1 active:ring-gray-300 bg-[#1F1F1F] transition-all group duration-700 hover:ring-1 hover:ring-gray-300   ',
                                                            snapshot.isDraggingOver ? 'shadow-lg shadow-gray-400' : '',
                                                            'h-fit ',
                                                            edit2 && choisePId === Data._id ? ' ring-1 ring-gray-300' : ' ring-0 ring-transparent' // 수정 모드일때
                                                        )}
                                                    >

                                                        {edit2 && choisePId === Data._id ? (<> {/*부모 수정 모드 */}
                                                            <div className='flex flex-row gap-4 items-center'>
                                                                <div className='flex flex-col w-full gap-1'>
                                                                    <div className="flex justify-between items-center">
                                                                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="text-sm font-semibold border-white border-b-2 bg-transparent" />
                                                                        <button onClick={handleEdit2(Data._id)}><Check /></button>
                                                                    </div>
                                                                    <input type="text" value={discription} onChange={(e) => { setDiscription(e.target.value) }} className="text-xs text-gray-500 border-white border-b-2 bg-transparent" />
                                                                </div>
                                                            </div>
                                                        </>) : (<>
                                                            <div className='flex flex-col w-full gap-1 px-3 '>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-sm font-semibold">
                                                                        {Data.title}
                                                                    </span>
                                                                    <div className='opacity-0 group-hover:opacity-100 duration-300 transition-all'>
                                                                        <DropDownComponent2 title={Data.title} _id={Data._id} discription={Data.discription} handleDelet2={handleDelet2(Data._id)} setEdit2={setEdit2} setTitle={setTitle} setDiscription={setDiscription} setChoisePId={setChoisePId} />
                                                                    </div>
                                                                </div>
                                                                <span className="text-xs text-gray-500">
                                                                    {Data.discription}
                                                                </span>
                                                            </div>
                                                        </>)}
                                                        <div ref={(el) => { if (el) scrollRef.current[index1] = el }} className='flex flex-col gap-3 h-full max-h-[285px] overflow-y-scroll p-1'>{/** todo 리스트 컨테이너 */}
                                                            <div className='flex flex-col gap-3  h-full'>
                                                                {Data.todo?.map((todo, index) => (
                                                                    <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                                                        {(provided, snapshot) => (
                                                                            <div
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                                onMouseEnter={() => { setHover(true); setHoverId(todo._id) }}
                                                                                onMouseLeave={() => { setHover(false); setHoverId('') }}
                                                                                className={cn(
                                                                                    "rounded-lg bg-[#1F1F1F] p-4 hover:ring-1 hover:ring-gray-300  duration-300 transition-all ",
                                                                                    snapshot.isDragging
                                                                                        ? 'bg-opacity-90 shadow-lg shadow-gray-400'
                                                                                        : 'shadow shadow-[#272727]', // 드래그 중일때
                                                                                    edit && choiseTodo === todo._id ? 'ring-1 ring-gray-300' : 'ring-0 ring-transparent' // 수정 모드일때

                                                                                )}
                                                                            >
                                                                                {edit && choiseTodo === todo._id ? (<>{/*자식 수정 모드 */}
                                                                                    <div className='flex flex-row gap-4 items-center'>
                                                                                        <button onClick={handleCompleted(todo._id)} className={cn("duration-300 transition-all p-1 text-xs font-semibold text-gray-900 rounded-full border-2 w-fit h-fit", todo.completed ? 'bg-green-500' : 'bg-opacity-0')}>
                                                                                            {todo.completed ? <Check size={16} /> : <><Check size={16} className='opacity-0' /></>}
                                                                                        </button>
                                                                                        <div className='flex flex-col w-full gap-1'>
                                                                                            <div className="flex justify-between items-center">
                                                                                                <input type="text" value={title} placeholder='제목' onChange={(e) => { setTitle(e.target.value) }} className="text-sm font-semibold border-white border-b-2 bg-transparent" />
                                                                                                <button onClick={handleEdit(todo._id)}><Check /></button>
                                                                                            </div>
                                                                                            <input type="text" value={discription} placeholder='부제목' onChange={(e) => { setDiscription(e.target.value) }} className="text-xs text-gray-500 border-white border-b-2 bg-transparent" />
                                                                                        </div>
                                                                                    </div>
                                                                                </>) : (<>
                                                                                    <div className='flex flex-row gap-4 items-center group '>
                                                                                        <button onClick={handleCompleted(todo._id)} className={cn("duration-300 transition-all p-1 text-xs font-semibold text-gray-900 rounded-full border-2 w-fit h-fit", todo.completed ? 'bg-green-500' : 'bg-opacity-0')}>
                                                                                            {todo.completed ? <Check size={16} /> : <><Check size={16} className='opacity-0' /></>}
                                                                                        </button>
                                                                                        <div className='flex flex-col w-full gap-1 '>
                                                                                            <div className="flex justify-between items-center ">
                                                                                                <span className="text-sm font-semibold ">
                                                                                                    {todo.title}
                                                                                                </span>
                                                                                                <div className={`duration-300 transition-all ${isHovered && ishoverId === todo._id ? 'group-hover:opacity-100' : 'opacity-0'}`}>
                                                                                                    <DropDownComponent title={todo.title} _id={todo._id} discription={todo.discription} handleDelet={handleDelet(todo._id)} setEdit={setEdit} setTitle={setTitle} setDiscription={setDiscription} setChoiseTodo={setChoiseTodo} />
                                                                                                </div>
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
                                                        </div>

                                                        {addTodo && choisePId === Data._id ? (<> {/*자식 todo 추가 모드*/}
                                                            <div className='flex flex-row gap-4 items-center ring-1 ring-white rounded-lg p-4'>
                                                                {addTodo}
                                                                <div className='flex flex-col w-full gap-1'>
                                                                    <div className="flex justify-between items-center">
                                                                        <input type="text" placeholder='제목' value={title} onChange={(e) => { setTitle(e.target.value) }} className="text-sm font-semibold border-white border-b-2 bg-transparent" />

                                                                        <button onClick={() => {
                                                                            const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
                                                                            for (let i = 0; i < _items.length; i++) { // 부요요소가 없으면 todo를 추가 할 수 없기 때문에 _items.length는 0이 될 수 없음
                                                                                if (_items[i]._id === Data._id) {
                                                                                    _items[i].todo = _items[i].todo || [];
                                                                                    _items[i].todo?.push({
                                                                                        _id: `todo-${Data._id}-${_items[i].todo!.length}`,
                                                                                        indexDB: _items[i].todo!.length,
                                                                                        title: title,
                                                                                        discription: discription,
                                                                                        completed: false
                                                                                    });
                                                                                    setMockData(_items);
                                                                                    setAddTodo(false); // 추가 후 초기화
                                                                                    setChoisePId(''); // 추가 후 초기화
                                                                                    setTitle('');
                                                                                    setDiscription('');
                                                                                    setScrollId(index1);


                                                                                    return;
                                                                                }
                                                                            }
                                                                        }}><Check /></button>
                                                                    </div>
                                                                    <input type="text" placeholder='부제목' value={discription} onChange={(e) => { setDiscription(e.target.value) }} className="text-xs text-gray-500 border-white border-b-2 bg-transparent" />
                                                                </div>
                                                            </div>
                                                        </>) :
                                                            (<>
                                                                <div className='flex w-full justify-center ' onClick={() => { setAddTodo(true); setChoisePId(Data._id) }}>
                                                                    <Plus className='duration-300 transition-all h-0  opacity-0 group-hover:opacity-100 group-hover:h-[24px]' />
                                                                </div>
                                                            </>)}
                                                    </div>
                                                )}

                                            </Droppable>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {addTodo && edit ? (<> {/*부모 추가 모드  edit을 넣은 이유는 addTodd만 쓰면 다를 수정 모드일때 항 상 켜져서*/}
                                <div className='flex w-fit bg-[#1F1F1F] h-fit items-center justify-center rounded-xl'>
                                    <div className='flex flex-col gap-3 rounded-lg bg-[#1F1F1F] p-4 transition-shadow group hover:ring-1 hover:ring-gray-300 shadow-lg shadow-[#272727]'>
                                        <div className="flex justify-between items-center gap-3">
                                            <input type="text" placeholder='제목' value={title} onChange={(e) => { setTitle(e.target.value) }} className="text-sm font-semibold border-white border-b-2 bg-transparent" />
                                            <button onClick={() => {
                                                const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
                                                _items.push({
                                                    _id: `mock-${_items.length}`,
                                                    indexDB: _items.length,
                                                    title: title,
                                                    discription: discription,
                                                    type: ['Morning', 'Afternoon', 'Evening'].filter(() => Math.random() > 0.5) || ['Morning'],
                                                    todo: [],
                                                })
                                                setMockData(_items);
                                                setAddTodo(false);
                                                setEdit(false);
                                                setTitle('');
                                                setDiscription('');

                                            }}><Check /></button>
                                        </div>
                                        <input type="text" placeholder='부제목' value={discription} onChange={(e) => { setDiscription(e.target.value) }} className="text-xs text-gray-500 border-white border-b-2 bg-transparent" />
                                    </div>
                                </div>
                            </>) : (<>
                                <div className='flex w-fit bg-[#1F1F1F] h-fit items-center justify-center rounded-xl'>
                                    <div className={cn(
                                        'flex flex-row gap-3 rounded-lg bg-[#1F1F1F] p-4 transition-shadow group hover:ring-1 hover:ring-gray-300 shadow-lg shadow-[#272727]',
                                    )} onClick={() => { setAddTodo(true); setEdit(true) }}
                                    >
                                        <Plus />
                                        <p>create new routin</p>
                                    </div>
                                </div>
                            </>)}
                        </div>
                    )}
                </Droppable >
            </DragDropContext>
        </div>
    )
}

export default Routin