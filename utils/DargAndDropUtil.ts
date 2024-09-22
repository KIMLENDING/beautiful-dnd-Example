function getTextWidth(content: any) {
    if (typeof window === 'undefined') {
        // 서버 사이드에서는 기본값 반환
        return 100;
    }

    const text = document.createElement("div");
    document.body.appendChild(text);

    text.style.height = "auto";
    text.style.width = "auto";
    text.style.position = "absolute";
    text.style.whiteSpace = "no-wrap";
    text.style.paddingLeft = "10px";
    text.style.paddingRight = "10px";
    text.innerHTML = content;

    const width = Math.ceil(text.clientWidth);
    let updatedWidthWithMarginAndBorder = width + 12;
    document.body.removeChild(text);

    if (updatedWidthWithMarginAndBorder > 220) {
        updatedWidthWithMarginAndBorder = 220;
    }
    if (updatedWidthWithMarginAndBorder < 60) {
        updatedWidthWithMarginAndBorder = 60;
    }

    return updatedWidthWithMarginAndBorder;
}

export function chunkArray(array: any[], maxWidth = 1700, maxItemsPerRow = 5) {
    const tempArray = [];
    let currentRow = [];
    let currentWidth = 0;

    for (let i = 0; i < array.length; i++) {
        const itemWidth = getTextWidth(array[i].content);
        if (currentWidth + itemWidth > maxWidth || currentRow.length >= maxItemsPerRow) {
            tempArray.push(currentRow);
            currentRow = [];
            currentWidth = 0;
        }
        currentRow.push(array[i]);
        currentWidth += itemWidth;
    }

    if (currentRow.length > 0) {
        tempArray.push(currentRow);
    }

    return tempArray;
}
