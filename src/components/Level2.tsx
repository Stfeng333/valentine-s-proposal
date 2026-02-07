'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Question {
  question: string;
  answer: string;
}

export default function Level2({ onComplete }: { onComplete: () => void }) {
  const questions: Question[] = [
    { question: "Where was our first huge date?", answer: "Gyubee" },
    { question: "What's our current favorite game?", answer: "Arc Raiders" },
    { question: "What do you love drinking?", answer: "Boba" },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [allComplete, setAllComplete] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = userAnswer.toLowerCase().trim() === questions[currentQuestionIndex].answer.toLowerCase().trim();

    if (correct) {
      setIsCorrect(true);
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setUserAnswer('');
          setIsCorrect(null);
        } else {
          setAllComplete(true);
          setTimeout(() => onComplete(), 1500);
        }
      }, 800);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
        setUserAnswer('');
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
          <Heart size={40} className="text-[#ff1493]" />
          Level 2: Answer My Questions
        </h1>
        <p className="text-lg opacity-80">Question {currentQuestionIndex + 1} of {questions.length}</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center gap-6 w-full max-w-md px-4"
      >
        <motion.div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-[#ff1493] mb-2">
            {questions[currentQuestionIndex].question}
          </h2>
        </motion.div>

        <motion.div
          className="relative w-full"
          animate={{
            borderColor: isCorrect === true ? '#00ff41' : isCorrect === false ? '#ff0000' : '#00ff41',
          }}
        >
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
            disabled={allComplete}
            className="w-full px-6 py-4 bg-black border-2 border-[#00ff41] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff41] text-[#00ff41] placeholder-opacity-50 disabled:opacity-50"
            autoFocus
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={allComplete || !userAnswer.trim()}
          whileHover={{ scale: allComplete ? 1 : 1.05 }}
          whileTap={{ scale: allComplete ? 1 : 0.95 }}
          className="px-8 py-3 bg-[#00ff41] text-black font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Submit Answer
        </motion.button>

        {isCorrect === true && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[#00ff41] text-xl font-bold"
          >
            ✓ Correct!
          </motion.p>
        )}

        {isCorrect === false && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-red-500 text-xl font-bold"
          >
            ✗ Try again!
          </motion.p>
        )}
      </motion.form>

      {allComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-2xl font-bold text-[#00ff41] mb-4">All correct! 🎉</p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-8 border-2 border-[#00ff41] border-t-transparent rounded-full mx-auto"
          />
        </motion.div>
      )}
    </div>
  );
}
