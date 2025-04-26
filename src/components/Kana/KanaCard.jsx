'use client';

import { hiraganaData } from "@/lib/hiragana";
import { katakanaData } from "@/lib/katakana";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 

const allKana = [...hiraganaData, ...katakanaData];

export default function KanaQuizCard() {

    const [kanaIndex, setKanaIndex] = useState(Math.floor(Math.random() * allKana.length));
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(null);
    const [showed, setShowed] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [showCard, setShowCard] = useState(true); 
    const [mistakeMade, setMistakeMade] = useState(false);
    const [listLength, setListLength] = useState(allKana.length);

    const current = allKana[kanaIndex];

    const nextKana = () => {
        if (userInput.toLowerCase() === current.roumaji.toLowerCase()) {
            setCorrectCount(c => c + 1);
                    setShowCard(false); 
                    setTimeout(() => {
                        const randomNum = Math.floor(Math.random() * listLength);
                        setKanaIndex(randomNum);
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

    return (
        <div className="max-w-md mx-auto mt-10">
            <AnimatePresence mode="wait">
                {showCard && (
                    <motion.div
                        key={kanaIndex}
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.1 }}
                    >
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
                                    onKeyDown={(e) => e.key === "Enter" && nextKana()}
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
                                    <Button onClick={nextKana} className="w-[48%]">Next</Button>
                                    <Button variant="outline" onClick={handleShowAnswer} className="w-[48%]">
                                        💡 Show 
                                    </Button>
                                </div>
                                <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                                    <p>✅ Correct: {correctCount}</p>
                                    <p>❌ Wrong: {wrongCount}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
