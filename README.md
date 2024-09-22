`Rutin.tsx 이 파일이 완성 파일 `
{
Rutin.tsx 파일 설명
2쌍의 Droppable-Draggable 컴포넌트가 있다.

1.  Droppable-Draggable type="GROUP" 컴포넌트
2.  Droppable-Draggable type="ITEM" 컴포넌트
    type을 설정하는 이유는 두 컴포넌트가 영역을 공유하지 않게 하기 위해

데이터 구조

```
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
```

chunkedMockData = chunkArray(mockData, maxWidth, maxItemsPerRow);
maxWidth: 최대 레이아웃 너비 설정 ex) 1000
maxItemsPerRow: 한 줄에 들어갈 아이템 수 (mockData를 몇 조각으로 나눌지 결정)
mockData.length: 20, maxItemsPerRow: 4 이면 chunkArray는 [[0],[1],[2],[3],[4]] 5조각으로 나눠줌
chunkedMockData는 length가 5이됨

'''
chunk는 위에서 5조각을 나눈 것중 하나가 됨 그럼 총 5개의 Droppable 컴포넌트가 생기는 것임
<DragDropContext>
<Droppable1/>
<Droppable1/>
<Droppable1/>
<Droppable1/>
<Droppable1/>
</DragDropContext>
이런 모양이 됨 같은 레벨에서는 <Droppable1/>컴포넌트간 <Dragable1/>이 가능해짐
그럼 이제 <Dragable1/> 컴포넌트 안에 다시 <Droppable2/>을 넣어 주고 그안에 <Dragable2/>를 추가해 주면 된다. 간단하게 설명하면 이렇고
<DragDropContext>
<Droppable1>
<Dragable1>
{
<Droppable2>
<Dragable2/>
<Dragable2/>
어러게...
<Dragable2/>
<Dragable2/>
</Droppable2>
}
</Dragable1>
여러게...
<Dragable1>
{
<Droppable2>
<Dragable2/>
<Dragable2/>
<Dragable2/>
<Dragable2/>
</Droppable2>
}
</Dragable1>
</Droppable1>
여러게..
<Droppable1>
<Dragable1>
{
<Droppable2>
<Dragable2/>
<Dragable2/>
<Dragable2/>
<Dragable2/>
</Droppable2>
}
</Dragable1>
<Dragable1>
{
<Droppable2>
<Dragable2/>
<Dragable2/>
<Dragable2/>
<Dragable2/>
</Droppable2>
}
</Dragable1>
</Droppable1>
</DragDropContext>
이런 모양이 되는것임
'''
