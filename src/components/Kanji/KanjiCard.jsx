'use client';

import kanjiData1 from "@/lib/kanji.json";
import kanjiData2 from "@/lib/kanji2.json";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion"; 

const allKanjiData = [...kanjiData1, ...kanjiData2];

export default function KanjiQuizCard() {
    const random = Math.floor(Math.random() * allKanjiData.length);

    const [kanjiIndex, setKanjiIndex] = useState(random);
    const [userInput, setUserInput] = useState("");
    const [correct, setCorrect] = useState(null);
    const [showed, setShowed] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [mistakeMade, setMistakeMade] = useState(false); 
    const [showCard, setShowCard] = useState(true);
    const [correctMade, setCorrectMade] = useState(false);
    const current = allKanjiData[kanjiIndex];
    const kanji = current[0];
    const onReadings = current[1];
    const kunReadings = current[2];
    const meanings = current[4];

    const handleShow = () => {
        const trimmedInput = userInput.trim().toLowerCase();
        const isCorrect = meanings.some(m => m.toLowerCase() === trimmedInput);
        setCorrect(isCorrect);
    
        if (isCorrect && !correctMade) { 
            setCorrectCount(c => c + 1);
            setCorrectMade(true); 
        } else if (!mistakeMade) { 
            setWrongCount(w => w + 1);
            setMistakeMade(true); 
        }
    
        setShowed(true);
    };

    const handleNext = () => {
        if (correct) {
            
            setMistakeMade(false);
            setShowCard(false);  
            setTimeout(() => {
                const random = Math.floor(Math.random() * allKanjiData.length);
                setKanjiIndex(random);
                setUserInput("");
                setCorrect(null);
                setShowed(false);
                setShowCard(true); 
            }, 100);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <AnimatePresence mode="wait">
                {showCard && (
                    <motion.div
                        key={kanjiIndex}
                        initial={{ opacity: 0, rotateY: -90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 90 }}
                        transition={{ duration: 0.1 }}
                    >
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
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleShow(); 
                                            if (correct) {
                                                handleNext(); 
                                            }
                                        }
                                    }}
                                    placeholder={showed ? meanings.join(", ") : "e.g. Asia"}
                                    className="text-center text-xl font-bold"
                                    autoFocus
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
                                        <Button onClick={handleNext} className="w-full" disabled={!correct}>➡️ Next</Button>
                                    )}
                                </div>
                                <div className="flex justify-center gap-8 text-sm text-muted-foreground">
                                    <p>✅ Correct: {correctCount}</p>
                                    <p>❌ Wrong: {wrongCount}</p>
                                </div>
                                <p className="text-sm text-gray-500 uppercase">❗ Advanced Difficulty</p>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
