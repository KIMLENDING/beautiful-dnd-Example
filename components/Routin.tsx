/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from '@/utils/utils';
import { Check, Ellipsis, PencilOff, Plus, Trash2 } from 'lucide-react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { chunkArray } from '@/utils/DargAndDropUtil';

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
const mockData2: MockData[] = Array.from({ length: 10 }, (_, index) => ({
    _id: `mock-${index}`,
    indexDB: index,
    title: `언제 ${index} - ${['아침', '점심', '저녁'][Math.floor(Math.random() * 3)]}`, // Random time of day
    discription: `내용 ${index + 1}`,
    type: ['아침', '점심', '저녁'].filter(() => Math.random() > 0.5) || ['아침'], // Randomly include times
    todo: Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, todoIndex) => ({
        _id: `todo-${index}-${todoIndex}`,
        indexDB: todoIndex,
        title: `언제 ${index} 할일 ${todoIndex} `,
        discription: `언제 ${index} 내용 테스트 ${todoIndex} `,
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
        <DropdownMenu >{/** 부모 컴포넌트 옵션 */}
            <DropdownMenuTrigger> <Ellipsis className='text-yellow-400' /> </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-[#1F1F1F] text-gray-100'>
                <DropdownMenuItem className='p-0' >
                    <button className='flex flex-row items-center justify-between gap-4 w-full m-2'
                        onClick={() => { props.setEdit2(true); props.setTitle(props.title); props.setDiscription(props.discription); props.setChoisePId(props._id) }}>
                        <PencilOff />
                        <div className='flex-1 font-bold pr-1'>수정</div>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='p-0'>
                    <button className='flex flex-row items-center justify-between gap-4 w-full m-2' onClick={() => props.handleDelet2()}>
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
        <DropdownMenu >{/** 자식 컴포넌트 옵션 */}
            <DropdownMenuTrigger> <Ellipsis className='text-yellow-400' /> </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-[#1F1F1F] text-gray-100'>
                <DropdownMenuItem className='p-0'>
                    <button className='flex flex-row items-center justify-between gap-4 w-full m-2'
                        onClick={() => { props.setEdit(true); props.setTitle(props.title); props.setDiscription(props.discription); props.setChoiseTodo(props._id) }}>
                        <PencilOff />
                        <div className='flex-1 font-bold pr-1'>수정</div>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='p-0'>
                    <button className='flex flex-row items-center justify-between gap-4 w-full m-2' onClick={() => props.handleDelet()}>
                        <Trash2 />
                        <div className='flex-1 font-bold pr-1'>삭제</div>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}



const Routin = () => {
    const [mockData, setMockData] = useState<MockData[]>(mockData2);
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    });
    const [maxItemsPerRow, setmaxItemsPerRow] = useState(4);// 한 행당 최대 아이템 수 설정
    // 클라이언트 환경에서 초기 크기 설정
    useLayoutEffect(() => { // dom이 로드되기 전에 실행
        const initialSize = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        setWindowSize(initialSize);

        // 윈도우 리사이즈 이벤트 핸들러
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // 리사이즈 이벤트 등록
        window.addEventListener('resize', handleResize);

        // 컴포넌트가 언마운트될 때 이벤트 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        if (windowSize.width < 768) {
            setmaxItemsPerRow(1);
        } else if (windowSize.width >= 768 && windowSize.width < 1236) {
            setmaxItemsPerRow(2);
        } else if (windowSize.width >= 1236 && windowSize.width < 1651) {
            setmaxItemsPerRow(3);
        }
        else {
            setmaxItemsPerRow(4);
        }
    }, [windowSize]);
    console.log(windowSize.width)
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
    const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [scrollToId, setScrollToId] = useState<string | null>(null);

    const maxWidth = windowSize.width; // 최대 레이아웃 너비 설정

    const chunkedMockData = chunkArray(mockData, maxWidth, maxItemsPerRow); // 최대 너비에 따라 배열을 나눔

    useEffect(() => {
        if (scrollToId && scrollRefs.current[scrollToId]) {
            scrollRefs.current[scrollToId]!.scrollTop = scrollRefs.current[scrollToId]!.scrollHeight;
            setScrollToId(null);
        }
    }, [scrollToId, mockData]);

    const onDragEnd = ({ source, destination, type }: DropResult) => {
        if (!destination) return;

        if (type === 'GROUP') {
            // 그룹 이동 로직
            const sourceChunkIndex = parseInt(source.droppableId.split('-')[1]);
            const destChunkIndex = parseInt(destination.droppableId.split('-')[1]);

            const newMockData = Array.from(mockData);
            const chunkedMockData = chunkArray(newMockData, maxWidth, maxItemsPerRow);

            const [movedItem] = chunkedMockData[sourceChunkIndex].splice(source.index, 1);
            chunkedMockData[destChunkIndex].splice(destination.index, 0, movedItem);

            const flattenedMockData = chunkedMockData.flat();
            flattenedMockData.forEach((item: any, index: any) => {
                item.indexDB = index;
            });

            setMockData(flattenedMockData);
        } else if (type === 'ITEM') {
            // 아이템 이동 로직
            const sourceKey = source.droppableId;
            const destinationKey = destination.droppableId;

            const _items = JSON.parse(JSON.stringify(mockData)) as typeof mockData;
            const sourceColumn = _items.find((item) => item.title === sourceKey.replace('todo-', ''));
            const destinationColumn = _items.find((item) => item.title === destinationKey.replace('todo-', ''));

            if (sourceColumn && destinationColumn) {
                const sourceTodo = sourceColumn.todo?.splice(source.index, 1);
                destinationColumn.todo?.splice(destination.index, 0, ...sourceTodo!);

                if (sourceColumn.todo) {
                    sourceColumn.todo.forEach((todo, index) => {
                        todo.indexDB = index;
                    });
                }
                if (destinationColumn.todo) {
                    destinationColumn.todo.forEach((todo, index) => {
                        todo.indexDB = index;
                    });
                }
                setMockData(_items);
            }
        }
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
                    console.log('done',);
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
                    console.log(_items)
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

    if (!enabled) {
        return null;
    }
    return (
        <div className='flex flex-col m-4 '>
            <div>{'외부에 행당 최대 아이템 수를 설정해서 넘으면 배열을 나누어서 새로운 행을 만들었음'}</div>
            <div>{'그 안에 이중으로 dnd를 만들어서 안에 있는 아이템들을 움직일 수 있도록 했는데'}</div>
            <div>{'문제가 부모 dnd와 자식 dnd가 영역을 침범함 '}</div>
            <div>{'해결함 부모에는 Droppable type="GROUP" 이라는 속성을 추가함'}</div>
            <div>{'자식에는 Droppable type="ITEM" 이라는 속성을 추가함'}</div>
            <DragDropContext onDragEnd={onDragEnd}>
                {addTodo && edit ? (<> {/*부모 추가 모드(데이터 입력 모드)  edit을 넣은 이유는 addTodd만 쓰면 다를 수정 모드일때 항 상 켜져서*/}
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
                                        type: ['아침', '점심', '저녁'].filter(() => Math.random() > 0.5) || ['아침'],
                                        todo: [],
                                    })
                                    setMockData(_items);
                                    setAddTodo(false);
                                    setEdit(false);
                                    setTitle('');
                                    setDiscription('');
                                }}><Check className='text-yellow-300' /></button>
                            </div>
                            <input type="text" placeholder='부제목' value={discription} onChange={(e) => { setDiscription(e.target.value) }} className="text-xs text-gray-500 border-white border-b-2 bg-transparent" />
                        </div>
                    </div>
                </>) : (<> {/*부모 추가 모드(데이터 입력 모드) 아닐때 상시 보이는 추가 버튼 */}
                    <div className='flex w-fit bg-[#1F1F1F] h-fit items-center justify-center rounded-xl pb-2'>
                        <div className={cn(
                            'flex flex-row gap-3 rounded-lg bg-[#1F1F1F] p-4 transition-shadow group hover:ring-1 hover:ring-gray-300 shadow-lg shadow-[#272727]',
                        )} onClick={() => { setAddTodo(true); setEdit(true) }}
                        >
                            <Plus className='text-yellow-300' />
                            <p>create new routin</p>
                        </div>
                    </div>
                </>)}
                <div className='mx-auto'>
                    {chunkedMockData.map((chunk: any, chunkIndex: any) => (
                        <Droppable droppableId={`row-${chunkIndex}`} direction='horizontal' key={chunkIndex} type="GROUP">
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="flex flex-wrap gap-8 w-full mx-auto mb-8 justify-start"
                                >

                                    {chunk.map((Data: any, index2: any) => (
                                        <Draggable key={Data._id} draggableId={Data._id} index={index2} >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="w-[380px]"
                                                >
                                                    <Droppable droppableId={`todo-${Data.title}`} type="ITEM">
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.droppableProps}
                                                                className={cn(
                                                                    'min-w-[240px] max-w-[520px]  flex flex-col gap-3 rounded-xl p-4 active:ring-1 active:ring-gray-300 bg-[#1F1F1F] transition-all group duration-700 hover:ring-1 hover:ring-gray-300',
                                                                    snapshot.isDraggingOver ? 'shadow-lg shadow-gray-400' : '',
                                                                    'h-fit',
                                                                    edit2 && choisePId === Data._id ? ' ring-1 ring-gray-300' : ' ring-0 ring-transparent' // 수정 모드일때
                                                                )}
                                                            >
                                                                {edit2 && choisePId === Data._id ? (<> {/*부모 수정 모드 */}
                                                                    <div className='flex flex-row gap-4 items-center'>
                                                                        <div className='flex flex-col w-full gap-1'>
                                                                            <div className="flex justify-between items-center">
                                                                                <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="text-sm font-semibold border-white border-b-2 bg-transparent" />
                                                                                <button onClick={handleEdit2(Data._id)}><Check className='text-yellow-300' /></button>
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
                                                                <div
                                                                    ref={(el) => { scrollRefs.current[Data._id] = el }}
                                                                    className='flex flex-col gap-3 h-full max-h-[285px] overflow-y-auto p-1'
                                                                > {/**자식 리스트 */}
                                                                    <div className='flex flex-col gap-3  h-full'>
                                                                        {Data.todo?.map((todo: any, index: any) => (
                                                                            <Draggable key={todo._id} draggableId={todo._id} index={index} >
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
                                                                                                <button onClick={handleCompleted(todo._id)} className={cn("duration-300 transition-all p-1 text-xs font-semibold text-gray-900 rounded-full border-2 w-fit h-fit", todo.completed ? 'bg-yellow-500' : 'bg-opacity-0')}>
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
                                                                                        </>) : (<>{/*자식 수정 모드 아닐때 */}
                                                                                            <div className='flex flex-row gap-4 items-center group '>
                                                                                                <button onClick={handleCompleted(todo._id)} className={cn("duration-300 transition-all p-1 text-xs font-semibold text-gray-900 rounded-full border-2 w-fit h-fit", todo.completed ? 'bg-yellow-500' : 'bg-opacity-0')}>
                                                                                                    {todo.completed ? <Check size={16} /> : <><Check size={16} className='opacity-0' /></>}
                                                                                                </button>
                                                                                                <div className='flex flex-col w-full gap-1 '>
                                                                                                    <div className="flex justify-between items-center ">
                                                                                                        <span className={cn("relative text-sm font-semibold transition-all duration-700 ease-in-out", todo.completed ? ' opacity-50' : 'opacity-100')}>

                                                                                                            {todo.title}
                                                                                                            <span className={` absolute left-1/2 right-0 top-1/2 h-0.5 bg-current transform scale-x-0 origin-left transition-transform duration-300 ease-in-out
                                                                                                                 ${todo.completed ? 'scale-x-100' : 'scale-x-0'}`}
                                                                                                            ></span>
                                                                                                            <span className={` absolute left-1/2 right-0 top-1/2 h-0.5 bg-current transform scale-x-0 origin-left transition-transform duration-300 ease-in-out
                                                                                                                 ${todo.completed ? '-scale-x-100' : 'scale-x-0'}`}
                                                                                                            ></span>

                                                                                                        </span>
                                                                                                        <div className={`duration-300 transition-all ${isHovered && ishoverId === todo._id ? 'group-hover:opacity-100' : 'opacity-0'}`}>
                                                                                                            <DropDownComponent title={todo.title} _id={todo._id} discription={todo.discription} handleDelet={handleDelet(todo._id)} setEdit={setEdit} setTitle={setTitle} setDiscription={setDiscription} setChoiseTodo={setChoiseTodo} />
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <span className="text-xs text-gray-500 ">
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
                                                                                            console.log(scrollRefs.current[Data._id]?.scrollHeight)

                                                                                            if (scrollRefs.current[Data._id]) {
                                                                                                scrollRefs.current[Data._id]!.scrollTop = scrollRefs.current[Data._id]!.scrollHeight;
                                                                                            }
                                                                                            setMockData(_items);
                                                                                            setAddTodo(false);
                                                                                            setChoisePId('');
                                                                                            setTitle('');
                                                                                            setDiscription('');
                                                                                            setScrollToId(Data._id);
                                                                                            return;
                                                                                        }
                                                                                    }
                                                                                }}><Check className='text-yellow-300' /></button>
                                                                            </div>
                                                                            <input type="text" placeholder='부제목' value={discription} onChange={(e) => { setDiscription(e.target.value) }} className="text-xs text-gray-500 border-white border-b-2 bg-transparent" />
                                                                        </div>
                                                                    </div>
                                                                </>) :
                                                                    (<>
                                                                        <div className='flex w-full justify-center ' onClick={() => { setAddTodo(true); setChoisePId(Data._id) }}>
                                                                            <Plus className='duration-300 transition-all h-0  opacity-0 group-hover:opacity-100 group-hover:h-[24px] group-hover:text-yellow-400' />
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
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>

            </DragDropContext>
        </div>
    )
}

export default Routin;
