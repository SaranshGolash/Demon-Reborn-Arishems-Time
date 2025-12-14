const SAVE_KEY = "demon_reborn_save_v2"; // Using this key the game saves

const GlobalState = {
  chapterTimeLimit: 60 * 60, // Chapter time limit is set to 1hr(60mins)
  deathPenaltySec: 10 * 60, // Whenever the young mage dies 10 mins will be deducted from the chapter time limit
  remainingTimeSec: 60 * 60, // remaining time left will be updated later during the game
  chapter: 1, // Initial chapter
  totalChapters: 10,
  isSubscribed: false, // handles subscription check
  playerStats: {
    maxHp: 100,
    hp: 100,
    attack: 10,
    speed: 220,
    skillPoints: 0,
    skills: { hpUp: 0, attackUp: 0, speedUp: 0 },
  },
  storylineChapterIndex: 0, // For tracking which part of the storyline gets played depending on the current chapter
};
