"use client";
import TodoLibraryExample from '@/components/todo/TodoLibraryExample';
import TodoLibraryExample2 from '@/components/todo/TodoLibraryExample2';
import { useState } from 'react';

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

export default function TodoPage() {
    const [items, setItems] = useState<TItems>({
        todo: [...Array(5)].map((_, i) => ({
            id: `${i}${i}${i}`,
            title: `Title ${i + 1}000`,
            status: 'todo',
            inputText: '',
        })),
        doing: [],
    });

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

    const handleAddItem = (status: TItemStatus) => {
        const newItem: TItem = {
            id: Date.now().toString(),
            title: `New Item ${items[status].length + 1}`,
            status: status,
            inputText: '',
        };
        setItems(prevItems => ({
            ...prevItems,
            [status]: [...prevItems[status], newItem]
        }));
    };

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
            <TodoLibraryExample2
                items={items}
                setItems={setItems}
                onInputChange={handleInputChange}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
            />
        </>
    );
}