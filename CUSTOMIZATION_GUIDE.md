# Valentine's Proposal Setup Guide

## Overview
This is an interactive Three-Level puzzle application to ask someone to be your Valentine using Next.js, Tailwind CSS, and Framer Motion.

## What's Already Built

### Level 1: Photo Puzzle
- A 3x3 sliding tile puzzle
- Uses a photo from your trip
- Player must solve the puzzle to advance
- Shows move counter and completion status

### Level 2: Password Challenge
- Secure "vault" that requires a password to unlock
- Configurable correct answers
- Shows hint system
- Smooth unlock animation

### Level 3: The Final Message
- Encrypted text that decodes with a Matrix-style effect
- Reveals: "Will you be my Valentine?"
- Confetti celebration effect
- Decorative Matrix-style code falling in background

## Customization Steps

### 1. Add Your Photo (IMPORTANT)
Replace the placeholder image for Level 1:

1. Add your trip photo to `public/` folder
2. Rename it to `trip-photo.jpg` OR update the filename in [src/components/Level1.tsx](src/components/Level1.tsx) at the line:
   ```
   backgroundImage: 'url(/trip-photo.jpg)',
   ```
3. Make sure the image is square or will be cropped to fit

### 2. Customize Level 2 Password
Edit [src/components/Level2.tsx](src/components/Level2.tsx):

Find the `correctPasswords` array (around line 15):
```typescript
const correctPasswords = ['02141820', '2-14-18-20', '02/14/18/20', 'favorite game', 'mario kart'];
```

Replace with your own correct answers:
- Add the date you first met in various formats
- Add your favorite game title or date
- Add any other meaningful passwords

Update the hints in the hint section to match your clues.

### 3. Customize Level 3 Message
Edit [src/components/Level3.tsx](src/components/Level3.tsx):

Update the `FINAL_MESSAGE` constant (line 7):
```typescript
const FINAL_MESSAGE = 'Will you be my Valentine?';
```

You can change this to any message you want!

## Running the Application

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Test all three levels before showing your valentine!

## Testing the Levels

### Level 1
- Click tiles to slide them
- Solve the puzzle to reveal the photo
- Click "Next Level" when complete

### Level 2
- Click "Show Hint" for guidance
- Enter one of the correct passwords
- Try different date formats (MMDDYYYY, MM-DD-YY-YY, MM/DD/YY/YY, etc.)
- Leave a blank after "favorite game" to transition

### Level 3
- Watch the Matrix-style decoding animation
- See confetti celebration
- The final message appears!

## Customizing Colors

The application uses a Matrix-green color scheme (#00ff41) with pink accents (#ff1493).

To change colors, edit [src/app/globals.css](src/app/globals.css):

```css
:root {
  --background: #050505;
  --foreground: #00ff41;      /* Main text color */
  --accent: #ff1493;           /* Accent color for hearts, buttons, etc */
}
```

Or update individual components' color classes (e.g., `bg-[#00ff41]` to your hex color)

## Deploying

To deploy to Vercel:

1. Push to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Main layout with metadata
│   ├── page.tsx            # Main page with state management
│   └── globals.css         # Global styles and CRT effect
├── components/
│   ├── Level1.tsx          # Photo slider puzzle
│   ├── Level2.tsx          # Password challenge
│   └── Level3.tsx          # Final reveal with confetti
└── public/
    └── trip-photo.jpg      # YOUR IMAGE (add this!)
```

## Tips & Tricks

- **Better animations**: Adjust `transition` durations in components
- **Different puzzle size**: Change the `gridSize` constant in Level1 (currently 3x3)
- **More confetti**: Adjust `particleCount` in Level3's confetti call
- **Custom fonts**: Add Google Fonts in layout.tsx

## Need Help?

All components use:
- **Framer Motion** for smooth animations
- **Lucide React** for icons
- **Tailwind CSS** for styling
- **Canvas Confetti** for celebrations

Good luck with your proposal! 💕
