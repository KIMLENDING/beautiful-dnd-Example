'use client';
import React, { useEffect, useState, useRef, use } from "react";
import { lyrics } from "@/utils/lyrics";
import { useRouter } from "next/navigation";


const YouTubeLyrics = () => {

    const [player, setPlayer] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [visibleWords, setVisibleWords] = useState<{ time: number; text: string; krText: string, id: string; duration: number; }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const containerRefKr = useRef<HTMLDivElement>(null);
    const spanRefs = useRef<{ [key: string]: HTMLSpanElement }>({});
    const spanRefsKr = useRef<{ [key: string]: HTMLSpanElement }>({});

    useEffect(() => {

        const loadYouTubeIframeAPI = () => {
            if (!(window as any).YT) {
                const script = document.createElement("script");
                script.src = "https://www.youtube.com/iframe_api";
                script.async = true;
                document.body.appendChild(script);
            }

            // YouTube API가 이미 로드된 경우에도 onYouTubeIframeAPIReady 이벤트가 호출되도록 설정
            (window as any).onYouTubeIframeAPIReady = () => {
                const playerInstance = new (window as any).YT.Player("player", {
                    height: "360",
                    width: "640",
                    videoId: "k-jkldtzf4s",
                    events: {
                        onReady: (event: any) => {
                            setInterval(() => {
                                const time = event.target.getCurrentTime();
                                setCurrentTime(time);
                            }, 100);
                        },
                    },
                });
                setPlayer(playerInstance);
            };

            // YT가 이미 로드된 경우 바로 초기화
            if ((window as any).YT && (window as any).YT.Player) {
                (window as any).onYouTubeIframeAPIReady();
            }
        };
        loadYouTubeIframeAPI();
    }, []);

    useEffect(() => {
        const currentWords = lyrics.filter(
            (word) => currentTime >= word.time && currentTime < word.time + word.duration
        );
        setVisibleWords(currentWords.slice(-4));
    }, [currentTime]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
        if (containerRefKr.current) {
            containerRefKr.current.scrollTop = containerRefKr.current.scrollHeight;
        }
    }, [visibleWords]);

    const getProgressPercentage = (word: any) => {
        const elapsedTime = currentTime - word.time;
        const percentage = (elapsedTime / word.duration) * 100;
        return Math.min(Math.max(percentage, 0), 100);
    };

    return (
        <div className=" flex flex-col  mx-auto">
            <div id="player"></div>

            <div
                ref={containerRef}
                className="relative  text-3xl  mt-4 h-24 "
            >
                {visibleWords.map((word) => (
                    <div key={word.id} className="absolute mb-2 " >
                        <div className=" inline-block text-nowrap bg-[rgb(226,218,218)] transition-all duration-100 rounded-lg"
                            style={{
                                width: `${spanRefs.current[word.id]
                                    ? (getProgressPercentage(word) * spanRefs.current[word.id].getBoundingClientRect().width) / 100
                                    : 0
                                    }px`
                            }}>
                            <div className="p-3 ">
                                <span ref={(el) => {
                                    if (el) {
                                        spanRefs.current[word.id] = el;
                                    }
                                }} className="font-extrabold mix-blend-difference text-white">{word.text}</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div
                ref={containerRefKr}
                className="relative text-3xl mt-4 h-24 "
            >
                {visibleWords.map((word) => (
                    <div key={word.id} className="absolute mb-2 " >
                        <div className=" inline-block text-nowrap bg-[rgb(226,218,218)] transition-all duration-100 rounded-lg"
                            style={{
                                width: `${spanRefsKr.current[word.id]
                                    ? (getProgressPercentage(word) * spanRefsKr.current[word.id].getBoundingClientRect().width) / 100
                                    : 0
                                    }px`
                            }}>
                            <div className="p-3 ">
                                <span ref={(el) => {
                                    if (el) {
                                        spanRefsKr.current[word.id] = el;
                                    }
                                }} className="font-extrabold mix-blend-difference text-white">{word.krText}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div >
    );
};

export default YouTubeLyrics;
{/* 
                        <div key={word.id} className="relative mb-2">
                        <span ref={(el) => {
                            if (el) {
                                spanRefs.current[word.id] = el;
                                console.log(el.getBoundingClientRect().width);
                                }
                                }} className="relative z-10 inline-block font-extrabold mix-blend-difference">{word.text}</span>
                                <div
                            className="absolute top-0 left-0 h-full bg-yellow-500 "
                            style={{
                                width: `${spanRefs.current[word.id]
                                    ? (getProgressPercentage(word) * spanRefs.current[word.id].getBoundingClientRect().width) / 100
                                    : 0
                                    }px`
                                    }}
                                    /> */}