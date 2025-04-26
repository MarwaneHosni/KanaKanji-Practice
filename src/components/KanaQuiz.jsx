'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import HiraganaCard from "./Hiragana/HiraganaCard";
import KatakanaCard from "./Katakana/KatakanaCard";
import KanjiCard from "./Kanji/KanjiCard";
import KanaCard from "./Kana/KanaCard";

const quizzes = ["Hiragana", "Katakana", "Kanji", "Kana"];

export default function KanaQuiz() {
    const [quiz, setQuiz] = useState("Hiragana");

    return (
        <div className="max-w-5xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-purple-600">
                仮名漢字練習🎌KanaKanji Practice
                </h1>
                <div className="flex flex-wrap gap-2">
                    {quizzes.map((item) => (
                        <Button
                            key={item}
                            onClick={() => setQuiz(item)}
                            variant={quiz === item ? "default" : "outline"}
                            className="text-sm font-bold px-4 py-2 rounded-full"
                        >
                            {item}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-center text-xs text-muted-foreground">
                <div className="bg-gray-100 rounded-xl p-3">🧠 Challenge your memory!</div>
                <div className="bg-gray-100 rounded-xl p-3">🎯 Train accuracy & speed</div>
                <div className="bg-gray-100 rounded-xl p-3">💬 Romaji, Kana, Meanings</div>
                <div className="bg-gray-100 rounded-xl p-3">🚀 Fast-paced practice</div>
            </div>

            <div className="text-center text-muted-foreground text-sm">
                Selected: <span className="font-bold text-purple-500">{quiz}</span>
            </div>

            <div className="flex flex-col items-center gap-8 justify-center">
                {quiz === "Hiragana" && <HiraganaCard /> } {quiz === "Hiragana" && <p className="text-sm font-bold">⬇ Check the Hiragana Chart ⬇</p>} {quiz === "Hiragana" && <img className="mx-auto w-140" src="/hiragana.png" alt="Hiragana" />}
                {quiz === "Katakana" && <KatakanaCard /> } {quiz === "Katakana" && <p className="text-sm font-bold">⬇ Check the Katakana Chart ⬇</p>} {quiz === "Katakana" && <img className="mx-auto w-140" src="/katakana.png" alt="Katakana" />}
                {quiz === "Kana" && <KanaCard />} {quiz === "Kana" && <p className="text-sm font-bold">⬇ Check the Kana Chart ⬇</p>} {quiz === "Kana" && <img className="mx-auto w-180" src="/Kana-charts.png" alt="Kana" />}
                {quiz === "Kanji" && <KanjiCard />}
            </div>

            <footer className=" mt-8 text-center text-xs text-muted-foreground opacity-70">
                Made by Marwane with ❤️ for beginner Japanese learners.
            </footer>
        </div>
    );
}
