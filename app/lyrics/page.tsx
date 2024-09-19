"use client";

import YouTubeLyrics from "@/components/YouTubeLyrics";
import { useState } from "react";
import { Word, getLyrics, lyricsYuuri } from "@/utils/lyrics";
export default function Home() {
    const [lyrics, setLyrics] = useState<Word[]>([]);
    const [textLyrics, setTextLyrics] = useState('');
    const [url, setUrl] = useState('');
    const [urlId, setUrlId] = useState('');

    function getYouTubeVideoId(url: string) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get("v");
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (textLyrics.length === 0 || url.length === 0) {
            setLyrics(lyricsYuuri);
            setUrlId('k-jkldtzf4s');
        } else {
            const urlId2 = getYouTubeVideoId(url) || '';
            const lyricsData = getLyrics(textLyrics)
            setLyrics(lyricsData);
            setUrlId(urlId2);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextLyrics(e.target.value);
    };
    const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };
    if (lyrics.length === 0) {
        setLyrics(lyricsYuuri);
    }
    const exlyrics =
        ` 0:00 
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
살아 `;
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">


            <h1>사용방법</h1>
            <div>1. 유튜브에서 동영상의 설명란을 누르면 스크립트가 있다 그 부분을 복사해서 가사를 입력</div>
            <div>예시: </div>
            <textarea name="" id="" placeholder={exlyrics} className="flex min-w-64  min-h-24" disabled></textarea>
            <div className="text-yellow-500"> 타임스탬프가 가사에 딱 맞게 되어있어야 보기 좋음  </div>
            <div>이런 식으로 복사될 것이다. 이걸 붙여 넣고 </div>
            <div>2. 유튜브 동영상 주소를 입력 url을 복사하면 된다.</div>
            <div>예시:https://www.youtube.com/watch?v=ntil6RLnBZc&list=OLAK5uy_kXrY5CSmOSkKj4AFBlqBNM7Cg-b60tgBM&index=1</div>
            <div>아무것도 입력하지 않은 상태에서 제출 버튼을 누르면 내가 좋아하는 노래</div><br />

            <div className="text-red-500">  다른 노래로 설정하고 싶다면 새로 고침 해야함 </div>
            <form action="submit" onSubmit={onSubmit} className="m-4 p-4 flex gap-4 flex-row">
                <div className="flex flex-col gap-5">

                    <div className="flex flex-row items-center gap-4">
                        <h1 className="text-4xl font-bold">가사 입력</h1>
                        <textarea
                            value={textLyrics}
                            onChange={handleInputChange}
                            className="text-black"
                            name="lyrics"
                        />
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <h1> 유튜브 동영상 주소 입력</h1>
                        <input
                            placeholder="k-jkldtzf4s"
                            type="text"
                            value={url}
                            onChange={handleInputChange2}
                            className="text-black"
                            name="url"
                        />
                    </div>
                </div>
                <button type="submit" className="border-2 p-2 border-white rounded-md">가사 제출</button>
            </form>


            <YouTubeLyrics lyrics={lyrics} videoId={urlId} />
        </main>
    );
}

