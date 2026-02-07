'use client';

import { useState } from 'react';
import Level1 from '@/components/Level1';
import Level2 from '@/components/Level2';
import Level3 from '@/components/Level3';

export default function Home() {
  const [currentLevel, setCurrentLevel] = useState(1);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="w-full max-w-4xl px-4 py-8">
        {currentLevel === 1 && (
          <Level1 onComplete={() => setCurrentLevel(2)} />
        )}
        {currentLevel === 2 && (
          <Level2 onComplete={() => setCurrentLevel(3)} />
        )}
        {currentLevel === 3 && (
          <Level3 />
        )}
      </main>
    </div>
  );
}
