import { hiraganaData } from "@/lib/hiragana";

export default function HiraganaQuiz() {

    const nextHiragana = () => {
        const randomNum = Math.floor(Math.random() * 105) + 1;
        return randomNum;
    }

    return (
        <div>
            <h1>Quiz</h1>
        </div>
    );
}