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
    <div className="flex flex-col items-center justify-center min-h-screen gap-12 px-4 relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#00ff41]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <h1 className="text-5xl font-bold mb-4 flex items-center justify-center gap-4">
          <Heart size={50} className="text-[#ff1493]" />
          Level 2: Answer My Questions
        </h1>
        <p className="text-2xl opacity-90 font-semibold">Question {currentQuestionIndex + 1} of {questions.length}</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center gap-8 w-full max-w-2xl px-6 relative z-10"
      >
        <motion.div 
          className="text-center mb-6 p-8 bg-black/50 backdrop-blur-sm rounded-2xl border-2 border-[#ff1493] w-full"
          style={{
            boxShadow: '0 0 30px rgba(255, 20, 147, 0.3)',
          }}
        >
          <h2 className="text-4xl font-bold text-[#ff1493] leading-relaxed">
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
            className="w-full px-8 py-6 bg-black border-3 border-[#00ff41] rounded-xl focus:outline-none focus:ring-4 focus:ring-[#00ff41]/50 text-[#00ff41] text-2xl placeholder-opacity-50 disabled:opacity-50 text-center font-semibold"
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 65, 0.2)',
            }}
            autoFocus
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={allComplete || !userAnswer.trim()}
          whileHover={{ scale: allComplete ? 1 : 1.08, boxShadow: '0 0 40px rgba(0, 255, 65, 0.6)' }}
          whileTap={{ scale: allComplete ? 1 : 0.95 }}
          className="px-12 py-5 bg-[#00ff41] text-black text-2xl font-bold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
          style={{
            boxShadow: '0 0 25px rgba(0, 255, 65, 0.4)',
          }}
        >
          Submit Answer
        </motion.button>

        {isCorrect === true && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[#00ff41] text-3xl font-bold"
            style={{
              textShadow: '0 0 10px rgba(0, 255, 65, 0.8)',
            }}
          >
            ✓ Correct!
          </motion.p>
        )}

        {isCorrect === false && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-red-500 text-3xl font-bold"
            style={{
              textShadow: '0 0 10px rgba(255, 0, 0, 0.8)',
            }}
          >
            ✗ Try again!
          </motion.p>
        )}
      </motion.form>

      {allComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <p className="text-4xl font-bold text-[#00ff41] mb-6" style={{
            textShadow: '0 0 20px rgba(0, 255, 65, 0.8)',
          }}>All correct! 🎉</p>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 border-4 border-[#00ff41] border-t-transparent rounded-full mx-auto"
          />
        </motion.div>
      )}
    </div>
  );
}
