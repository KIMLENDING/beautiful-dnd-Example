'use client';
import React, { useState, useEffect } from 'react';
import { ListManager } from 'react-beautiful-dnd-grid';

const initialList = [
    { id: "0", order: 0 },
    { id: "1", order: 1 },
    { id: "555", order: 2 },
    { id: "3", order: 3 },
    { id: "4", order: 4 },
    { id: "5", order: 5 },
    { id: "6", order: 6 },
    { id: "7", order: 7 },
    { id: "8", order: 8 },
    { id: "9", order: 9 }
];

function sortList(list: any) {
    return list.slice().sort((first: any, second: any) => first.order - second.order);
}

function ListElement({ item: { id } }: any) {
    return (
        <div className='m-4 p-4 bg-blue-400'>
            <div>{id}</div>
        </div>
    );
}

export default function DragDropList() {
    const [sortedList, setSortedList] = useState<{ id: string; order: number }[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setSortedList(sortList(initialList));
        setIsMounted(true);
    }, []);

    const reorderList = (sourceIndex: any, destinationIndex: any) => {
        if (destinationIndex === sourceIndex) {
            return;
        }
        const list = [...sortedList];

        if (destinationIndex === 0) {
            list[sourceIndex].order = list[0].order - 1;
        } else if (destinationIndex === list.length - 1) {
            list[sourceIndex].order = list[list.length - 1].order + 1;
        } else if (destinationIndex < sourceIndex) {
            list[sourceIndex].order =
                (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
        } else {
            list[sourceIndex].order =
                (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
        }

        setSortedList(sortList(list));
    };

    if (!isMounted) {
        return null; // 또는 로딩 표시
    }

    return (
        <div className={'grid gap-2'}>
            <ListManager
                items={sortedList}
                direction="horizontal"
                maxItems={4}
                render={(item) => <ListElement item={item} />}
                onDragEnd={reorderList}
            />
        </div>
    );
}
