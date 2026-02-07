'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock } from 'lucide-react';

export default function Level2({ onComplete }: { onComplete: () => void }) {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // You can customize these to match your actual memories
  const correctPasswords = ['02141820', '2-14-18-20', '02/14/18/20', 'favorite game', 'mario kart'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = correctPasswords.some(
      (pwd) => pwd.toLowerCase() === password.toLowerCase()
    );

    if (isCorrect) {
      setUnlocked(true);
      setTimeout(() => onComplete(), 1500);
    } else {
      setAttempts((a) => a + 1);
      setPassword('');
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
          <Lock size={40} />
          Level 2: Unlock the Secret
        </h1>
        <p className="text-lg opacity-80">Enter the password to continue</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center gap-6 w-full max-w-md px-4"
      >
        <motion.div
          className="relative w-full"
          animate={{
            borderColor: unlocked ? '#00ff41' : 'currentColor',
          }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            disabled={unlocked}
            className="w-full px-6 py-4 bg-black border-2 border-[#00ff41] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff41] text-[#00ff41] placeholder-opacity-50 disabled:opacity-50"
          />
          <motion.div
            animate={{
              x: unlocked ? 0 : -100,
              opacity: unlocked ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <Unlock size={24} className="text-[#00ff41]" />
          </motion.div>
        </motion.div>

        <motion.button
          type="submit"
          disabled={unlocked}
          whileHover={{ scale: unlocked ? 1 : 1.05 }}
          whileTap={{ scale: unlocked ? 1 : 0.95 }}
          className="px-8 py-3 bg-[#00ff41] text-black font-bold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {unlocked ? '✓ Password Correct!' : 'Submit'}
        </motion.button>

        {attempts > 0 && !unlocked && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm"
          >
            Incorrect. Try again. ({attempts} attempt{attempts !== 1 ? 's' : ''})
          </motion.p>
        )}

        <motion.button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className="text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </motion.button>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-center text-[#00ff41] p-4 bg-black border border-[#00ff41] rounded-lg text-sm max-w-xs"
          >
            <p className="font-bold mb-2">Hints:</p>
            <ul className="space-y-1 text-left">
              <li>• The date we first met</li>
              <li>• Our favorite game (title or date)</li>
              <li>Try different date formats (MMDDYYYY, MM-DD-YY-YY, etc.)</li>
            </ul>
          </motion.div>
        )}
      </motion.form>

      {unlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-2xl font-bold text-[#00ff41] mb-4">Unlocking...</p>
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
