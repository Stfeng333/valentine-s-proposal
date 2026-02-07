'use client';

import { useState } from 'react';
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
  useState(() => {
    setTimeout(() => setShowButton(true), 1000);
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 relative overflow-hidden px-4">
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
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, #ff1493, #ff69b4, #00ffff)',
          backgroundSize: '400% 400%',
        }}
      />

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
          className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-4 border-[#ff1493] shadow-2xl"
          style={{
            boxShadow: '0 0 40px rgba(255, 20, 147, 0.6)',
          }}
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
          <h1 className="text-5xl font-bold mb-4 text-[#ff1493]" style={{
            textShadow: '0 0 20px rgba(255, 20, 147, 0.8)',
          }}>
            Will you be my Valentine?
          </h1>
          
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex justify-center mt-6"
          >
            <Heart size={60} fill="#ff1493" color="#ff1493" />
          </motion.div>
        </motion.div>

        {/* Button */}
        {showButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            onClick={handleYesClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-[#ff1493] text-white text-2xl font-bold rounded-full shadow-lg hover:shadow-2xl transition-all"
            style={{
              boxShadow: '0 0 30px rgba(255, 20, 147, 0.6)',
            }}
          >
            Yes yes yesssss (can't say no) 💕
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
