'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import HiraganaCard from "./Hiragana/HiraganaCard";
import KatakanaCard from "./Katakana/KatakanaCard";
import KanjiCard from "./Kanji/KanjiCard";

export default function KanaQuiz() {
    const [quiz, setQuiz] = useState("Hiragana");

    return (
        <div>
            <h1>Quiz</h1>
            {["Hiragana", "Katakana", "Kanji"].map((item, i) => (
                <Button onClick={() => setQuiz(item)} key={i}>{item}</Button>
            ))}

            {quiz === "Hiragana" && <HiraganaCard />}
            {quiz === "Katakana" && <KatakanaCard />}
            {quiz === "Kanji" && <KanjiCard />}

        </div>
    );
}