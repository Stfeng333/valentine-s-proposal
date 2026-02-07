'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// @ts-ignore
import confetti from 'canvas-confetti';

const FINAL_MESSAGE = 'Will you be my Valentine?';
const ENCRYPTED_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function Level3() {
  const [displayedText, setDisplayedText] = useState('');
  const [isDecoding, setIsDecoding] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!isDecoding) return;

    let currentIndex = 0;
    const totalChars = FINAL_MESSAGE.length;
    const decodeSpeed = 50; // milliseconds per character decode

    const interval = setInterval(() => {
      if (currentIndex < totalChars) {
        // Generate "encrypted" version of current message
        let encrypted = '';
        for (let i = 0; i < totalChars; i++) {
          if (i < currentIndex) {
            // Already decoded
            encrypted += FINAL_MESSAGE[i];
          } else if (i === currentIndex) {
            // Current character being decoded
            encrypted += FINAL_MESSAGE[i];
          } else {
            // Not yet decoded - show random character
            encrypted += ENCRYPTED_CHARS[Math.floor(Math.random() * ENCRYPTED_CHARS.length)];
          }
        }
        setDisplayedText(encrypted);
        currentIndex++;
      } else {
        setIsDecoding(false);
        setDisplayedText(FINAL_MESSAGE);
        setShowConfetti(true);
        clearInterval(interval);
      }
    }, decodeSpeed);

    return () => clearInterval(interval);
  }, [isDecoding]);

  useEffect(() => {
    if (showConfetti) {
      // Trigger confetti multiple times for better effect
      const confettiTimings = [0, 300, 600];
      confettiTimings.forEach((delay) => {
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00ff41', '#ff1493', '#ff69b4', '#00ffff'],
          });
        }, delay);
      });
    }
  }, [showConfetti]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 relative overflow-hidden">
      {/* Background animated gradient */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, #00ff41, #ff1493, #00ffff)',
          backgroundSize: '400% 400%',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl font-bold mb-2">Level 3: The Final Message</h1>
        <p className="text-lg opacity-80">Decoding...</p>
      </motion.div>

      {/* Main message display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10"
      >
        <div className="px-12 py-8 bg-black border-2 border-[#00ff41] rounded-lg shadow-2xl"
          style={{
            boxShadow: '0 0 20px rgba(0, 255, 65, 0.5)',
          }}
        >
          <div className="font-mono text-4xl font-bold tracking-wider whitespace-nowrap"
            style={{
              color: '#00ff41',
              textShadow: '0 0 10px rgba(0, 255, 65, 0.8)',
              minHeight: '60px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {displayedText}
          </div>
          
          {!isDecoding && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={48} fill="#ff1493" color="#ff1493" />
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Status indicators */}
      {isDecoding ? (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="relative z-10 text-[#00ff41] font-mono"
        >
          <p>Decoding message...</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center"
        >
          <p className="text-2xl font-bold text-[#ff1493] mb-4">Message Decoded!</p>
          <p className="text-lg opacity-80 max-w-md">
            Thank you for solving the puzzles. You mean everything to me. 💕
          </p>
        </motion.div>
      )}

      {/* Decorative Matrix code columns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20"
        style={{
          fontSize: '14px',
          fontFamily: 'monospace',
          color: '#00ff41',
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, window.innerHeight] }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 2,
            }}
            style={{
              position: 'absolute',
              left: `${i * 10}%`,
              whiteSpace: 'pre',
              lineHeight: '1.5',
            }}
          >
            {Array.from({ length: 30 })
              .map(() => ENCRYPTED_CHARS[Math.floor(Math.random() * ENCRYPTED_CHARS.length)])
              .join('\n')}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
