'use client';

import { hiraganaData } from "@/lib/hiragana"; 
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HiraganaCard() {
    const random = Math.floor(Math.random() * hiraganaData.length);

    const [hiraganaNumber, setHiraganaNumber] = useState(random); 
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(null);
    const [showed, setShowed] = useState(false);
    const [mistakeMade, setMistakeMade] = useState(false);
    const [hideCombination, setHideCombination] = useState(false);
    const [listLength, setListLength] = useState(hiraganaData.length);
    const [showCard, setShowCard] = useState(true);

    useEffect(() => {
        if (hideCombination) {
            setListLength(hiraganaData.length - 33);
        } else {
            setListLength(hiraganaData.length);
        }
    }, [hideCombination]);

    const nextHiragana = () => {
        if (userInput.toLowerCase() === hiraganaData[hiraganaNumber].roumaji.toLowerCase()) {
            setCorrectCount(c => c + 1);
            setShowCard(false); 
            setTimeout(() => {
                const randomNum = Math.floor(Math.random() * listLength);
                setHiraganaNumber(randomNum);
                setUserInput("");
                setShowed(false);
                setShowCard(true); 
            }, 100); 
        } else {
            setCorrect(false);
            if (!mistakeMade) {
                setWrongCount(w => w + 1);
                setMistakeMade(true); 
            }
        }
    };

    const handleShowAnswer = () => {
        setShowed(true);
        setMistakeMade(false);
    };

    const current = hiraganaData[hiraganaNumber];

    return (
        <div className="max-w-md mx-auto mt-10">
            <AnimatePresence mode="wait">
                {showCard && (
                    <motion.div
                        key={hiraganaNumber}
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.1 }}
                    >
                        <Card className="rounded-2xl shadow-lg p-4 border border-gray-200">
                            <CardHeader className="text-center">
                                <CardTitle className="text-6xl font-bold text-blue-600">
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
                                    onKeyDown={(e) => e.key === "Enter" && nextHiragana()}
                                    autoFocus
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
                                    <Button onClick={nextHiragana} className="w-[48%]">Next</Button>
                                    <Button variant="outline" onClick={handleShowAnswer} className="w-[48%]">
                                        💡 Show 
                                    </Button>
                                </div>
                                <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                                    <p>✅ Correct: {correctCount}</p>
                                    <p>❌ Wrong: {wrongCount}</p>
                                </div>
                                <Button variant="secondary" onClick={() => setHideCombination(!hideCombination)}>
                                    {hideCombination ? "👀 Show All Katakana" : "㊙ Hide Combinations"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
