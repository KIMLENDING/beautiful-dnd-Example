"use client";
import TodoLibraryExample from '@/components/todo/TodoLibraryExample3';
import { useState } from 'react';

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

export default function TodoPage() {
    const [isAddItem, setIsAddItem] = useState(false);
    const [items, setItems] = useState<TItems>({
        todo: [...Array(5)].map((_, i) => ({
            id: `${i}${i}${i}`,
            title: `Title ${i + 1}000`,
            status: 'todo',
            inputText: '',
        })),
        doing: [],
        moning: [],

    });

    // 새로 추가할 항목의 임시 상태
    const [newItemTitle, setNewItemTitle] = useState<string>('');  // 제목을 저장
    const [newItemText, setNewItemText] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<TItemStatus>('todo');  // 선택된 상태

    // 확인 버튼을 눌렀을 때 아이템 추가
    const handleConfirmAddItem = () => {
        if (!newItemTitle) return;  // 제목이 비어있을 경우 추가하지 않음

        const newItem: TItem = {
            id: Date.now().toString(),
            title: newItemTitle,
            status: selectedStatus,
            inputText: newItemText,
        };
        setItems(prevItems => ({
            ...prevItems,
            [selectedStatus]: [...prevItems[selectedStatus], newItem],
        }));
        setNewItemTitle('');  // 입력값 초기화
        setNewItemText('');    // 입력값 초기화
        setIsAddItem(false);  // 추가 상태 해제
    };

    const handleInputChange = (id: string, value: string, type: string) => {
        setItems(prevItems => {
            const newItems = { ...prevItems };
            for (const status in newItems) {
                newItems[status as TItemStatus] = newItems[status as TItemStatus].map(item =>
                    item.id === id ? { ...item, [type]: value } : item
                );
            }
            return newItems;
        });
    };

    const handleAddItem = (type: TItemStatus) => {
        console.log('handleAddItem', type);
        setSelectedStatus(type);
        setIsAddItem(true);
    };
    const handleCancelAddItem = () => {
        setIsAddItem(false);
        setNewItemTitle('');
    }

    const handleDeleteItem = (id: string) => {
        setItems(prevItems => {
            const newItems = { ...prevItems };
            for (const status in newItems) {
                newItems[status as TItemStatus] = newItems[status as TItemStatus].filter(item => item.id !== id);
            }
            return newItems;
        });
    };

    return (
        <>

            <TodoLibraryExample

                items={items}
                isAddItem={isAddItem}
                selectedStatus={selectedStatus}
                newItemTitle={newItemTitle}
                newItemText={newItemText}
                setNewItemTitle={setNewItemTitle}
                setNewItemText={setNewItemText}
                setItems={setItems}
                onCancelAddItem={handleCancelAddItem}
                onInputChange={handleInputChange}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
                onHandleConfirmAddItem={handleConfirmAddItem}
            />
        </>
    );
}