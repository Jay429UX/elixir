import { originalGames } from "@/lib/originalGames";

/* Game page ids by title, so a win in the feed can link to its game. Mirrors the list in app/game/[id]/page.tsx. */
const casinoIds: Record<string, string> = {
  "Sweet Bonanza": "1", "Gates of Olympus": "2", "Big Bass Bonanza": "3", "Starlight Princess": "4", "Sugar Rush": "5",
  "Reactoonz 2": "6", "Tome of Madness": "7", "Buffalo King Megaways": "8", "The Dog House": "9", "Fire Joker": "10",
  "Book of Dead": "11", "Rise of Olympus": "12", "Moon Princess": "13", "Gemix": "14", "X Crash": "15",
  "Wanted Dead or Wild": "16", "Le Zeus": "17", "Rollbot Bonanza": "18", "Mines": "19", "Plinko": "20",
  "Chaos Crew": "21", "Stick Em": "22",
};

/* Returns the game page path for a title, or null if we don't have a page for it. */
export function gameHref(title: string, isOriginal: boolean): string | null {
  if (isOriginal) {
    const original = originalGames.find((g) => g.title === title);
    return original ? `/game/${original.id}` : null;
  }
  const id = casinoIds[title];
  return id ? `/game/${id}` : null;
}
