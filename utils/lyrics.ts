export interface Word {
    time: number;
    text?: string;
    krText?: string;
    id: string;
    duration: number;
}

// lyrics.ts
export const lyricsYuuri = [
    { time: 1, text: "[音楽]", krText: "노래", id: "word1", duration: 11 },
    { time: 12, text: "人生は無常だ", krText: "인생은 허무해", id: "word2", duration: 2 },
    { time: 14, text: "好きだけじゃやっていけない", krText: "좋아하는 것만으로는 살아갈 수 없어", id: "word3", duration: 3.6 },
    { time: 18, text: "生きるために嫌なこともやっていかないといけない", krText: "살아가기 위해서는 싫어하는 것도 하지 않으면 안되는 거야", id: "word4", duration: 4.2 },
    { time: 23, text: "そのうちにそのほとんどが好きじゃなくなってく", krText: "그러다 보면 대부분은 좋아하지 않게 돼", id: "word5", duration: 5.3 },
    { time: 29, text: "好きだったはずのことさえこれでいいのかと思える", krText: "분명 좋아했던 것들인데 이 길이 맞는 건가 생각이 들었어", id: "word6", duration: 4.2 },
    { time: 34, text: "歯を食いしばってた", krText: "이를 악물고 있었어", id: "word7", duration: 2.7 },
    { time: 36.7, text: "かむしゃらに恋に出した", krText: "악착같이 목소리를 냈어", id: "word8", duration: 2.4 },
    { time: 39.2, text: "寒さに凍えたどの夜も", krText: "추위에 얼어붙은 어느 밤에도", id: "word9", duration: 2.8 },
    { time: 42, text: "かき鳴らすことはやめないで", krText: "연주하는 걸 그만두지 않고", id: "word10", duration: 3 },
    { time: 45.2, text: "黙ることなんてしなかった", krText: "입을 다물고 있지 않았어", id: "word11", duration: 2 },
    { time: 48, text: "諦めそうになった", krText: "포기할 뻔했어", id: "word12", duration: 2 },
    { time: 50, text: "でも諦められなかった", krText: "하지만 포기할 수 없었어", id: "word13", duration: 3 },
    { time: 53, text: "でも諦めそうになった", krText: "그렇지만 포기할 뻔했어", id: "word14", duration: 2.1 },
    { time: 55.2, text: "だけど諦めなかった", krText: "그래도 포기하지 않았어", id: "word15", duration: 2.8 },
    { time: 58, text: "たった一回だけ多く", krText: "그저 딱 한 번만더", id: "word16", duration: 2.1 },
    { time: 60, text: "そう諦めなかった", krText: "그래 포기하지 않았어", id: "word17", duration: 4 },
    { time: 64, text: "だから夢が叶った", krText: "그러니 꿈이 이루어졌어", id: "word18", duration: 2 },
    { time: 66, text: "この景色があるんだ", krText: "이 경치가 보여", id: "word19", duration: 4 },
    { time: 70, text: "[音楽]", id: "word20", krText: "간주중", duration: 9 },
    { time: 80, text: "人生は無常だ", krText: "인생은 허무해", id: "word21", duration: 2 },
    { time: 82, text: "好きなように生きたなら", krText: "원하는 대로 살면", id: "word22", duration: 3 },
    { time: 85, text: "好きなように生きることのできない人だって居るんだ", krText: "원하는 대로 살 수 없는 사람도 있어", id: "word23", duration: 5 },
    { time: 91, text: "そういう君だってどっかで　諦めていないのかい", krText: "그런 너도 어딘가에서 포기하고 있지 않아?", id: "word24", duration: 5 },
    { time: 96, text: "好きだったはずのあれは一体どこにやったんだ", krText: "좋아했던 그건 대체 어디로 간거야", id: "word25", duration: 5 },
    { time: 101.4, text: "夢中になってた", krText: "집중하고 있었어", id: "word26", duration: 2.6 },
    { time: 104, text: "他に何にもいらなかった", krText: "그 밖엔 아무것도 필요 없었어", id: "word27", duration: 3 },
    { time: 108, text: "痛みに耐えてたあの夜に", krText: "아픔을 견디던 그 날 밤에", id: "word28", duration: 2 },
    { time: 110, text: "前を向くことを辞めないでいられたらきっと違ってた", krText: "앞을 바라보는 것을 멈추지 않았다면 분명 달랐을 거야.", id: "word29", duration: 5.5 },
    { time: 116, text: "諦めそうになった", krText: "포기할 뻔했어", id: "word30", duration: 2 },
    { time: 118, text: "でも諦められなかった", krText: "하지만 포기할 수 없었어", id: "word31", duration: 3 },
    { time: 121, text: "でも諦めそうになった", krText: "그렇지만 포기할 뻔했어", id: "word32", duration: 2.7 },
    { time: 123.8, text: "だけど諦めなかった", krText: "그래도 포기하지 않았어", id: "word33", duration: 2.2 },
    { time: 126, text: "たった一回諦めることができなかったから", krText: "그저 단 한 번 포기하는 것을 할 수 없었으니까", id: "word34", duration: 6 },
    { time: 132, text: "だから夢が叶った", krText: "그래서 꿈이 이루어졌어", id: "word35", duration: 2.5 },
    { time: 134.5, text: "この景色があるんだ", krText: "이 경치가 보여", id: "word36", duration: 3 },
    { time: 138, text: "諦めろなんて言われても", krText: "포기하라는 말을 들어도", id: "word37", duration: 2 },
    { time: 140.4, text: "それを決めるのは自分だった", krText: "그걸 결정하는 건 나 자신이야", id: "word38", duration: 2.6 },
    { time: 143, text: "諦めた方がいいなんて簡単に言えやしなかった", krText: "포기하는 편이 낫다는 말을 쉽게 할 수 없었어", id: "word39", duration: 5.5 },
    { time: 149, text: "無責任だとか責任が", krText: "책임이 있다든가 없다든가", id: "word40", duration: 2.3 },
    { time: 151.3, text: "どんなに偉そうに見えたて", krText: "아무리 잘난 척을 해도", id: "word41", duration: 2.5 },
    { time: 154, text: "綺麗事だとか真実が", krText: "입에 발린 말이나 진실이", id: "word42", duration: 3 },
    { time: 157, text: "僕を変えたりはしなかった", krText: "나를 바꿀 순 없었어", id: "word43", duration: 5 },
    { time: 162.8, text: "諦めそうになった", krText: "포기할 뻔했어", id: "word44", duration: 2.2 },
    { time: 165, text: "でも諦められなかった", krText: "하지만 포기할 수 없었어", id: "word45", duration: 3 },
    { time: 168, text: "でも諦めそうになった", krText: "그렇지만 포기할 뻔했어", id: "word46", duration: 2 },
    { time: 170.7, text: "だけど諦めなかった", krText: "그래도 포기하지 않았어", id: "word47", duration: 2.2 },
    { time: 173.4, text: "たった一回諦めることができなかったから", krText: "그저 단 한 번 포기하는 것을 할 수 없었으니까", id: "word48", duration: 6 },
    { time: 179.6, text: "だから夢が叶った", krText: "그래서 꿈이 이루어졌어", id: "word49", duration: 2 },
    { time: 182, text: "この景色があるんだ", krText: "이 경치가 보여", id: "word50", duration: 2 },
    { time: 187.5, text: "諦めそうになった", krText: "포기할 뻔했어", id: "word51", duration: 2.5 },
    { time: 190.3, text: "でも諦められなかった", krText: "하지만 포기할 수 없었어", id: "word45", duration: 2.7 },
    { time: 193, text: "でも諦めそうになった", krText: "그렇지만 포기할 뻔했어", id: "word52", duration: 2.8 },
    { time: 195.8, text: "だけど諦めなかった", krText: "그래도 포기하지 않았어", id: "word53", duration: 2 },
    { time: 198, text: "たった一回だけ多く", krText: "그저 딱 한 번만더", id: "word54", duration: 3 },
    { time: 201, text: "そう諦めなかった", krText: "그래 포기하지 않았어", id: "word55", duration: 3 },
    { time: 204, text: "だから夢が叶った", krText: "그래서 꿈이 이루어졌어", id: "word56", duration: 2 },
    { time: 206, text: "この景色があるんだ", krText: "이 경치가 보여", id: "word57", duration: 3.8 },
    { time: 212, text: "諦めなかった", krText: "포기하지 않았어", id: "word58", duration: 2 },
    { time: 217.5, text: "諦めなかった", krText: "포기하지 않았어", id: "word61", duration: 2.5 },
    { time: 223, text: "諦めなかった", krText: "포기하지 않았어", id: "word63", duration: 2 },
    { time: 226, text: "たった一回だけ多く", krText: "그저 딱 한 번만더", id: "word64", duration: 2 },
    { time: 228.5, text: "そう諦めなかった", krText: "그래 포기하지 않았어", id: "word65", duration: 3 },
    { time: 231.7, text: "だから夢が叶った", krText: "그래서 꿈이 이루어졌어", id: "word66", duration: 2 },
    { time: 234, text: "この景色があるんだ", krText: "이 경치가 보여", id: "word67", duration: 2 },
];

const inputLyrics = `
0:00
[음악]
0:14
하루가 가는 소리 들어 넘는 세상
0:20
속에 다리
0:22
저물고 해가 뜨는
0:27
서러운 한 날도
0:31
시도 못 살 것
0:34
같더니 그저
0:36
이렇게
0:39
그리워하며
0:42
살아
0:44
어디서부터 잊어 갈까 오늘도 기억
0:50
속에 네가
0:52
찾아와 하루 종이
0:57
떠들어네 말투
1:00
네
1:00
표정 너무
1:03
분명해서 마치
1:05
지금도 내
1:08
곁에 네가 사는 것만
1:12
같아 사랑인 걸 사랑인 걸 지워봐도
1:18
사랑인 걸 아무리
1:23
원해도 내 안에는 너만
1:26
사랑 너 하나만 너
1:30
하나만 기억하고 원하는 걸 보고픈
1:36
너의
1:38
사진을 꺼내어 보다
1:49
잠들어
1:51
어디서부터 잊어 갈까 오늘도 기억
1:56
속에 네가 찾아와
2:00
하루 종이
2:03
더들어네
2:05
말투네
2:07
표정 너무
2:10
분명해서 마치
2:12
지금도 내
2:14
곁에 네가 사는 것만
2:18
같아 사랑인 걸 사랑인 걸 지워봐도
2:24
사랑인 걸 아무리 비워내도
2:30
내 안에는 너만
2:33
사아 너
2:35
하나만 너
2:37
하나만 기억하고 원하는 걸 보고픈
2:42
너의
2:45
사진이 꺼내어보다
2:48
잠들어 잠결에
2:50
흐르던 눈물이 곳 말라
2:55
거들 조금씩 그려지겠지
3:04
손내밀면 달듯 아직은 눈에 선한이
3:10
얼굴
3:12
사랑해 사랑해 잊으면
3:20
[음악]
3:23
안돼 너만 보고 너만 알고 너만 위해
3:28
살아
3:30
난 마음들 곳을
3:34
몰라 하루가 년
3:37
같아
3:39
아무것도 아무 일도 아무 말도 못하는
3:45
나 그래도 사랑을
3:49
믿어 그래도 사랑을
3:57
믿어 오늘도 사랑
4:01
을 믿어
4:05
[음악]`
function convertTimeToSeconds(timeStr: string): number {
    const [minutes, seconds] = timeStr.split(':').map(Number);
    return minutes * 60 + seconds;
}

function parseWord(timeStr: string, text: string, index: number, nextTime?: number): Word {
    const time = convertTimeToSeconds(timeStr);
    return {
        time,
        text,
        krText: text,
        id: `word${index}`,
        duration: nextTime ? nextTime - time : 10 // 마지막 단어의 경우 10초로 설정
    };
}

function parseLyrics(input: string): Word[] {
    const lines = input.split('\n').filter(line => line.trim() !== '');
    const words: Word[] = [];

    for (let i = 0; i < lines.length; i += 2) {
        const timeStr = lines[i];
        const text = lines[i + 1] || '';
        const nextTimeStr = lines[i + 2];

        const nextTime = nextTimeStr ? convertTimeToSeconds(nextTimeStr) : undefined;
        words.push(parseWord(timeStr, text, i / 2, nextTime));
    }

    return words;
}

// 테스트 함수
export const getLyrics = (input: string): Word[] => {
    return parseLyrics(input);
};

getLyrics(inputLyrics);