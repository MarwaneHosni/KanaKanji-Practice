'use client';

import { katakanaData } from "@/lib/katakana"; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";

console.log("katakanaData:", katakanaData);


export default function KatakanaCard() {
    const [katakanaNumber, setKatakanaNumber] = useState(0); 
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(null);
    const [showed, setShowed] = useState(false);

    const nextKatakana = () => {
        if (userInput === katakanaData[katakanaNumber].roumaji) {
            setCorrect(true);
            setCorrectCount((prev) => prev + 1);
            const randomNum = Math.floor(Math.random() * katakanaData.length); 
            setKatakanaNumber(randomNum);
            setUserInput("");
            setShowed(false);
        } else {
            setCorrect(false);
            setWrongCount((prev) => prev + 1);
        }
    };

    const handleShowAnswer = () => {
        setShowed(true);
        setUserInput(katakanaData[katakanaNumber].roumaji);
    };

    const current = katakanaData[katakanaNumber];

    return (
        <div className="max-w-md mx-auto mt-10">
            <Card className="rounded-2xl shadow-lg p-4 border border-gray-200">
                <CardHeader className="text-center">
                    <CardTitle className="text-6xl font-bold text-purple-600">
                        {current.kana}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mt-2">Guess the romaji</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input 
                        type="text"
                        placeholder={showed ? current.roumaji : "Write here..."}
                        className="text-center text-2xl font-bold uppercase"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && nextKatakana()}
                    />
                    {correct === false && (
                        <p className="text-red-500 text-center font-medium">Incorrect! Try again.</p>
                    )}
                    {correct === true && (
                        <p className="text-green-500 text-center font-medium">Correct!</p>
                    )}
                </CardContent>
                <CardFooter className="flex flex-col gap-6">
                    <div className="flex justify-between w-full">
                        <Button onClick={nextKatakana} className="w-[48%]">Next</Button>
                        <Button variant="outline" onClick={handleShowAnswer} className="w-[48%]">
                            💡 Show Answer
                        </Button>
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
