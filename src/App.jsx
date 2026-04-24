import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────

const THEMES = {
  light: {
    bg: "#f5ede0", bgAlt: "#faf7f2", bgCard: "#fffbf5", border: "#e8ddd0",
    borderAccent: "#c9955a", text: "#3d2b1a", textMuted: "#9a8570", textBody: "#5c4a2a",
    accent: "#c9955a", accentDark: "#8b4513", accentLight: "#e8b87a",
    gold: "#c9a84c", goldLight: "#e8c96d",
    headerGrad: "linear-gradient(135deg, #8b4513 0%, #c9955a 50%, #e8b87a 100%)",
    cardShadow: "0 4px 20px rgba(180,120,60,0.12)",
    tipBg: "#fef3e2", tipBorder: "#f0d9b0", tipText: "#7a5500",
    successBg: "#d4edda", successBorder: "#5a9e6f", successText: "#2d6a4f",
    inputBg: "#fff", inputBorder: "#c9b99a",
    rummyBg: "#f5ede0", rummyCard: "#fffbf5", rummyCardBorder: "#e8ddd0",
    rummyHeader: "linear-gradient(135deg, #3d2b1a 0%, #6b4c2a 100%)",
    rummyHeaderText: "#f5ede0", rummyMuted: "#9a8570",
    rummyAccent: "#c9a84c", rummyAccentLight: "#e8c96d",
    rummyDanger: "#c0392b", rummyTableBorder: "#e8ddd0", rummyInputBg: "#faf7f2",
    toggle: "#e8ddd0", toggleIcon: "🌙",
  },
  dark: {
    bg: "#0f1117", bgAlt: "#1a1f2e", bgCard: "#1a1f2e", border: "#2a3040",
    borderAccent: "#c9a84c", text: "#e8dfc8", textMuted: "#6b7a99", textBody: "#8891a8",
    accent: "#c9a84c", accentDark: "#a07830", accentLight: "#e8c96d",
    gold: "#c9a84c", goldLight: "#e8c96d",
    headerGrad: "linear-gradient(135deg, #1a1f2e 0%, #0f1117 100%)",
    cardShadow: "0 4px 20px rgba(0,0,0,0.4)",
    tipBg: "#1e2535", tipBorder: "#2a3040", tipText: "#c9a84c",
    successBg: "#1a2e1a", successBorder: "#5a9e6f", successText: "#7ecc94",
    inputBg: "#0f1117", inputBorder: "#2a3040",
    rummyBg: "#0f1117", rummyCard: "#1a1f2e", rummyCardBorder: "#2a3040",
    rummyHeader: "linear-gradient(135deg, #1a1f2e 0%, #0f1117 100%)",
    rummyHeaderText: "#e8dfc8", rummyMuted: "#6b7a99",
    rummyAccent: "#c9a84c", rummyAccentLight: "#e8c96d",
    rummyDanger: "#e87070", rummyTableBorder: "#2a3040", rummyInputBg: "#0f1117",
    toggle: "#2a3040", toggleIcon: "☀️",
  },
};

// ─── RECIPE DATA ──────────────────────────────────────────────────────────────

const RECIPES = {
  "tempeh-bowl": {
    title: "Tempeh Grain Bowl",
    emoji: "🥗",
    subtitle: "with Roasted Veggies & Tahini Dressing",
    stats: [["⏱", "~50 min"], ["🍽", "2 servings"], ["💪", "~40g protein"]],
    overview: [
      { step: "Gather", summary: "Collect all ingredients and equipment before starting." },
      { step: "Steam", summary: "Steam tempeh 10 min to remove bitterness." },
      { step: "Marinate", summary: "Cube tempeh and marinate 20+ min in soy, oil, maple, garlic, paprika." },
      { step: "Quinoa", summary: "Simmer quinoa in broth 15 min covered, rest 5 min off heat." },
      { step: "Roast veggies", summary: "Roast sweet potato first 5 min, then add remaining veggies at 400°F for 25 min total." },
      { step: "Sear tempeh", summary: "Sear marinated cubes 4 min per side until caramelized." },
      { step: "Dressing", summary: "Whisk tahini, lemon, garlic, soy sauce, and warm water until pourable." },
      { step: "Assemble", summary: "Grain base → veggies → tempeh → toppings → dressing." },
    ],
    steps: [
      {
        id: 0, title: "Gather everything", duration: null,
        instruction: "Before you start, get all of this ready:",
        gather: {
          ingredients: [
            "1 package tempeh (8 oz)", "1 cup quinoa (dry)", "2 cups vegetable broth",
            "1 sweet potato, cubed", "1 bell pepper, chopped", "1 red onion, cut into wedges",
            "1 head broccoli, cut into florets", "1 zucchini, chopped",
            "3 tbsp soy sauce", "2 tbsp olive oil", "1 tbsp maple syrup",
            "2 garlic cloves (minced)", "1 tsp smoked paprika",
            "¼ cup tahini", "Juice of 1 lemon", "1 tsp soy sauce (for dressing)",
            "Salt, pepper, red pepper flakes",
          ],
          equipment: [
            "Large skillet or sauté pan", "Medium saucepan (for quinoa)",
            "Steamer basket or sieve over boiling water", "Large baking sheet",
            "Cutting board + knife", "Small bowl (for marinade)",
            "Small bowl or jar (for dressing)", "Serving bowls",
          ],
        },
        tip: "Start the oven preheating to 400°F right now — it takes about 10–15 min and you'll need it ready for the veggies.",
      },
      {
        id: 1, title: "Steam the tempeh", duration: 10 * 60,
        instruction: "Fill a saucepan with about an inch of water and bring to a boil. Place tempeh in a steamer basket above the water, cover, and steam for 10 minutes. This removes the bitter taste tempeh naturally has. While it steams, prep your marinade in the next step.",
        tip: "Don't skip steaming — it makes a huge difference to the flavour. If you don't have a steamer basket, balance a colander over the pot.",
      },
      {
        id: 2, title: "Marinate the tempeh", duration: 20 * 60,
        instruction: "Remove tempeh from steamer and let it cool for 2 minutes. Cut into 1-inch cubes. In a bowl, mix together: 3 tbsp soy sauce, 2 tbsp olive oil, 1 tbsp maple syrup, 2 minced garlic cloves, and 1 tsp smoked paprika. Add tempeh cubes and toss to coat. Let marinate for at least 20 minutes — the longer the better. Use this time to cook your quinoa and prep veggies.",
        tip: "While tempeh marinates, get the quinoa going and your veggies into the oven — this is how you save time.",
      },
      {
        id: 3, title: "Cook the quinoa", duration: 20 * 60,
        instruction: "Rinse 1 cup quinoa under cold water in a fine-mesh sieve (this removes bitterness). Add it to a medium saucepan with 2 cups vegetable broth. Bring to a boil over high heat, then reduce to the lowest possible heat, cover with a lid, and simmer for 15 minutes. Then turn off the heat and let it sit covered for 5 more minutes. Fluff with a fork.",
        tip: "Using broth instead of water makes quinoa taste much better. Don't lift the lid while it simmers — the steam is doing the work.",
      },
      {
        id: 4, title: "Roast the veggies", duration: 25 * 60,
        instruction: "Spread sweet potato cubes on a large baking sheet, drizzle with olive oil, salt, and pepper, and roast at 400°F for 5 minutes. Then add bell pepper, red onion, broccoli, and zucchini to the same tray. Toss everything together and roast for another 20–25 minutes, until edges are caramelized and slightly charred.",
        tip: "Sweet potato takes longer than other veggies, which is why you add it first. Don't crowd the tray — spread veggies in a single layer or they'll steam instead of roast.",
      },
      {
        id: 5, title: "Sear the tempeh", duration: 8 * 60,
        instruction: "Heat 1 tbsp olive oil in a skillet over medium-high heat until shimmering. Add marinated tempeh cubes in a single layer — don't crowd. Sear for 3–4 minutes without moving them until a dark caramelized crust forms. Flip each cube and sear the other side for 3–4 more minutes. Pour any leftover marinade into the pan in the last minute.",
        tip: "Resist moving the tempeh — it needs time to build a crust. You'll know it's ready to flip when it releases easily from the pan.",
      },
      {
        id: 6, title: "Make the tahini dressing", duration: null,
        instruction: "In a small bowl, whisk together: ¼ cup tahini, juice of 1 lemon, 1 tsp soy sauce, 1 minced garlic clove, and 2–4 tbsp warm water. Add water gradually until the dressing is pourable but still thick. Taste and adjust — add more lemon for tang, more soy for depth, more water to thin.",
        tip: "Tahini seizes up when you first add liquid — keep whisking and it will come together. Warm water blends it much more smoothly than cold.",
      },
      {
        id: 7, title: "Assemble & serve", duration: null,
        instruction: "Build each bowl: start with a base of quinoa, then add roasted veggies, then tempeh on top. Drizzle generously with tahini dressing. Finish with a sprinkle of red pepper flakes and any optional toppings like sesame seeds, cucumber slices, or fresh herbs.",
        tip: "Don't be shy with the dressing — it ties everything together. Serve immediately while the tempeh is still crispy.",
      },
    ],
  },
};

const recipeData = {
  title: "Crispy Gnocchi with Cottage Cheese Sauce",
  emoji: "🥔",
  subtitle: "with Cottage Cheese Sauce, Chickpeas & Feta",
  stats: [["⏱", "~30 min"], ["🍽", "2 servings"], ["💪", "~35g protein"]],
  overview: [
    { step: "Gather", summary: "Collect all ingredients and equipment before starting." },
    { step: "Sauce", summary: "Blend cottage cheese, garlic, lemon, salt, pepper, and water until smooth." },
    { step: "Chickpeas", summary: "Crisp chickpeas in olive oil 5 min on medium-high, then set aside." },
    { step: "Gnocchi", summary: "Pan-fry gnocchi 3 min with lid on, flip and cook 2 more min until golden and soft inside." },
    { step: "Tomatoes", summary: "Blister cherry tomatoes in same pan until charred and burst (~3 min)." },
    { step: "Greens", summary: "Wilt spinach and heat peas in the pan (~90 sec)." },
    { step: "Combine", summary: "Return gnocchi + chickpeas, pour sauce, toss over low heat 1 min." },
    { step: "Plate", summary: "Top with crumbled feta and red pepper flakes. Serve immediately." },
  ],
  steps: [
    {
      id: 0, title: "Gather everything",
      instruction: "Before you start, get all of this ready:",
      duration: null,
      gather: {
        ingredients: [
          "1 package Trader Joe's gnocchi", "1 cup cottage cheese", "2 garlic cloves",
          "1 lemon", "½ cup cherry tomatoes", "½ cup frozen peas",
          "1 can chickpeas (15 oz), drained and patted dry", "2 large handfuls fresh spinach",
          "Feta cheese, for topping", "Olive oil", "Salt, pepper, red pepper flakes",
        ],
        equipment: [
          "Large skillet or sauté pan", "Blender or food processor", "Measuring cups",
          "Cutting board + knife", "Wooden spoon or spatula",
          "Paper towels (to dry chickpeas)", "Serving bowls",
        ],
      },
      tip: "Pat the chickpeas really dry with paper towels — this is the key to getting them crispy.",
    },
    { id: 1, title: "Make the sauce", instruction: "Blend 1 cup cottage cheese + 2 garlic cloves + juice of half a lemon + salt + pepper + 2–3 tbsp water until completely smooth. Taste and adjust salt. Set aside.", duration: null, tip: "The sauce should be pourable but thick. Add more water a splash at a time if needed." },
    { id: 2, title: "Crisp the chickpeas", instruction: "Heat 2 tbsp olive oil in a large skillet over medium-high heat. Add chickpeas in a single layer. Cook, shaking occasionally, until golden and crispy. Remove chickpeas and set aside on a plate.", duration: 5 * 60, tip: "Dry chickpeas = crispy chickpeas. Don't crowd the pan or they'll steam instead of crisp." },
    { id: 3, title: "Pan-fry the gnocchi", instruction: "In the same pan with remaining oil, add gnocchi in a single layer. Let them sear undisturbed for 3 minutes, then put the lid on for the last minute — the steam softens the inside while keeping the outside golden.", duration: 3 * 60, tip: "The lid is the key to getting them chewy and soft inside rather than tough. Don't skip it." },
    { id: 4, title: "Flip & finish gnocchi", instruction: "Remove the lid, flip gnocchi and cook the other side until golden. Remove gnocchi and set aside with the chickpeas.", duration: 2 * 60, tip: "They should have a golden crust on both sides and be soft and pillowy inside." },
    { id: 5, title: "Blister the tomatoes", instruction: "In the same pan, add cherry tomatoes. Let them sit on medium-high heat without stirring until the skin chars and they start to burst.", duration: 3 * 60, tip: "You'll hear them pop — that's what you want. A little char is good." },
    { id: 6, title: "Add spinach & peas", instruction: "Add spinach and frozen peas to the pan. Stir until spinach is wilted and peas are heated through.", duration: 90, tip: "Spinach wilts down a lot — don't be alarmed. Season with a pinch of salt." },
    { id: 7, title: "Bring it together", instruction: "Return gnocchi and chickpeas to the pan. Pour cottage cheese sauce over everything. Toss gently over low heat until everything is coated and warmed through.", duration: 60, tip: "Add a splash of water if the sauce feels too thick once it hits the hot pan." },
    { id: 8, title: "Plate & finish", instruction: "Plate it up. Top generously with crumbled feta and red pepper flakes. Serve immediately.", duration: null, tip: "More feta = more protein and more flavor. Don't be shy." },
  ],
};

RECIPES["gnocchi"] = recipeData;

RECIPES["panini"] = {
  title: "Veggie Amul Cheese Panini",
  emoji: "🥪",
  subtitle: "Crispy, buttery & melty with sautéed veggies",
  stats: [["⏱", "~20 min"], ["🍽", "1 serving"], ["💪", "~15g protein"]],
  overview: [
    { step: "Gather", summary: "Get all ingredients and equipment ready." },
    { step: "Sauté veggies", summary: "Cook bell pepper, zucchini/mushrooms, and onion in olive oil until soft and caramelized." },
    { step: "Assemble", summary: "Layer cheese on bread, add veggies, top with second slice, and butter the outside with garlic butter." },
    { step: "Press & grill", summary: "Press and cook until golden and crispy on both sides." },
    { step: "Rest & slice", summary: "Rest 1 min, then slice diagonally and serve immediately." },
  ],
  steps: [
    {
      id: 0, title: "Gather everything", duration: null,
      instruction: "Before you start, get all of this ready:",
      gather: {
        ingredients: [
          "2 thick slices of bread (sourdough or ciabatta work best)",
          "2 Amul cheese slices",
          "1 tbsp butter, softened",
          "½ bell pepper, thinly sliced",
          "½ small zucchini or a handful of mushrooms, thinly sliced",
          "¼ red onion, thinly sliced",
          "1 tsp olive oil",
          "Salt and pepper",
          "Optional: pinch of garlic powder (to mix into butter)",
          "Optional: green chutney, Dijon mustard, or pesto (for inside spread)",
        ],
        equipment: [
          "Skillet or frying pan (for veggies)",
          "Grill pan, second skillet, or panini press",
          "Spatula", "Small bowl (for garlic butter)",
          "Heavy pan or another spatula (to press the sandwich down)",
        ],
      },
      tip: "Sourdough or ciabatta are the best choices — soft sandwich bread gets soggy. Avoid it if you can.",
    },
    {
      id: 1, title: "Sauté the veggies", duration: 5 * 60,
      instruction: "Heat 1 tsp olive oil in a pan over medium-high heat. Add bell pepper, zucchini (or mushrooms), and red onion. Season with salt and pepper. Cook, stirring occasionally, until softened and slightly caramelized — about 4–5 minutes. Remove from heat and set aside.",
      tip: "For a big flavor upgrade, cook the onions on low heat for 10 minutes instead — they'll turn sweet and golden (caramelized onions). Only do this if you have the time.",
    },
    {
      id: 2, title: "Make garlic butter & assemble", duration: null,
      instruction: "Mix 1 tbsp softened butter with a pinch of garlic powder in a small bowl. Lay out your two bread slices. If using a spread (chutney, mustard, or pesto), add a thin layer to the inside of one slice now. Place Amul cheese slices on one piece of bread. Pile the sautéed veggies on top. Close the sandwich with the second slice. Spread the garlic butter evenly on both outer faces of the sandwich.",
      tip: "The butter goes on the outside — this is what makes it golden and crispy. Make sure you cover edge to edge.",
    },
    {
      id: 3, title: "Press & grill", duration: 3 * 60,
      instruction: "Heat a grill pan or skillet over medium heat. Place the sandwich in and press it down firmly with a heavy pan or spatula. Cook until the bottom is golden and crispy — about 3 minutes. Then flip carefully and press again. Cook the other side until equally golden.",
      tip: "Medium heat is key — too high and the bread burns before the cheese melts. You want a slow, even golden crust.",
    },
    {
      id: 4, title: "Rest & slice", duration: 60,
      instruction: "Remove the panini from the pan and let it rest for 1 minute on a cutting board. Then slice diagonally (corner to corner) and serve immediately.",
      tip: "Resting lets the cheese set slightly so it doesn't all pour out when you cut it. The diagonal slice also makes it easier to hold.",
    },
  ],
};

// ─── RUMMY DATA ───────────────────────────────────────────────────────────────

const CONTRACTS = [
  { round: 1, name: "Two Sets", desc: "2 sets of 3", cards: 10 },
  { round: 2, name: "One Set + One Run", desc: "1 set of 3 + 1 run of 4", cards: 10 },
  { round: 3, name: "Two Runs", desc: "2 runs of 4", cards: 10 },
  { round: 4, name: "Three Sets", desc: "3 sets of 3", cards: 10 },
  { round: 5, name: "Two Sets + One Run", desc: "2 sets of 3 + 1 run of 4", cards: 12 },
  { round: 6, name: "One Set + Two Runs", desc: "1 set of 3 + 2 runs of 4", cards: 12 },
  { round: 7, name: "Three Runs", desc: "3 runs of 4 (no discard)", cards: 12 },
];

const RULES = [
  { title: "Objective", text: "Complete specific contracts each round. Lowest total score after 7 rounds wins." },
  { title: "Buying", text: "If a card is discarded that you want, you may 'buy' it by drawing an extra card from the deck. Only 3 buys per round." },
  { title: "Going Out", text: "Lay down your full contract, then discard. The player who goes out scores 0 for that round." },
  { title: "Scoring", text: "Cards left in hand count against you: number cards = face value, J/Q/K = 10 pts, Ace = 15 pts, Joker = 25 pts." },
  { title: "Sets", text: "3 or more cards of the same rank (e.g. three 7s). Jokers can be used as wild cards — max 1 joker per set." },
  { title: "Runs", text: "4 or more consecutive cards of the same suit (e.g. 4-5-6-7 of hearts). Jokers can fill gaps — max 1 joker per run." },
  { title: "Round 7", text: "Final round — no discard when going out. You must use all cards in your hand." },
];

// ─── CABO DATA ────────────────────────────────────────────────────────────────

const CABO_STORAGE_KEY = "cabo-state";
const CABO_POWER_CARDS = [
  { label: "7 / 8", action: "Peek", desc: "Look at one of your own face-down cards." },
  { label: "9 / 10", action: "Spy", desc: "Look at one of an opponent's face-down cards." },
  { label: "J / Q", action: "Blind Swap", desc: "Swap one of your cards with an opponent's — neither player looks." },
  { label: "Black King", action: "Seen Swap", desc: "Swap one of your cards with an opponent's — you may look at both before deciding." },
  { label: "Red King", action: "0 pts", desc: "Worth 0 points. Keep it!" },
];
const defaultCaboState = () => ({ phase: "setup", playerCount: 4, names: Array(8).fill(""), scores: Array(8).fill(null).map(() => []), currentRound: 0 });
function loadCaboState() {
  try { const raw = localStorage.getItem(CABO_STORAGE_KEY); return raw ? JSON.parse(raw) : defaultCaboState(); } catch { return defaultCaboState(); }
}

// ─── CANASTA RULES ────────────────────────────────────────────────────────────

const CANASTA_RULES = [
  { title: "Overview", text: "Canasta is a team card game for 4 players (2 teams of 2). Use 2 standard decks + 4 jokers (108 cards total). Your team scores points by making melds — sets of 3+ cards of the same rank — and canastas (melds of 7+ cards). Most points after one or more rounds wins." },
  { title: "The Deal", text: "Each player is dealt 11 cards. The remaining cards form the draw pile (the stock). The top card is flipped to start the discard pile. If it's a wild card or red 3, keep flipping until a natural card appears." },
  { title: "Wild Cards", text: "Jokers and 2s are wild. They can substitute for any natural card in a meld, but a meld can never have more wild cards than natural cards. Wild cards cannot form melds on their own." },
  { title: "Red Threes", text: "If you draw or are dealt a red 3, place it face-up immediately and draw a replacement. Each red 3 is worth 100 points for your team at the end — but if your team hasn't melded anything, they count against you." },
  { title: "Black Threes", text: "Black 3s cannot be melded (except when going out). Discarding a black 3 freezes the discard pile for one turn — the next player cannot pick it up." },
  { title: "On Your Turn", text: "Draw 2 cards from the stock, OR pick up the entire discard pile (with conditions — see Picking Up the Pile). Then meld if you want to. Then discard one card to end your turn." },
  { title: "Picking Up the Pile", text: "You can take the entire discard pile if: (1) the top card is a natural card, (2) you can immediately meld it with 2+ natural cards from your hand, and (3) your team has already made their initial meld. The pile is frozen if it contains a wild card — in that case, you need 2 natural cards matching the top card." },
  { title: "Initial Meld Requirement", text: "Your team must make an initial meld worth a minimum number of points before you can add to existing melds or pick up the pile. The minimum depends on your team's current score: below 0 pts → 15 pts minimum; 0–1499 pts → 50 pts minimum; 1500–2999 pts → 90 pts minimum; 3000+ pts → 120 pts minimum." },
  { title: "Canastas", text: "A canasta is a completed meld of 7 or more cards. Natural canasta (no wilds): worth 500 points. Mixed canasta (with wilds): worth 300 points. You need at least one canasta before your team can go out." },
  { title: "Going Out", text: "To go out, a player must meld or add all their cards, with a final discard (optional). Your team must have at least one canasta. You may ask your partner 'May I go out?' — their answer is binding. Going out earns a 100-point bonus (or 200 if concealed — going out without previously melding anything)." },
  { title: "Scoring", text: "Card values: Joker = 50 pts, 2 = 20 pts, Ace = 20 pts, 8–K = 10 pts, 4–7 = 5 pts, Black 3 = 5 pts. Add the value of all melded cards, plus canasta bonuses and red 3 bonuses. Subtract the value of cards left in your hand. The game ends when a team reaches 5,000 points." },
];

// ─── DEFAULT NAMES ────────────────────────────────────────────────────────────

const DEFAULT_NAMES = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5", "Player 6", "Player 7", "Player 8"];
const STORAGE_KEY = "liverpool-rummy-state";
const defaultRummyState = () => ({ phase: "setup", playerCount: 5, names: [...DEFAULT_NAMES], scores: Array(5).fill(null).map(() => []), currentRound: 0 });
function loadRummyState() {
  try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) : defaultRummyState(); } catch { return defaultRummyState(); }
}

// ─── SHARED UTILS ─────────────────────────────────────────────────────────────

function formatTime(seconds) {
  const m = Math.floor(seconds / 60), s = seconds % 60;
  if (m === 0) return `${s}s`;
  if (s === 0) return `${m}m`;
  return `${m}m ${s}s`;
}

// ─── TIMER (stateless display, state lives in parent) ─────────────────────────

function TimerButton({ stepId, duration, timerState, onTimerAction, t }) {
  const { timeLeft, running, done } = timerState;
  const progress = 1 - timeLeft / duration;
  const circumference = 2 * Math.PI * 18;
  const btnBg = done ? t.successBg : running ? t.tipBg : t.bgAlt;
  const btnBorder = done ? t.successBorder : running ? t.gold : t.inputBorder;
  const btnColor = done ? t.successText : running ? t.tipText : t.textBody;

  return (
    <button onClick={() => onTimerAction(stepId)} style={{
      display: "flex", alignItems: "center", gap: "10px",
      background: btnBg, border: `2px solid ${btnBorder}`,
      borderRadius: "40px", padding: "8px 16px 8px 10px",
      cursor: "pointer", fontFamily: "inherit", fontSize: "14px",
      fontWeight: 600, color: btnColor, transition: "all 0.2s", marginTop: "10px",
    }}>
      <svg width="40" height="40" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke={t.border} strokeWidth="3" />
        <circle cx="20" cy="20" r="18" fill="none" stroke={btnBorder} strokeWidth="3"
          strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)}
          strokeLinecap="round" transform="rotate(-90 20 20)"
          style={{ transition: "stroke-dashoffset 1s linear" }} />
        <text x="20" y="20" textAnchor="middle" dominantBaseline="central"
          fontSize="9" fontWeight="700" fill={btnColor} fontFamily="inherit">
          {done ? "✓" : formatTime(timeLeft)}
        </text>
      </svg>
      {done ? "Done! Reset" : running ? "Tap to pause" : `Start ${formatTime(duration)} timer`}
    </button>
  );
}

// ─── ACTIVE TIMERS BAR ────────────────────────────────────────────────────────

function ActiveTimersBar({ timerStates, steps, onTimerAction, t }) {
  const running = steps.filter(s => s.duration && timerStates[s.id]?.running);
  if (running.length === 0) return null;
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20,
      background: t.tipBg, borderBottom: `2px solid ${t.tipBorder}`,
      padding: "10px 16px", display: "flex", gap: "10px", flexWrap: "wrap",
      alignItems: "center",
    }}>
      <span style={{ fontSize: "12px", fontWeight: 700, color: t.tipText, textTransform: "uppercase", letterSpacing: "0.06em" }}>⏱ Running</span>
      {running.map(step => {
        const ts = timerStates[step.id];
        return (
          <div key={step.id} onClick={() => onTimerAction(step.id)} style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: t.bgCard, border: `1px solid ${t.gold}`,
            borderRadius: "20px", padding: "5px 12px", cursor: "pointer",
            fontSize: "13px", fontWeight: 600, color: t.tipText,
          }}>
            <span>{step.title}</span>
            <span style={{ color: t.accent, fontVariantNumeric: "tabular-nums" }}>{formatTime(ts.timeLeft)}</span>
            <span style={{ fontSize: "11px", color: t.textMuted }}>⏸</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── RECIPE COMPONENTS ────────────────────────────────────────────────────────

function CheckItem({ label, t }) {
  const [checked, setChecked] = useState(false);
  return (
    <div onClick={() => setChecked(!checked)} style={{
      display: "flex", alignItems: "flex-start", gap: "8px",
      padding: "4px 0", cursor: "pointer", opacity: checked ? 0.45 : 1, transition: "opacity 0.2s",
    }}>
      <div style={{
        minWidth: "18px", height: "18px", borderRadius: "4px",
        border: `2px solid ${checked ? t.successBorder : t.inputBorder}`,
        background: checked ? t.successBorder : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: "1px", transition: "all 0.2s",
      }}>
        {checked && <span style={{ color: "#fff", fontSize: "11px", fontWeight: 800 }}>✓</span>}
      </div>
      <span style={{ fontSize: "13px", color: t.textBody, lineHeight: 1.4, textDecoration: checked ? "line-through" : "none" }}>{label}</span>
    </div>
  );
}

function GatherSection({ gather, t, scaleIngredient }) {
  const scale = scaleIngredient || (x => x);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "10px" }}>
      {[["🛒 Ingredients", gather.ingredients], ["🍳 Equipment", gather.equipment]].map(([label, items]) => (
        <div key={label}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: t.accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>{label}</div>
          {items.map((item, i) => <CheckItem key={i} label={label.includes("Ingredients") ? scale(item) : item} t={t} />)}
        </div>
      ))}
    </div>
  );
}

function StepCard({ step, index, expanded, onToggle, timerState, onTimerAction, t, scaleIngredient }) {
  const hasTimer = !!step.duration;
  const timerRunning = hasTimer && timerState?.running;
  const timerDone = hasTimer && timerState?.done;

  return (
    <div style={{
      background: expanded ? t.bgCard : t.bgAlt,
      border: `2px solid ${expanded ? t.borderAccent : timerRunning ? t.gold : t.border}`,
      borderRadius: "16px", padding: "18px 22px", cursor: "pointer",
      transition: "all 0.25s", boxShadow: expanded ? t.cardShadow : "none",
    }}>
      <div onClick={onToggle} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{
          minWidth: "34px", height: "34px", borderRadius: "50%",
          background: expanded ? t.accent : timerRunning ? t.gold : t.border,
          color: expanded || timerRunning ? "#fff" : t.textMuted,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: index === 0 ? "16px" : "14px", transition: "all 0.25s", flexShrink: 0,
        }}>
          {index === 0 ? "📋" : index}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "16px", fontWeight: 700, color: t.text }}>
            {step.title}
          </div>
          {!expanded && hasTimer && (
            <div style={{ fontSize: "12px", color: timerRunning ? t.gold : timerDone ? t.successText : t.textMuted, marginTop: "2px" }}>
              {timerRunning ? `⏱ ${formatTime(timerState.timeLeft)} remaining` : timerDone ? "✓ Done" : `⏱ ${formatTime(step.duration)}`}
            </div>
          )}
        </div>
        <div style={{ fontSize: "18px", color: t.textMuted, transition: "transform 0.2s", transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}>›</div>
      </div>

      {expanded && (
        <div style={{ animation: "fadeIn 0.25s ease", marginTop: "14px" }}>
          <p style={{ margin: "0 0 10px", color: t.textBody, fontSize: "15px", lineHeight: "1.6" }}>{step.instruction}</p>
          {step.gather && <GatherSection gather={step.gather} t={t} scaleIngredient={scaleIngredient} />}
          {step.tip && (
            <div style={{ background: t.tipBg, border: `1px solid ${t.tipBorder}`, borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: t.tipText, display: "flex", gap: "8px", alignItems: "flex-start", marginTop: "12px" }}>
              <span style={{ fontSize: "16px" }}>💡</span>
              <span>{step.tip}</span>
            </div>
          )}
          {hasTimer && (
            <TimerButton stepId={step.id} duration={step.duration} timerState={timerState} onTimerAction={onTimerAction} t={t} />
          )}
        </div>
      )}
    </div>
  );
}

// ─── OVERVIEW DROPDOWN ────────────────────────────────────────────────────────

function OverviewDropdown({ overview, t, onClose }) {
  return (
    <div style={{
      position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
      background: t.bgCard, border: `1px solid ${t.border}`,
      borderRadius: "14px", marginTop: "8px", padding: "16px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <div style={{ fontSize: "12px", fontWeight: 700, color: t.accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>Recipe Overview</div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, fontSize: "18px", lineHeight: 1 }}>✕</button>
      </div>
      {overview.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "10px" }}>
          <div style={{
            minWidth: "24px", height: "24px", borderRadius: "50%", background: t.bgAlt,
            border: `1px solid ${t.border}`, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: "11px", fontWeight: 700, color: t.textMuted, flexShrink: 0,
          }}>{i + 1}</div>
          <div>
            <span style={{ fontSize: "13px", fontWeight: 700, color: t.text }}>{item.step}: </span>
            <span style={{ fontSize: "13px", color: t.textBody }}>{item.summary}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ALARM SOUND ─────────────────────────────────────────────────────────────
// Shared AudioContext reused across calls — iOS requires resume() from user gesture

let sharedAudioCtx = null;

function getAudioCtx() {
  if (!sharedAudioCtx) sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return sharedAudioCtx;
}

function unlockAudioCtx() {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  } catch (e) {}
}

function playAlarm() {
  try {
    const ctx = getAudioCtx();
    if (ctx.state === "suspended") ctx.resume();
    const beepTones = [880, 1100, 880, 1100];
    beepTones.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.value = freq;
      const start = ctx.currentTime + i * 0.25;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.4, start + 0.02);
      gain.gain.linearRampToValueAtTime(0, start + 0.2);
      osc.start(start);
      osc.stop(start + 0.25);
    });
  } catch (e) {}
}

// ─── RECIPE VIEW ──────────────────────────────────────────────────────────────

function RecipeView({ t, onBack, recipe }) {
  const r = recipe || recipeData;

  // Servings scaler
  const baseServings = r.baseServings || parseInt(r.stats.find(([i]) => i === "🍽")?.[1]) || 2;
  const [servings, setServings] = useState(baseServings);
  const scale = servings / baseServings;

  // Scale a quantity string like "1 cup", "2 tbsp", "½", "3", "1 package" etc.
  const scaleAmount = (str) => {
    if (scale === 1) return str;
    // Match leading number/fraction: e.g. "1½", "½", "2", "¼", "3–4"
    const fracMap = { "¼": 0.25, "½": 0.5, "¾": 0.75, "⅓": 0.333, "⅔": 0.667, "⅛": 0.125 };
    let s = str;
    let num = 0;
    // Replace unicode fractions
    const fracRegex = /[¼½¾⅓⅔⅛]/;
    const match = s.match(/^(\d+)?\s*([¼½¾⅓⅔⅛])?(.*)$/);
    if (match) {
      const whole = match[1] ? parseInt(match[1]) : 0;
      const frac = match[2] ? fracMap[match[2]] : 0;
      const rest = match[3] || "";
      if (whole > 0 || frac > 0) {
        num = (whole + frac) * scale;
        // Format nicely
        let formatted;
        if (Number.isInteger(num)) formatted = String(num);
        else if (Math.abs(num - Math.round(num * 4) / 4) < 0.01) {
          const rounded = Math.round(num * 4) / 4;
          const w = Math.floor(rounded);
          const f = rounded - w;
          const fracOut = { 0.25: "¼", 0.5: "½", 0.75: "¾", 0.333: "⅓", 0.667: "⅔" }[Math.round(f * 12) / 12] || "";
          formatted = (w > 0 ? String(w) : "") + fracOut;
          if (!formatted) formatted = rounded.toFixed(1);
        } else {
          formatted = (Math.round(num * 4) / 4).toFixed(1).replace(/\.0$/, "");
        }
        return formatted + rest;
      }
    }
    return str;
  };

  const scaleIngredient = (ingredient) => {
    if (scale === 1) return ingredient;
    return ingredient.replace(/^[\d¼½¾⅓⅔⅛][^\w]*/, (match) => scaleAmount(match));
  };

  // All steps expanded by default
  const [expandedSteps, setExpandedSteps] = useState(() => new Set(r.steps.map(s => s.id)));
  const [showOverview, setShowOverview] = useState(false);

  // Timer state lifted here so timers persist across step expansions
  const [timerStates, setTimerStates] = useState(() => {
    const init = {};
    r.steps.forEach(s => {
      if (s.duration) init[s.id] = { timeLeft: s.duration, running: false, done: false };
    });
    return init;
  });
  const intervalsRef = useRef({});
  const audioUnlockedRef = useRef(false);

  const unlockAudio = () => {
    if (audioUnlockedRef.current) return;
    unlockAudioCtx();
    audioUnlockedRef.current = true;
  };

  // Tick all running timers
  useEffect(() => {
    const tick = setInterval(() => {
      setTimerStates(prev => {
        const next = { ...prev };
        let changed = false;
        Object.keys(next).forEach(id => {
          const ts = next[id];
          if (ts.running && ts.timeLeft > 0) {
            next[id] = { ...ts, timeLeft: ts.timeLeft - 1 };
            changed = true;
          } else if (ts.running && ts.timeLeft <= 0) {
            next[id] = { ...ts, running: false, done: true, timeLeft: 0 };
            changed = true;
            playAlarm();
            setTimeout(() => showToast(parseInt(id)), 0);
          }
        });
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  const handleTimerAction = (stepId) => {
    unlockAudio();
    setTimerStates(prev => {
      const ts = prev[stepId];
      const step = r.steps.find(s => s.id === stepId);
      if (ts.done) return { ...prev, [stepId]: { timeLeft: step.duration, running: false, done: false } };
      return { ...prev, [stepId]: { ...ts, running: !ts.running } };
    });
  };

  const [toast, setToast] = useState(null); // { title, stepNum }
  const toastTimerRef = useRef(null);

  const showToast = (stepId) => {
    const step = r.steps.find(s => s.id === stepId);
    const stepNum = r.steps.indexOf(step);
    setToast({ title: step.title, stepNum });
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 5000);
  };

  const allExpanded = expandedSteps.size === r.steps.length;
  const toggleAll = () => {
    if (allExpanded) setExpandedSteps(new Set());
    else setExpandedSteps(new Set(r.steps.map(s => s.id)));
  };
  const toggleStep = (id) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Lora', Georgia, serif", paddingBottom: "60px" }}>

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          zIndex: 999, animation: "toastIn 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          pointerEvents: "none",
        }}>
          <div style={{
            background: t.successBg, border: `2px solid ${t.successBorder}`,
            borderRadius: "16px", padding: "14px 20px",
            display: "flex", alignItems: "center", gap: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            minWidth: "260px", maxWidth: "90vw",
          }}>
            <div style={{ fontSize: "28px" }}>✅</div>
            <div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: t.successText, textTransform: "uppercase", letterSpacing: "0.08em" }}>Step {toast.stepNum} Complete</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: t.successText, fontFamily: "'Playfair Display', Georgia, serif" }}>{toast.title}</div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ background: t.headerGrad, padding: "20px 24px 16px", textAlign: "center", position: "relative" }}>
        <button onClick={onBack} style={{ position: "absolute", left: 16, top: 20, background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "20px", cursor: "pointer", padding: "6px 12px" }}>←</button>
        <div style={{ fontSize: "36px", marginBottom: "4px" }}>{r.emoji}</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "22px", fontWeight: 900, color: "#fff", margin: "0 0 4px", lineHeight: 1.2 }}>{r.title.split(" with")[0]}</h1>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", fontWeight: 600 }}>{r.subtitle}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "12px", flexWrap: "wrap", alignItems: "center" }}>
          {r.stats.map(([icon, label]) => {
            if (icon === "🍽") {
              return (
                <div key="servings" style={{ background: "rgba(255,255,255,0.2)", borderRadius: "20px", padding: "4px 6px 4px 12px", fontSize: "12px", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                  🍽 {servings} serving{servings !== 1 ? "s" : ""}
                  <button onClick={() => setServings(s => Math.max(1, s - 1))} style={{ background: "rgba(255,255,255,0.25)", border: "none", borderRadius: "50%", width: 22, height: 22, color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>−</button>
                  <button onClick={() => setServings(s => Math.min(20, s + 1))} style={{ background: "rgba(255,255,255,0.25)", border: "none", borderRadius: "50%", width: 22, height: 22, color: "#fff", fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>+</button>
                </div>
              );
            }
            return (
              <div key={label} style={{ background: "rgba(255,255,255,0.2)", borderRadius: "20px", padding: "4px 12px", fontSize: "12px", color: "#fff", fontWeight: 600 }}>{icon} {label}</div>
            );
          })}
        </div>
      </div>

      {/* Active timers bar */}
      <ActiveTimersBar timerStates={timerStates} steps={r.steps} onTimerAction={handleTimerAction} t={t} />

      {/* Controls row */}
      <div style={{ padding: "14px 16px 0", maxWidth: "600px", margin: "0 auto", position: "relative" }}>
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          {/* Overview button */}
          <button onClick={() => setShowOverview(v => !v)} style={{
            flex: 1, padding: "10px 14px", borderRadius: "10px",
            border: `1px solid ${showOverview ? t.accent : t.border}`,
            background: showOverview ? t.accent : t.bgCard,
            color: showOverview ? "#fff" : t.textBody,
            fontFamily: "inherit", fontWeight: 600, fontSize: "13px", cursor: "pointer",
          }}>
            📋 Overview {showOverview ? "▲" : "▼"}
          </button>
          {/* Collapse/expand all */}
          <button onClick={toggleAll} style={{
            flex: 1, padding: "10px 14px", borderRadius: "10px",
            border: `1px solid ${t.border}`, background: t.bgCard,
            color: t.textBody, fontFamily: "inherit", fontWeight: 600, fontSize: "13px", cursor: "pointer",
          }}>
            {allExpanded ? "⊖ Collapse All" : "⊕ Expand All"}
          </button>
        </div>

        {/* Overview dropdown */}
        {showOverview && (
          <OverviewDropdown overview={r.overview} t={t} onClose={() => setShowOverview(false)} />
        )}
      </div>

      {/* Steps */}
      <div style={{ padding: "0 16px", maxWidth: "600px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {r.steps.map((step, i) => (
            <StepCard
              key={step.id}
              step={step}
              index={i}
              expanded={expandedSteps.has(step.id)}
              onToggle={() => toggleStep(step.id)}
              timerState={step.duration ? timerStates[step.id] : null}
              onTimerAction={handleTimerAction}
              t={t}
              scaleIngredient={scaleIngredient}
            />
          ))}
        </div>

        {/* Done banner */}
        <div style={{ marginTop: "20px", background: t.successBg, border: `2px solid ${t.successBorder}`, borderRadius: "14px", padding: "16px 20px", textAlign: "center", color: t.successText, fontWeight: 700, fontSize: "16px" }}>
          🎉 Enjoy your meal!
        </div>
      </div>
    </div>
  );
}

// ─── RUMMY COMPONENTS ─────────────────────────────────────────────────────────

function LiverpoolRummy({ t, onBack }) {
  const saved = loadRummyState();
  const [phase, setPhase] = useState(saved.phase);
  const [playerCount, setPlayerCount] = useState(saved.playerCount || 5);
  const [names, setNames] = useState(saved.names);
  const [scores, setScores] = useState(saved.scores);
  const [currentRound, setCurrentRound] = useState(saved.currentRound);
  const [inputs, setInputs] = useState(Array(8).fill(""));
  const [showContract, setShowContract] = useState(true);
  const [showRules, setShowRules] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ phase, playerCount, names, scores, currentRound })); } catch {}
  }, [phase, playerCount, names, scores, currentRound]);

  const totalScore = (i) => scores[i]?.reduce((a, b) => a + b, 0) ?? 0;
  const handleNameChange = (i, val) => { const n = [...names]; n[i] = val; setNames(n); };
  const handleStart = () => {
    setNames(DEFAULT_NAMES.slice(0, playerCount).map((n, i) => names[i] || n));
    setScores(Array(playerCount).fill(null).map(() => []));
    setPhase("game"); setShowContract(true);
  };
  const handleInputChange = (i, val) => { const arr = [...inputs]; arr[i] = val; setInputs(arr); };
  const handleSubmitRound = () => {
    const newScores = scores.map((s, i) => { const val = parseInt(inputs[i], 10); return [...s, isNaN(val) ? 0 : val]; });
    setScores(newScores); setInputs(Array(8).fill(""));
    if (currentRound + 1 >= CONTRACTS.length) { setPhase("end"); } else { setCurrentRound(currentRound + 1); setShowContract(true); }
  };
  const handleBack = () => {
    if (phase === "end") { setPhase("game"); setCurrentRound(CONTRACTS.length - 1); setScores(scores.map(s => s.slice(0, -1))); setInputs(Array(8).fill("")); setShowContract(true); return; }
    if (currentRound === 0) return;
    setScores(scores.map(s => s.slice(0, -1))); setCurrentRound(currentRound - 1); setInputs(Array(8).fill("")); setShowContract(true);
  };
  const handleRestart = () => {
    setPhase("setup"); setNames(DEFAULT_NAMES.slice(0, 8)); setScores(Array(playerCount).fill(null).map(() => []));
    setCurrentRound(0); setInputs(Array(8).fill("")); setShowContract(true); setShowRules(false); setShowRestart(false);
    localStorage.removeItem(STORAGE_KEY);
  };
  const getRanking = () => [...names].slice(0, playerCount).map((name, i) => ({ name, total: totalScore(i) })).sort((a, b) => a.total - b.total);
  const contract = CONTRACTS[currentRound];

  const btn = (label, onClick, style = {}) => (
    <button onClick={onClick} style={{ background: "transparent", border: `1px solid ${t.border}`, borderRadius: 6, color: t.textMuted, fontSize: 12, padding: "6px 14px", cursor: "pointer", fontFamily: "Georgia, serif", ...style }}>{label}</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: t.rummyBg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.rummyHeader, borderBottom: `1px solid ${t.rummyCardBorder}`, padding: "20px 24px 16px", textAlign: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ position: "absolute", left: 16, top: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", color: t.rummyHeaderText, fontSize: "20px", cursor: "pointer", padding: "6px 12px" }}>←</button>
        <div style={{ fontSize: 11, letterSpacing: 4, color: t.rummyMuted, textTransform: "uppercase", marginBottom: 4 }}>Card Game Tracker</div>
        <div style={{ fontSize: 24, fontWeight: "bold", color: t.rummyHeaderText, letterSpacing: 1 }}>Liverpool Rummy</div>
        {phase === "game" && <div style={{ fontSize: 13, color: t.rummyMuted, marginTop: 4 }}>Round {currentRound + 1} of {CONTRACTS.length}</div>}
        {phase !== "setup" && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
            {btn("📖 Rules", () => setShowRules(!showRules), { color: t.rummyAccent, border: `1px solid ${t.rummyAccent}55` })}
            {btn("🔄 Restart", () => setShowRestart(true), { color: t.rummyDanger, border: `1px solid ${t.rummyDanger}55` })}
          </div>
        )}
      </div>

      {showRules && (
        <div style={{ background: t.bgAlt, borderBottom: `1px solid ${t.border}`, padding: "16px 24px" }}>
          {RULES.map(r => (
            <div key={r.title} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: t.rummyAccent, fontWeight: "bold", marginBottom: 2 }}>{r.title}</div>
              <div style={{ fontSize: 13, color: t.textBody, lineHeight: 1.5 }}>{r.text}</div>
            </div>
          ))}
          {btn("Close ✕", () => setShowRules(false), { marginTop: 4, color: t.textMuted })}
        </div>
      )}

      {showRestart && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px" }}>
          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "28px 24px", maxWidth: 320, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: "bold", color: t.text, marginBottom: 8 }}>Restart Game?</div>
            <div style={{ fontSize: 13, color: t.textBody, marginBottom: 20 }}>All scores will be cleared.</div>
            <div style={{ display: "flex", gap: 10 }}>
              {btn("Cancel", () => setShowRestart(false), { flex: 1, padding: "12px" })}
              <button onClick={handleRestart} style={{ flex: 1, background: t.rummyDanger, border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: "bold", padding: "12px", cursor: "pointer", fontFamily: "Georgia, serif" }}>Restart</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 540, margin: "0 auto", padding: "24px 16px" }}>
        {phase === "setup" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: t.rummyMuted, textTransform: "uppercase", marginBottom: 8 }}>New Game</div>
              <div style={{ fontSize: 26, fontWeight: "bold", color: t.text }}>How many players?</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
              {[2, 3, 4, 5, 6, 7, 8].map(n => (
                <button key={n} onClick={() => setPlayerCount(n)} style={{ width: 42, height: 42, borderRadius: "50%", border: `2px solid ${playerCount === n ? t.rummyAccent : t.border}`, background: playerCount === n ? t.rummyAccent : "transparent", color: playerCount === n ? "#0f1117" : t.text, fontSize: 16, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.2s" }}>{n}</button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: t.rummyMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Player Names</div>
            {Array.from({ length: playerCount }).map((_, i) => (
              <input key={i} value={names[i] || ""} onChange={e => handleNameChange(i, e.target.value)} placeholder={DEFAULT_NAMES[i]} style={{ display: "block", width: "100%", boxSizing: "border-box", background: t.rummyInputBg, border: `1px solid ${t.border}`, borderRadius: 10, color: t.text, fontSize: 15, padding: "12px 14px", marginBottom: 8, outline: "none", fontFamily: "Georgia, serif" }} />
            ))}
            <button onClick={handleStart} style={{ width: "100%", marginTop: 16, background: `linear-gradient(135deg, ${t.rummyAccent}, ${t.rummyAccentLight})`, color: "#0f1117", border: "none", borderRadius: 12, padding: "16px", fontSize: 17, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>Start Game →</button>
          </div>
        )}

        {phase === "game" && (
          <div>
            {showContract && (
              <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "20px 20px 16px", marginBottom: 20, textAlign: "center" }}>
                <div style={{ fontSize: 11, letterSpacing: 4, color: t.rummyMuted, textTransform: "uppercase", marginBottom: 6 }}>Round {currentRound + 1}</div>
                <div style={{ fontSize: 22, fontWeight: "bold", color: t.rummyAccent, marginBottom: 4 }}>{contract.name}</div>
                <div style={{ fontSize: 15, color: t.text, marginBottom: 4 }}>{contract.desc}</div>
                <div style={{ fontSize: 13, color: t.rummyMuted }}>Deal {contract.cards} cards</div>
                {currentRound === 6 && <div style={{ fontSize: 12, color: t.rummyAccent, marginTop: 8, fontStyle: "italic" }}>★ Final round — no discard allowed</div>}
                <div style={{ marginTop: 14 }}>{btn("Got it ✓", () => setShowContract(false))}</div>
              </div>
            )}
            {!showContract && (
              <button onClick={() => setShowContract(true)} style={{ marginBottom: 16, background: "transparent", border: `1px solid ${t.border}`, borderRadius: 6, color: t.rummyAccent, fontSize: 12, padding: "6px 14px", cursor: "pointer", fontFamily: "Georgia, serif" }}>↑ Show Contract</button>
            )}
            <div style={{ fontSize: 13, color: t.rummyMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Enter Scores</div>
            {names.slice(0, playerCount).map((name, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, color: t.text }}>{name}</div>
                  <div style={{ fontSize: 12, color: t.rummyMuted }}>Total: {totalScore(i)}</div>
                </div>
                <input type="number" value={inputs[i]} onChange={e => handleInputChange(i, e.target.value)} placeholder="pts" style={{ width: 72, background: t.rummyInputBg, border: `1px solid ${t.border}`, borderRadius: 6, color: t.text, fontSize: 16, padding: "8px 10px", outline: "none", textAlign: "center", fontFamily: "Georgia, serif" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {currentRound > 0 && (
                <button onClick={handleBack} style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "15px", fontSize: 15, color: t.textBody, cursor: "pointer", fontFamily: "Georgia, serif" }}>← Back</button>
              )}
              <button onClick={handleSubmitRound} style={{ flex: 3, background: `linear-gradient(135deg, ${t.rummyAccent}, ${t.rummyAccentLight})`, color: "#0f1117", border: "none", borderRadius: 10, padding: "15px", fontSize: 16, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>
                {currentRound + 1 < CONTRACTS.length ? "Submit & Next Round →" : "Submit Final Round"}
              </button>
            </div>
            {scores[0]?.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 13, color: t.rummyMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Scoreboard</div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", color: t.rummyMuted, padding: "6px 8px", borderBottom: `1px solid ${t.border}` }}>Player</th>
                        {scores[0].map((_, r) => <th key={r} style={{ color: t.rummyMuted, padding: "6px 8px", borderBottom: `1px solid ${t.border}`, textAlign: "center" }}>R{r + 1}</th>)}
                        <th style={{ color: t.rummyAccent, padding: "6px 8px", borderBottom: `1px solid ${t.border}`, textAlign: "center" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {names.slice(0, playerCount).map((name, i) => (
                        <tr key={i}>
                          <td style={{ padding: "8px 8px", color: t.text, borderBottom: `1px solid ${t.bgAlt}` }}>{name}</td>
                          {scores[i].map((s, r) => <td key={r} style={{ padding: "8px 8px", color: t.textBody, textAlign: "center", borderBottom: `1px solid ${t.bgAlt}` }}>{s}</td>)}
                          <td style={{ padding: "8px 8px", color: t.rummyAccent, fontWeight: "bold", textAlign: "center", borderBottom: `1px solid ${t.bgAlt}` }}>{totalScore(i)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "end" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: t.rummyMuted, textTransform: "uppercase", marginBottom: 8 }}>Game Over</div>
              <div style={{ fontSize: 28, fontWeight: "bold", color: t.text }}>Final Results</div>
              <div style={{ fontSize: 13, color: t.rummyMuted, marginTop: 4 }}>Lowest score wins</div>
            </div>
            {getRanking().map((p, rank) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 14, background: rank === 0 ? t.bgCard : t.bgAlt, border: `1px solid ${rank === 0 ? t.rummyAccent + "88" : t.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
                <div style={{ fontSize: rank === 0 ? 22 : 18, width: 36, textAlign: "center", color: rank === 0 ? t.rummyAccent : t.rummyMuted }}>{rank === 0 ? "🏆" : `#${rank + 1}`}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 17, color: rank === 0 ? t.text : t.textBody, fontWeight: rank === 0 ? "bold" : "normal" }}>{p.name}</div></div>
                <div style={{ fontSize: 20, color: rank === 0 ? t.rummyAccent : t.rummyMuted, fontWeight: "bold" }}>{p.total}</div>
              </div>
            ))}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, color: t.rummyMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Full Scoreboard</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", color: t.rummyMuted, padding: "6px 8px", borderBottom: `1px solid ${t.border}` }}>Player</th>
                      {CONTRACTS.map((_, r) => <th key={r} style={{ color: t.rummyMuted, padding: "6px 8px", borderBottom: `1px solid ${t.border}`, textAlign: "center" }}>R{r + 1}</th>)}
                      <th style={{ color: t.rummyAccent, padding: "6px 8px", borderBottom: `1px solid ${t.border}`, textAlign: "center" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {names.slice(0, playerCount).map((name, i) => (
                      <tr key={i}>
                        <td style={{ padding: "8px 8px", color: t.text, borderBottom: `1px solid ${t.bgAlt}` }}>{name}</td>
                        {scores[i].map((s, r) => <td key={r} style={{ padding: "8px 8px", color: t.textBody, textAlign: "center", borderBottom: `1px solid ${t.bgAlt}` }}>{s}</td>)}
                        <td style={{ padding: "8px 8px", color: t.rummyAccent, fontWeight: "bold", textAlign: "center", borderBottom: `1px solid ${t.bgAlt}` }}>{totalScore(i)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={handleBack} style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "15px", fontSize: 15, color: t.textBody, cursor: "pointer", fontFamily: "Georgia, serif" }}>← Back</button>
              <button onClick={handleRestart} style={{ flex: 3, background: `linear-gradient(135deg, ${t.rummyAccent}, ${t.rummyAccentLight})`, color: "#0f1117", border: "none", borderRadius: 10, padding: "15px", fontSize: 16, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CABO TRACKER ─────────────────────────────────────────────────────────────

const CABO_RULES = [
  { title: "Objective", text: "Have the lowest total card value when the round ends. Kings = 0 pts, Aces = 1 pt, number cards = face value, J/Q = 10 pts." },
  { title: "The Deal", text: "Each player is dealt 4 cards face-down in a row. Before play begins, everyone peeks at their two outer cards once — memorise them!" },
  { title: "On Your Turn", text: "Draw from the deck (swap it with one of your face-down cards, or discard it), OR take the top discard and swap it with one of your cards." },
  { title: "Power Cards", text: "When discarding: 7 or 8 → Peek at one of your own cards. 9 or 10 → Spy on one opponent's card. J or Q → Blind swap: swap one of your cards with an opponent's without looking at either. Black King → Seen swap: swap one of your cards with an opponent's and you may look at both. Red King → Worth 0 pts — keep it!" },
  { title: "Calling Cabo", text: "On your turn instead of drawing, you may call \"Cabo!\" Everyone else gets one final turn, then all cards are revealed and scored." },
  { title: "Penalty", text: "If the player who called Cabo doesn't have the lowest score, they receive a +10 point penalty on top of their actual score." },
  { title: "Winning", text: "Play as many rounds as agreed. Lowest cumulative score wins." },
];

function Cabo({ t, onBack }) {
  const saved = loadCaboState();
  const [phase, setPhase] = useState(saved.phase);
  const [playerCount, setPlayerCount] = useState(saved.playerCount || 4);
  const [names, setNames] = useState(saved.names);
  const [scores, setScores] = useState(saved.scores);
  const [currentRound, setCurrentRound] = useState(saved.currentRound);
  const [inputs, setInputs] = useState(Array(8).fill(""));
  const [caboCallerIdx, setCaboCallerIdx] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(CABO_STORAGE_KEY, JSON.stringify({ phase, playerCount, names, scores, currentRound })); } catch {}
  }, [phase, playerCount, names, scores, currentRound]);

  const totalScore = (i) => scores[i]?.reduce((a, b) => a + b, 0) ?? 0;
  const handleNameChange = (i, val) => { const n = [...names]; n[i] = val; setNames(n); };
  const handleStart = () => {
    setNames(Array(8).fill("").map((_, i) => names[i] || `Player ${i + 1}`));
    setScores(Array(playerCount).fill(null).map(() => []));
    setPhase("game");
  };
  const handleInputChange = (i, val) => { const arr = [...inputs]; arr[i] = val; setInputs(arr); };
  const handleSubmitRound = () => {
    const newScores = scores.map((s, i) => {
      let score = parseInt(inputs[i], 10);
      if (isNaN(score)) score = 0;
      if (caboCallerIdx === i) {
        const others = names.slice(0, playerCount).map((_, j) => { const v = parseInt(inputs[j], 10); return isNaN(v) ? 0 : v; }).filter((_, j) => j !== i);
        if (!others.every(o => score <= o)) score += 10;
      }
      return [...s, score];
    });
    setScores(newScores);
    setInputs(Array(8).fill(""));
    setCaboCallerIdx(null);
    setCurrentRound(currentRound + 1);
  };
  const handleBack = () => {
    if (phase === "end") { setPhase("game"); setCurrentRound(currentRound - 1); setScores(scores.map(s => s.slice(0, -1))); setInputs(Array(8).fill("")); setCaboCallerIdx(null); return; }
    if (currentRound === 0) return;
    setScores(scores.map(s => s.slice(0, -1))); setCurrentRound(currentRound - 1); setInputs(Array(8).fill("")); setCaboCallerIdx(null);
  };
  const handleRestart = () => {
    setPhase("setup"); setNames(Array(8).fill("")); setScores(Array(playerCount).fill(null).map(() => []));
    setCurrentRound(0); setInputs(Array(8).fill("")); setCaboCallerIdx(null); setShowRules(false); setShowRestart(false);
    localStorage.removeItem(CABO_STORAGE_KEY);
  };
  const getRanking = () => [...names].slice(0, playerCount).map((name, i) => ({ name, total: totalScore(i) })).sort((a, b) => a.total - b.total);

  const btn = (label, onClick, style = {}) => (
    <button onClick={onClick} style={{ background: "transparent", border: `1px solid ${t.border}`, borderRadius: 6, color: t.textMuted, fontSize: 12, padding: "6px 14px", cursor: "pointer", fontFamily: "Georgia, serif", ...style }}>{label}</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: t.rummyBg, fontFamily: "Georgia, serif", color: t.text }}>
      <div style={{ background: t.rummyHeader, borderBottom: `1px solid ${t.rummyCardBorder}`, padding: "20px 24px 16px", textAlign: "center", position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ position: "absolute", left: 16, top: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", color: t.rummyHeaderText, fontSize: "20px", cursor: "pointer", padding: "6px 12px" }}>←</button>
        <div style={{ fontSize: 11, letterSpacing: 4, color: t.rummyMuted, textTransform: "uppercase", marginBottom: 4 }}>Card Game Tracker</div>
        <div style={{ fontSize: 24, fontWeight: "bold", color: t.rummyHeaderText, letterSpacing: 1 }}>Cabo</div>
        {phase === "game" && <div style={{ fontSize: 13, color: t.rummyMuted, marginTop: 4 }}>Round {currentRound + 1}</div>}
        {phase !== "setup" && (
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
            {btn("📖 Rules", () => setShowRules(!showRules), { color: t.rummyAccent, border: `1px solid ${t.rummyAccent}55` })}
            {btn("🔄 Restart", () => setShowRestart(true), { color: t.rummyDanger, border: `1px solid ${t.rummyDanger}55` })}
          </div>
        )}
      </div>

      {showRules && (
        <div style={{ background: t.bgAlt, borderBottom: `1px solid ${t.border}`, padding: "16px 24px" }}>
          {CABO_RULES.map(r => (
            <div key={r.title} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: t.rummyAccent, fontWeight: "bold", marginBottom: 2 }}>{r.title}</div>
              {r.title === "Power Cards" ? (
                <div>
                  {CABO_POWER_CARDS.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: "bold", color: t.textBody, minWidth: 76, flexShrink: 0 }}>{c.label}</span>
                      <span style={{ fontSize: 13, color: t.textBody, lineHeight: 1.5 }}><span style={{ fontWeight: "bold" }}>{c.action}:</span> {c.desc}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: t.textBody, lineHeight: 1.5 }}>{r.text}</div>
              )}
            </div>
          ))}
          {btn("Close ✕", () => setShowRules(false), { marginTop: 4, color: t.textMuted })}
        </div>
      )}

      {showRestart && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "24px" }}>
          <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 14, padding: "28px 24px", maxWidth: 320, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 18, fontWeight: "bold", color: t.text, marginBottom: 8 }}>Restart Game?</div>
            <div style={{ fontSize: 13, color: t.textBody, marginBottom: 20 }}>All scores will be cleared.</div>
            <div style={{ display: "flex", gap: 10 }}>
              {btn("Cancel", () => setShowRestart(false), { flex: 1, padding: "12px" })}
              <button onClick={handleRestart} style={{ flex: 1, background: t.rummyDanger, border: "none", borderRadius: 8, color: "#fff", fontSize: 14, fontWeight: "bold", padding: "12px", cursor: "pointer", fontFamily: "Georgia, serif" }}>Restart</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 540, margin: "0 auto", padding: "24px 16px" }}>
        {phase === "setup" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: t.rummyMuted, textTransform: "uppercase", marginBottom: 8 }}>New Game</div>
              <div style={{ fontSize: 26, fontWeight: "bold", color: t.text }}>How many players?</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
              {[2, 3, 4, 5, 6, 7, 8].map(n => (
                <button key={n} onClick={() => setPlayerCount(n)} style={{ width: 42, height: 42, borderRadius: "50%", border: `2px solid ${playerCount === n ? t.rummyAccent : t.border}`, background: playerCount === n ? t.rummyAccent : "transparent", color: playerCount === n ? "#0f1117" : t.text, fontSize: 16, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif", transition: "all 0.2s" }}>{n}</button>
              ))}
            </div>
            <div style={{ fontSize: 13, color: t.rummyMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Player Names</div>
            {Array.from({ length: playerCount }).map((_, i) => (
              <input key={i} value={names[i] || ""} onChange={e => handleNameChange(i, e.target.value)} placeholder={`Player ${i + 1}`} style={{ display: "block", width: "100%", boxSizing: "border-box", background: t.rummyInputBg, border: `1px solid ${t.border}`, borderRadius: 10, color: t.text, fontSize: 15, padding: "12px 14px", marginBottom: 8, outline: "none", fontFamily: "Georgia, serif" }} />
            ))}
            <button onClick={handleStart} style={{ width: "100%", marginTop: 16, background: `linear-gradient(135deg, ${t.rummyAccent}, ${t.rummyAccentLight})`, color: "#0f1117", border: "none", borderRadius: 12, padding: "16px", fontSize: 17, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>Start Game →</button>
          </div>
        )}

        {phase === "game" && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 4, color: t.rummyMuted, textTransform: "uppercase", marginBottom: 10 }}>Who called Cabo?</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              <button onClick={() => setCaboCallerIdx(null)} style={{ borderRadius: 20, border: `2px solid ${caboCallerIdx === null ? t.rummyAccent : t.border}`, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", background: caboCallerIdx === null ? t.rummyAccent : "transparent", color: caboCallerIdx === null ? "#0f1117" : t.text }}>Nobody</button>
              {names.slice(0, playerCount).map((name, i) => (
                <button key={i} onClick={() => setCaboCallerIdx(i)} style={{ borderRadius: 20, border: `2px solid ${caboCallerIdx === i ? t.rummyAccent : t.border}`, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontFamily: "Georgia, serif", background: caboCallerIdx === i ? t.rummyAccent : "transparent", color: caboCallerIdx === i ? "#0f1117" : t.text }}>{name}</button>
              ))}
            </div>
            {caboCallerIdx !== null && (
              <div style={{ background: t.tipBg, border: `1px solid ${t.tipBorder}`, borderRadius: 10, padding: "10px 14px", fontSize: 13, color: t.tipText, marginBottom: 16 }}>
                💡 If {names[caboCallerIdx]} didn't have the lowest score, +10 will be added automatically.
              </div>
            )}
            <div style={{ fontSize: 13, color: t.rummyMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Enter Scores</div>
            {names.slice(0, playerCount).map((name, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 14px" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, color: t.text }}>{name}{caboCallerIdx === i ? " 📣" : ""}</div>
                  <div style={{ fontSize: 12, color: t.rummyMuted }}>Total: {totalScore(i)}</div>
                </div>
                <input type="number" value={inputs[i]} onChange={e => handleInputChange(i, e.target.value)} placeholder="pts" style={{ width: 72, background: t.rummyInputBg, border: `1px solid ${t.border}`, borderRadius: 6, color: t.text, fontSize: 16, padding: "8px 10px", outline: "none", textAlign: "center", fontFamily: "Georgia, serif" }} />
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              {currentRound > 0 && (
                <button onClick={handleBack} style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "15px", fontSize: 15, color: t.textBody, cursor: "pointer", fontFamily: "Georgia, serif" }}>← Back</button>
              )}
              <button onClick={handleSubmitRound} style={{ flex: 3, background: `linear-gradient(135deg, ${t.rummyAccent}, ${t.rummyAccentLight})`, color: "#0f1117", border: "none", borderRadius: 10, padding: "15px", fontSize: 16, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>Submit Round →</button>
            </div>
            {scores[0]?.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 13, color: t.rummyMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Scoreboard</div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", color: t.rummyMuted, padding: "6px 8px", borderBottom: `1px solid ${t.border}` }}>Player</th>
                        {scores[0].map((_, r) => <th key={r} style={{ color: t.rummyMuted, padding: "6px 8px", borderBottom: `1px solid ${t.border}`, textAlign: "center" }}>R{r + 1}</th>)}
                        <th style={{ color: t.rummyAccent, padding: "6px 8px", borderBottom: `1px solid ${t.border}`, textAlign: "center" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {names.slice(0, playerCount).map((name, i) => (
                        <tr key={i}>
                          <td style={{ padding: "8px 8px", color: t.text, borderBottom: `1px solid ${t.bgAlt}` }}>{name}</td>
                          {scores[i].map((s, r) => <td key={r} style={{ padding: "8px 8px", color: t.textBody, textAlign: "center", borderBottom: `1px solid ${t.bgAlt}` }}>{s}</td>)}
                          <td style={{ padding: "8px 8px", color: t.rummyAccent, fontWeight: "bold", textAlign: "center", borderBottom: `1px solid ${t.bgAlt}` }}>{totalScore(i)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button onClick={() => setPhase("end")} style={{ width: "100%", background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "14px", fontSize: 15, color: t.textBody, cursor: "pointer", fontFamily: "Georgia, serif" }}>End Game & See Results →</button>
                </div>
              </div>
            )}
          </div>
        )}

        {phase === "end" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: t.rummyMuted, textTransform: "uppercase", marginBottom: 8 }}>Game Over</div>
              <div style={{ fontSize: 28, fontWeight: "bold", color: t.text }}>Final Results</div>
              <div style={{ fontSize: 13, color: t.rummyMuted, marginTop: 4 }}>Lowest score wins</div>
            </div>
            {getRanking().map((p, rank) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 14, background: rank === 0 ? t.bgCard : t.bgAlt, border: `1px solid ${rank === 0 ? t.rummyAccent + "88" : t.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
                <div style={{ fontSize: rank === 0 ? 22 : 18, width: 36, textAlign: "center", color: rank === 0 ? t.rummyAccent : t.rummyMuted }}>{rank === 0 ? "🏆" : `#${rank + 1}`}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 17, color: rank === 0 ? t.text : t.textBody, fontWeight: rank === 0 ? "bold" : "normal" }}>{p.name}</div></div>
                <div style={{ fontSize: 20, color: rank === 0 ? t.rummyAccent : t.rummyMuted, fontWeight: "bold" }}>{p.total}</div>
              </div>
            ))}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, color: t.rummyMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Full Scoreboard</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", color: t.rummyMuted, padding: "6px 8px", borderBottom: `1px solid ${t.border}` }}>Player</th>
                      {scores[0]?.map((_, r) => <th key={r} style={{ color: t.rummyMuted, padding: "6px 8px", borderBottom: `1px solid ${t.border}`, textAlign: "center" }}>R{r + 1}</th>)}
                      <th style={{ color: t.rummyAccent, padding: "6px 8px", borderBottom: `1px solid ${t.border}`, textAlign: "center" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {names.slice(0, playerCount).map((name, i) => (
                      <tr key={i}>
                        <td style={{ padding: "8px 8px", color: t.text, borderBottom: `1px solid ${t.bgAlt}` }}>{name}</td>
                        {scores[i].map((s, r) => <td key={r} style={{ padding: "8px 8px", color: t.textBody, textAlign: "center", borderBottom: `1px solid ${t.bgAlt}` }}>{s}</td>)}
                        <td style={{ padding: "8px 8px", color: t.rummyAccent, fontWeight: "bold", textAlign: "center", borderBottom: `1px solid ${t.bgAlt}` }}>{totalScore(i)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button onClick={handleBack} style={{ flex: 1, background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 10, padding: "15px", fontSize: 15, color: t.textBody, cursor: "pointer", fontFamily: "Georgia, serif" }}>← Back</button>
              <button onClick={handleRestart} style={{ flex: 3, background: `linear-gradient(135deg, ${t.rummyAccent}, ${t.rummyAccentLight})`, color: "#0f1117", border: "none", borderRadius: 10, padding: "15px", fontSize: 16, fontWeight: "bold", cursor: "pointer", fontFamily: "Georgia, serif" }}>Play Again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CANASTA RULES VIEW ───────────────────────────────────────────────────────

function CanastaRules({ t, onBack }) {
  const [expanded, setExpanded] = useState(() => new Set(CANASTA_RULES.map((_, i) => i)));
  const allExpanded = expanded.size === CANASTA_RULES.length;
  const toggle = (i) => setExpanded(prev => { const s = new Set(prev); s.has(i) ? s.delete(i) : s.add(i); return s; });
  const toggleAll = () => setExpanded(allExpanded ? new Set() : new Set(CANASTA_RULES.map((_, i) => i)));
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Lora', Georgia, serif" }}>
      <div style={{ background: `linear-gradient(135deg, #1a3a2a, #2d6a4f)`, padding: "20px 24px 28px", textAlign: "center", position: "relative" }}>
        <button onClick={onBack} style={{ position: "absolute", left: 16, top: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "20px", cursor: "pointer", padding: "6px 12px" }}>←</button>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🃏</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 900, color: "#fff", margin: "0 0 4px" }}>Canasta</h1>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>Standard rules reference</div>
      </div>
      <div style={{ padding: "24px 20px", maxWidth: "540px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 4, color: t.textMuted, textTransform: "uppercase" }}>Rules</div>
          <button onClick={toggleAll} style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 8, color: t.textMuted, fontSize: 12, padding: "6px 14px", cursor: "pointer", fontFamily: "Georgia, serif" }}>
            {allExpanded ? "⊖ Collapse All" : "⊕ Expand All"}
          </button>
        </div>
        {CANASTA_RULES.map((rule, i) => (
          <div key={i} onClick={() => toggle(i)} style={{ background: expanded.has(i) ? t.bgCard : t.bgAlt, border: `2px solid ${expanded.has(i) ? "#2d6a4f" : t.border}`, borderRadius: 14, padding: "16px 20px", marginBottom: 10, cursor: "pointer", transition: "all 0.2s", boxShadow: expanded.has(i) ? t.cardShadow : "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ minWidth: 28, height: 28, borderRadius: "50%", background: expanded.has(i) ? "#2d6a4f" : t.border, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, flexShrink: 0 }}>{i + 1}</div>
              <div style={{ flex: 1, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 16, fontWeight: 700, color: t.text }}>{rule.title}</div>
              <div style={{ fontSize: 18, color: t.textMuted, transition: "transform 0.2s", transform: expanded.has(i) ? "rotate(90deg)" : "rotate(0deg)" }}>›</div>
            </div>
            {expanded.has(i) && (
              <div style={{ marginTop: 12, fontSize: 14, color: t.textBody, lineHeight: 1.65, animation: "fadeIn 0.2s ease" }}>{rule.text}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HOME SCREEN ──────────────────────────────────────────────────────────────

function HomeScreen({ t, onNavigate }) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Lora', Georgia, serif", display: "flex", flexDirection: "column" }}>
      <div style={{ background: t.headerGrad, padding: "56px 24px 48px", textAlign: "center" }}>
        <div style={{ fontSize: 14, letterSpacing: 5, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginBottom: 10 }}>Welcome</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", fontWeight: 900, color: "#fff", margin: "0 0 10px", textShadow: "0 2px 12px rgba(0,0,0,0.2)" }}>Aadesh's App</h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "15px", margin: 0 }}>Recipes & Games, all in one place</p>
      </div>
      <div style={{ flex: 1, padding: "32px 20px", maxWidth: "540px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: t.textMuted, textTransform: "uppercase", marginBottom: 20 }}>What are we doing?</div>
        <div onClick={() => onNavigate("recipes")} style={{ background: t.bgCard, border: `2px solid ${t.border}`, borderRadius: "20px", padding: "28px 24px", marginBottom: "16px", cursor: "pointer", transition: "all 0.2s", boxShadow: t.cardShadow }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: 64, height: 64, borderRadius: "16px", background: t.headerGrad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", flexShrink: 0 }}>🍳</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: 700, color: t.text, marginBottom: "4px" }}>Recipes</div>
              <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.4 }}>Step-by-step cooking with timers</div>
              <div style={{ marginTop: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: "20px", padding: "3px 10px", color: t.textBody }}>🥔 Gnocchi</span>
                <span style={{ fontSize: "11px", background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: "20px", padding: "3px 10px", color: t.textBody }}>🥗 Tempeh Bowl</span>
                <span style={{ fontSize: "11px", background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: "20px", padding: "3px 10px", color: t.textBody }}>🥪 Panini</span>
              </div>
            </div>
            <div style={{ fontSize: "22px", color: t.textMuted }}>›</div>
          </div>
        </div>
        <div onClick={() => onNavigate("games")} style={{ background: t.bgCard, border: `2px solid ${t.border}`, borderRadius: "20px", padding: "28px 24px", cursor: "pointer", transition: "all 0.2s", boxShadow: t.cardShadow }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ width: 64, height: 64, borderRadius: "16px", background: `linear-gradient(135deg, #3d2b1a, #6b4c2a)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", flexShrink: 0 }}>🃏</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "20px", fontWeight: 700, color: t.text, marginBottom: "4px" }}>Games</div>
              <div style={{ fontSize: "13px", color: t.textMuted, lineHeight: 1.4 }}>Score trackers for game night</div>
              <div style={{ marginTop: "10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "11px", background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: "20px", padding: "3px 10px", color: t.textBody }}>🂡 Liverpool Rummy</span>
                <span style={{ fontSize: "11px", background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: "20px", padding: "3px 10px", color: t.textBody }}>🃟 Cabo</span>
                <span style={{ fontSize: "11px", background: t.bgAlt, border: `1px solid ${t.border}`, borderRadius: "20px", padding: "3px 10px", color: t.textBody }}>🃏 Canasta</span>
              </div>
            </div>
            <div style={{ fontSize: "22px", color: t.textMuted }}>›</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GAMES HUB ────────────────────────────────────────────────────────────────

function GamesHub({ t, onBack, onSelectGame }) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Lora', Georgia, serif" }}>
      <div style={{ background: `linear-gradient(135deg, #3d2b1a, #6b4c2a)`, padding: "20px 24px 28px", textAlign: "center", position: "relative" }}>
        <button onClick={onBack} style={{ position: "absolute", left: 16, top: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "20px", cursor: "pointer", padding: "6px 12px" }}>←</button>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🃏</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 900, color: "#fff", margin: "0 0 4px" }}>Games</h1>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>Pick a game to play</div>
      </div>
      <div style={{ padding: "24px 20px", maxWidth: "540px", margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: t.textMuted, textTransform: "uppercase", marginBottom: 16 }}>Available</div>
        <div onClick={() => onSelectGame("rummy")} style={{ background: t.bgCard, border: `2px solid ${t.border}`, borderRadius: "16px", padding: "22px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", boxShadow: t.cardShadow }}>
          <div style={{ fontSize: "36px" }}>🂡</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: t.text }}>Liverpool Rummy</div>
            <div style={{ fontSize: "13px", color: t.textMuted, marginTop: "2px" }}>2–8 players · Score tracker</div>
          </div>
          <div style={{ fontSize: "22px", color: t.textMuted }}>›</div>
        </div>
        <div onClick={() => onSelectGame("cabo")} style={{ marginTop: "12px", background: t.bgCard, border: `2px solid ${t.border}`, borderRadius: "16px", padding: "22px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", boxShadow: t.cardShadow }}>
          <div style={{ fontSize: "36px" }}>🃟</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: t.text }}>Cabo</div>
            <div style={{ fontSize: "13px", color: t.textMuted, marginTop: "2px" }}>2–8 players · Score tracker</div>
          </div>
          <div style={{ fontSize: "22px", color: t.textMuted }}>›</div>
        </div>
        <div onClick={() => onSelectGame("canasta")} style={{ marginTop: "12px", background: t.bgCard, border: `2px solid ${t.border}`, borderRadius: "16px", padding: "22px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", boxShadow: t.cardShadow }}>
          <div style={{ fontSize: "36px" }}>🃏</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: t.text }}>Canasta</div>
            <div style={{ fontSize: "13px", color: t.textMuted, marginTop: "2px" }}>4 players · Rules reference</div>
          </div>
          <div style={{ fontSize: "22px", color: t.textMuted }}>›</div>
        </div>
      </div>
    </div>
  );
}

// ─── RECIPES HUB ─────────────────────────────────────────────────────────────

function RecipesHub({ t, onBack, onSelectRecipe }) {
  return (
    <div style={{ minHeight: "100vh", background: t.bg, fontFamily: "'Lora', Georgia, serif" }}>
      <div style={{ background: t.headerGrad, padding: "20px 24px 28px", textAlign: "center", position: "relative" }}>
        <button onClick={onBack} style={{ position: "absolute", left: 16, top: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "8px", color: "#fff", fontSize: "20px", cursor: "pointer", padding: "6px 12px" }}>←</button>
        <div style={{ fontSize: "36px", marginBottom: "8px" }}>🍳</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 900, color: "#fff", margin: "0 0 4px" }}>Recipes</h1>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>Pick something to cook</div>
      </div>
      <div style={{ padding: "24px 20px", maxWidth: "540px", margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: t.textMuted, textTransform: "uppercase", marginBottom: 16 }}>Available</div>
        <div onClick={() => onSelectRecipe("gnocchi")} style={{ background: t.bgCard, border: `2px solid ${t.border}`, borderRadius: "16px", padding: "22px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", boxShadow: t.cardShadow }}>
          <div style={{ fontSize: "36px" }}>🥔</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: t.text }}>Crispy Gnocchi</div>
            <div style={{ fontSize: "13px", color: t.textMuted, marginTop: "2px" }}>~30 min · 2 servings · ~35g protein</div>
          </div>
          <div style={{ fontSize: "22px", color: t.textMuted }}>›</div>
        </div>
        <div onClick={() => onSelectRecipe("tempeh-bowl")} style={{ marginTop: "12px", background: t.bgCard, border: `2px solid ${t.border}`, borderRadius: "16px", padding: "22px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", boxShadow: t.cardShadow }}>
          <div style={{ fontSize: "36px" }}>🥗</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: t.text }}>Tempeh Grain Bowl</div>
            <div style={{ fontSize: "13px", color: t.textMuted, marginTop: "2px" }}>~50 min · 2 servings · ~40g protein</div>
          </div>
          <div style={{ fontSize: "22px", color: t.textMuted }}>›</div>
        </div>
        <div onClick={() => onSelectRecipe("panini")} style={{ marginTop: "12px", background: t.bgCard, border: `2px solid ${t.border}`, borderRadius: "16px", padding: "22px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "16px", boxShadow: t.cardShadow }}>
          <div style={{ fontSize: "36px" }}>🥪</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "18px", fontWeight: 700, color: t.text }}>Veggie Amul Panini</div>
            <div style={{ fontSize: "13px", color: t.textMuted, marginTop: "2px" }}>~20 min · 1 serving · ~15g protein</div>
          </div>
          <div style={{ fontSize: "22px", color: t.textMuted }}>›</div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [screen, setScreen] = useState("home");
  const t = THEMES[darkMode ? "dark" : "light"];

  return (
    <div style={{ position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:wght@400;600&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>
      <button onClick={() => setDarkMode(d => !d)} style={{
        position: "fixed", top: 16, right: 16, zIndex: 1000,
        background: t.bgCard, border: `1px solid ${t.border}`,
        borderRadius: "50%", width: 40, height: 40,
        fontSize: "18px", cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}>{t.toggleIcon}</button>

      {screen === "home" && <HomeScreen t={t} onNavigate={setScreen} />}
      {screen === "recipes" && <RecipesHub t={t} onBack={() => setScreen("home")} onSelectRecipe={id => setScreen(`recipe-${id}`)} />}
      {screen === "recipe-gnocchi" && <RecipeView t={t} onBack={() => setScreen("recipes")} recipe={RECIPES["gnocchi"]} />}
      {screen === "recipe-tempeh-bowl" && <RecipeView t={t} onBack={() => setScreen("recipes")} recipe={RECIPES["tempeh-bowl"]} />}
      {screen === "recipe-panini" && <RecipeView t={t} onBack={() => setScreen("recipes")} recipe={RECIPES["panini"]} />}
      {screen === "games" && <GamesHub t={t} onBack={() => setScreen("home")} onSelectGame={id => setScreen(`game-${id}`)} />}
      {screen === "game-rummy" && <LiverpoolRummy t={t} onBack={() => setScreen("games")} />}
      {screen === "game-cabo" && <Cabo t={t} onBack={() => setScreen("games")} />}
      {screen === "game-canasta" && <CanastaRules t={t} onBack={() => setScreen("games")} />}
    </div>
  );
}
