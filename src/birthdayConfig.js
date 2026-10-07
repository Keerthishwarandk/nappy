
// ============================================================
//  🎂  BIRTHDAY WEBSITE — CENTRAL CONFIG FILE
//  Edit this file to customise ALL content on the page.
// ============================================================

const birthdayConfig = {

  // ── Person Details ──────────────────────────────────────────
  person: {
    name: "Sarah",                      // Birthday person's name
    age: 25,                            // Age they're turning
    birthdayDate: "2026-10-06",         // ISO date string (YYYY-MM-DD)
  },

  // ── Countdown Section ────────────────────────────────────────
  countdown: {
    title: "The Big Day Is Almost Here!",
    subtitle: "Get ready for something magical ✨",
  },

  // ── Surprise Message (shown after countdown / first reveal) ──
  surpriseMessage: {
    headline: "🎉 SURPRISE! 🎉",
    subheadline: "Happy Birthday, Pooja!",
    tagline: "Today is YOUR day — let's celebrate in our style!",
  },

  // ── Cake Section ─────────────────────────────────────────────
  cake: {
    candles: 4,          // Number of candles on the cake
    cakeLabel: "Cut the Cake! 🎂",
    // Audio that plays when the user cuts the cake
    // Replace with your own hosted audio URL
    cuttingAudioUrl: "/audio/hbds.mp3",
    // Fallback: a royalty-free birthday song URL
    // cuttingAudioUrl: "https://www.bensound.com/bensound-music/bensound-happybirthday.mp3",
  },

  // ── Long Birthday Message (banner reveal) ────────────────────
  birthdayMessage: {
    buttonLabel: "Open Your Birthday Letter 💌",
    // Full message — supports line breaks via "\n"
    message: `My dearest Enemy,

On this very special day, I want you to know just how incredibly loved and cherished you are. 
You light up every room you walk into with your warmth, your laughter, and your beautiful spirit.

Twenty-five years of YOU — twenty-five years of grace, courage, kindness, and joy. 
You've touched so many hearts without even knowing it.

May this year bring you everything you've ever dreamed of: 
success that fills your soul, adventures that take your breath away, 
and love that wraps around you like the warmest embrace.

Here's to you — the one who makes ordinary moments extraordinary. 
You deserve every bit of happiness the universe has to offer. 
Never stop shining. Never stop dreaming. Never stop being magnificently YOU.

With all the love in the world,
Your Friends & Family 💖`,
  },

  // ── Photo Booth ───────────────────────────────────────────────
  photoBooth: {
    buttonLabel: "Open Photo Booth 📸",
    // Each slide: { imageUrl, quote }
    // Replace imageUrl values with your own hosted image links
    slides: [
      {
        imageUrl: "/images/1.jpeg",
        quote: "Every birthday is a gift. Every day is a gift.",
      },
      {
        imageUrl: "/images/2.jpeg",
        quote: "Life is a party. Dress like it. 🎉",
      },
      {
        imageUrl: "/images/3.jpeg",
        quote: "May your day be as sweet as cake and as bright as candles.",
      },
      {
        imageUrl: "/images/4.jpeg",
        quote: "Adventure awaits — and so does your next chapter. ✨",
      },
      {
        imageUrl: "/images/5.jpeg",
        quote: "You are one in a million, and today the world celebrates YOU!",
      },
    ],
  },

  // ── Theme Colours (CSS custom-property values) ───────────────
  theme: {
    primary: "#FF6B9D",       // Hot pink
    secondary: "#C44569",     // Deep rose
    accent: "#FFD700",        // Gold
    bgFrom: "#0D0221",        // Dark purple
    bgTo: "#1A0533",          // Deep violet
    cardBg: "rgba(255,255,255,0.06)",
  },
};

export default birthdayConfig;
