'use client';

import kanjiData from "@/lib/kanji.json";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function KanjiQuizCard() {
    const [kanjiIndex, setKanjiIndex] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(null); // true / false
    const [showed, setShowed] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);

    const current = kanjiData[kanjiIndex];
    const kanji = current[0];
    const onReadings = current[1];
    const kunReadings = current[2];
    const meanings = current[4];

    const handleShow = () => {
        const trimmedInput = userInput.trim().toLowerCase();
        const isCorrect = meanings.some(m => m.toLowerCase() === trimmedInput);
        setCorrect(isCorrect);
        if (isCorrect) {
            setCorrectCount(c => c + 1);
        } else {
            setWrongCount(w => w + 1);
        }
        setShowed(true);
    };

    const handleNext = () => {
        const random = Math.floor(Math.random() * kanjiData.length);
        setKanjiIndex(random);
        setUserInput("");
        setCorrect(null);
        setShowed(false);
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <Card className="rounded-2xl shadow-lg p-4 border border-gray-200">
                <CardHeader className="text-center">
                    <CardTitle className="text-6xl font-bold text-red-600">
                        {kanji}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">Guess one meaning</p>
                </CardHeader>

                <CardContent className="space-y-4">
                    <Input
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleShow()}
                        placeholder={showed ? meanings.join(", ") : "e.g. Asia"}
                        className="text-center text-xl font-bold"
                        disabled={showed}
                    />

                    {showed && (
                        <div className="text-center space-y-2">
                            <p className={`font-medium ${correct ? "text-green-500" : "text-red-500"}`}>
                                {correct ? "✅ Correct!" : "❌ Incorrect!"}
                            </p>
                            <p className="text-sm text-muted-foreground">Meanings: {meanings.join(", ")}</p>
                            <p className="text-sm text-muted-foreground">On'yomi: {onReadings || "–"}</p>
                            <p className="text-sm text-muted-foreground">Kun'yomi: {kunReadings || "–"}</p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <div className="flex justify-between w-full">
                        {!showed ? (
                            <Button onClick={handleShow} className="w-full">💡 Show Answer</Button>
                        ) : (
                            <Button onClick={handleNext} className="w-full">➡️ Next</Button>
                        )}
                    </div>
                    <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                        <p>✅ Correct: {correctCount}</p>
                        <p>❌ Wrong: {wrongCount}</p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
