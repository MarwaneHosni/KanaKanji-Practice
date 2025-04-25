import HiraganaCard from "@/components/Hiragana/HiraganaCard";
import KanaQuiz from "@/components/KanaQuiz";
import KanjiQuizCard from "@/components/Kanji/KanjiCard";
import KatakanaCard from "@/components/Katakana/KatakanaCard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <KanaQuiz />
    </main>
  );
}
