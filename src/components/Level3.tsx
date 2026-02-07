'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';

// @ts-ignore
import confetti from 'canvas-confetti';

export default function Level3() {
  const [showButton, setShowButton] = useState(false);

  const handleYesClick = () => {
    // Trigger confetti
    const confettiTimings = [0, 300, 600, 900];
    confettiTimings.forEach((delay) => {
      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00ff41', '#ff1493', '#ff69b4', '#00ffff', '#ffffff'],
        });
      }, delay);
    });
  };

  // Show button after a short delay
  useEffect(() => {
    setTimeout(() => setShowButton(true), 1000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 relative overflow-hidden px-4">
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
          background: 'linear-gradient(45deg, #ff1493, #ff69b4, #00ffff, #ff1493)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Floating hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-5xl"
            initial={{ y: '100vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          >
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '💖' : '💗'}
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center gap-8"
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden border-[6px] border-[#ff1493] shadow-2xl"
          style={{
            boxShadow: '0 0 60px rgba(255, 20, 147, 0.8), 0 0 100px rgba(255, 105, 180, 0.4)',
          }}
          whileHover={{ scale: 1.02 }}
        >
          <Image
            src="/valentinescats.jpg"
            alt="Valentine's Day"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-[#ff1493] leading-tight" style={{
            textShadow: '0 0 30px rgba(255, 20, 147, 1), 0 0 60px rgba(255, 105, 180, 0.5)',
          }}>
            Will you be my Valentine?
          </h1>
          
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mt-8"
          >
            <Heart size={80} fill="#ff1493" color="#ff1493" />
          </motion.div>
        </motion.div>

        {/* Button */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
            }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={handleYesClick}
            whileHover={{ 
              scale: 1.15,
              boxShadow: '0 0 50px rgba(255, 20, 147, 1), 0 0 80px rgba(255, 105, 180, 0.6)',
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-16 py-6 bg-gradient-to-r from-[#ff1493] via-[#ff69b4] to-[#ff1493] text-white text-3xl font-bold rounded-full shadow-2xl transition-all overflow-hidden"
            style={{
              boxShadow: '0 0 40px rgba(255, 20, 147, 0.8), 0 10px 30px rgba(0, 0, 0, 0.3)',
              backgroundSize: '200% 100%',
            }}
          >
            <motion.span
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="relative z-10"
            >
              Yes yes yesssss (can't say no) 💕
            </motion.span>
            
            {/* Sparkle effect */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
