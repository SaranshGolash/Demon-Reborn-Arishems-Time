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

const introText = {
  text: "Demon realm, used to be peaceful like all other realms until Arishem was reborn. He soon grew up acquiring immense magical aura and skills that made him unrivalled in the whole realm. His terror grew as so his demon army did. Do you think you are the one who can stop Arishem's terror and not only save the demon realm but also the whole world? You dare to challenge the might of Arishem? ",
};

const storylines = {
  1: [
    { speaker: "Narrator", text: "A new adventure begins..." },
    {
      speaker: "Narrator",
      text: "Upon years of Arishem reign over the demon world, a young mage was reincarnated to a low life family. He used to see Arishem's armys terror and when he was 10 years old Arishem had his father killed for rebelling against him. Ever since then the young mage has been leading the rebellion solely by himself and has dark revenge desires too. How will this story unfold? Let's find out.",
    },
    {
      speaker: "Arishem",
      text: "Hahahaha! This is my territory. You dare think that you could stop my quest to become god-emperor.",
    },
    {
      speaker: "Young Mage",
      text: "The cries of the innocent echo in my soul, Arishem! Your tyranny ends today!",
    },
    { speaker: "Narrator", text: "Chapter 1: Whispers of Rebellion" },
  ],
  2: [
    {
      speaker: "Narrator",
      text: "The chilling winds of the Lava Caverns howl, carrying tales of Arishem's growing power. The Young Mage, fueled by vengeance, presses onward.",
    },
    {
      speaker: "Young Mage",
      text: "Every step through this molten landscape burns with the memory of my father. Arishem will pay!",
    },
    { speaker: "Narrator", text: "Chapter 2: The Scorched Path" },
  ],
  3: [
    {
      speaker: "Narrator",
      text: "Deep within the Lava Caverns, an ancient power stirs. The air crackles with dark magic as the Young Mage approaches a formidable foe.",
    },
    {
      speaker: "Arishem",
      text: "So, you've made it this far, mortal. Your insolence knows no bounds! Prepare to face the true might of Arishem's vanguard!",
    },
    {
      speaker: "Young Mage",
      text: "I will not yield! The fate of the realms rests on my shoulders. I will strike down your tyranny!",
    },
    { speaker: "Narrator", text: "Chapter 3: The Crimson Forge" },
  ],
  4: [
    {
      speaker: "Narrator",
      text: "Emerging from the fiery depths, the Young Mage finds himself in a desolate, war-torn landscape. The whispers of despair hang heavy in the air.",
    },
    {
      speaker: "Mysterious Voice",
      text: "The path you tread is fraught with peril, Young Mage. Many have fallen before you. Do you possess the will to endure?",
    },
    {
      speaker: "Young Mage",
      text: "I fight for those who cannot! My will is unbreakable. Who are you?",
    },
    { speaker: "Narrator", text: "Chapter 4: The Shattered Plains" },
  ],
  5: [
    {
      speaker: "Narrator",
      text: "The Shattered Plains reveal the true scale of Arishem's destruction. Entire civilizations lie in ruins, a testament to his ruthless power.",
    },
    {
      speaker: "Arishem's General",
      text: "You are but a nuisance, a flickering candle in the coming storm. Your rebellion ends here!",
    },
    {
      speaker: "Young Mage",
      text: "I am the storm! You will fall, just as Arishem will!",
    },
    { speaker: "Narrator", text: "Chapter 5: The Citadel of Whispers" },
  ],
  6: [
    {
      speaker: "Narrator",
      text: "Within the dark spires of the Citadel, forbidden knowledge and ancient evils reside. The Young Mage must navigate its treacherous halls.",
    },
    {
      speaker: "Ancient Guardian",
      text: "Few have ever breached these walls. Your courage is admirable, but futile. Turn back, or face oblivion.",
    },
    {
      speaker: "Young Mage",
      text: "My resolve is unshaken. I will face any challenge to reach Arishem!",
    },
    { speaker: "Narrator", text: "Chapter 6: The Shadowed Ascent" },
  ],
  7: [
    {
      speaker: "Narrator",
      text: "The ascent to Arishem's throne is protected with his most devoted followers. Each step is a battle against overwhelming odds.",
    },
    {
      speaker: "Arishem's Elite Guard",
      text: "The Demon Lord awaits no one. You will perish here, an insignificant speck against his might.",
    },
    {
      speaker: "Young Mage",
      text: "Then I shall make my mark! For freedom!",
    },
    { speaker: "Narrator", text: "Chapter 7: The Throne of Tyranny" },
  ],
  8: [
    {
      speaker: "Narrator",
      text: "Finally, the Young Mage stands before Arishem, the source of all suffering. The ultimate confrontation is at hand.",
    },
    {
      speaker: "Arishem",
      text: "You truly amuse me, child. Did you honestly believe you could stand against a god? Now, witness true power!",
    },
    {
      speaker: "Young Mage",
      text: "You are no god, Arishem! Just a tyrant! I will bring you down!",
    },
    { speaker: "Narrator", text: "Chapter 8: The God-Emperor's Fall" },
  ],
  9: [
    {
      speaker: "Narrator",
      text: "With Arishem defeated, the world begins to heal, but new threats emerge from the power vacuum. The Young Mage's journey is far from over.",
    },
    {
      speaker: "Elder Council",
      text: "The realms owe you a debt, hero. But the balance is fragile. A new darkness gathers on the horizon.",
    },
    {
      speaker: "Young Mage",
      text: "I will stand ready. For peace, for justice, always.",
    },
    { speaker: "Narrator", text: "Chapter 9: Echoes of a New Dawn" },
  ],
  10: [
    {
      speaker: "Narrator",
      text: "The final chapter. A grand prophecy unfolds, revealing the true destiny of the Young Mage and the ultimate fate of the Demon Realm.",
    },
    {
      speaker: "Ancient Prophecy",
      text: "From the ashes of tyranny, a new guardian shall rise, wielding the light and shadow to forever safeguard the realms.",
    },
    {
      speaker: "Young Mage",
      text: "This is my purpose. This is my legacy. The Demon Realm will know peace.",
    },
    { speaker: "Narrator", text: "Chapter 10: The Eternal Guardian" },
  ],
};

const chapterBosses = {
  1: {
    key: "boss_chap1",
    filename: "assets/mage_guardian-red.png",
    frameWidth: 64,
    frameHeight: 64,
    attackKey: "boss_chap1_attack",
    attackFilename: "assets/mage_guardian-red.png",
    attackFrameWidth: 64,
    attackFrameHeight: 64,
  },
  2: {
    key: "boss_chap2",
    filename: "assets/mage_guardian-blue.png",
    frameWidth: 64,
    frameHeight: 64,
    attackKey: "boss_chap2_attack",
    attackFilename: "assets/mage_guardian-blue.png",
    attackFrameWidth: 64,
    attackFrameHeight: 64,
  },
  3: {
    key: "boss_chap3",
    filename: "assets/mage_guardian-magenta.png",
    frameWidth: 64,
    frameHeight: 64,
    attackKey: "boss_chap3_attack",
    attackFilename: "assets/mage_guardian-magenta.png",
    attackFrameWidth: 64,
    attackFrameHeight: 64,
  },
  4: {
    key: "boss_chap4",
    filename: "assets/NightBorne.png",
    frameWidth: 80,
    frameHeight: 80,
    attackKey: "boss_chap4_attack",
    attackFilename: "assets/NightBorne_attack.png",
    attackFrameWidth: 80,
    attackFrameHeight: 80,
  },
  5: {
    key: "boss_chap5",
    filename: "assets/necromancer.png",
    frameWidth: 128,
    frameHeight: 128,
    attackKey: "boss_chap5_attack",
    attackFilename: "assets/necromancer.png",
    attackFrameWidth: 128,
    attackFrameHeight: 128,
  },
  6: {
    key: "boss_chap6",
    filename: "assets/boss.png",
    frameWidth: 64,
    frameHeight: 64,
    attackKey: "boss_chap6_attack",
    attackFilename: "assets/boss.png",
    attackFrameWidth: 64,
    attackFrameHeight: 64,
  },
  7: {
    key: "boss_chap7",
    filename: "assets/mage_guardian-red.png",
    frameWidth: 64,
    frameHeight: 64,
    attackKey: "boss_chap7_attack",
    attackFilename: "assets/mage_guardian-red.png",
    attackFrameWidth: 64,
    attackFrameHeight: 64,
  },
  8: {
    key: "boss_chap8",
    filename: "assets/NightBorne.png",
    frameWidth: 80,
    frameHeight: 80,
    attackKey: "boss_chap8_attack",
    attackFilename: "assets/NightBorne_attack.png",
    attackFrameWidth: 80,
    attackFrameHeight: 80,
  },
  9: {
    key: "boss_chap9",
    filename: "assets/necromancer.png",
    frameWidth: 128,
    frameHeight: 128,
    attackKey: "boss_chap9_attack",
    attackFilename: "assets/necromancer.png",
    attackFrameWidth: 128,
    attackFrameHeight: 128,
  },
  10: {
    key: "boss_chap10",
    filename: "assets/boss.png",
    frameWidth: 64,
    frameHeight: 64,
    attackKey: "boss_chap10_attack",
    attackFilename: "assets/boss.png",
    attackFrameWidth: 64,
    attackFrameHeight: 64,
  },
};

function resetNewGame() {
  // reset game
  GlobalState.remainingTimeSec = GlobalState.chapterTimeLimit;
  GlobalState.chapter = 1;
  GlobalState.playerStats.maxHp = 100;
  GlobalState.playerStats.hp = 100;
  GlobalState.playerStats.attack = 10;
  GlobalState.playerStats.speed = 220;
  GlobalState.playerStats.skillPoints = 0;
  GlobalState.playerStats.skills = { hpUp: 0, attackUp: 0, speedUp: 0 };
}

function saveGame(checkpointId = "manual") {
  // saves game
  const data = {
    version: 1,
    remainingTimeSec: GlobalState.remainingTimeSec,
    chapter: GlobalState.chapter,
    isSubscribed: GlobalState.isSubscribed,
    playerStats: GlobalState.playerStats,
    checkpointId,
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

function loadGame() {
  // loads the saved game
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (!data || !data.version) return null;
    GlobalState.remainingTimeSec = data.remainingTimeSec;
    GlobalState.chapter = data.chapter;
    GlobalState.isSubscribed = data.isSubscribed;
    GlobalState.playerStats = data.playerStats;
    return data;
  } catch (e) {
    console.error("Failed to load save data", e);
    return null;
  }
}
