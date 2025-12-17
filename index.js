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
    mana: 100, // mana for time abilities
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

// Timeline Memories and Scenarios
const timelineMemories = {
  past: [
    "The memory of your father's smile... before Arishem took him.",
    "A peaceful village, untouched by darkness. How it used to be.",
    "Your childhood home, where hope still lived.",
    "The day you first learned magic, full of wonder and promise.",
    "Friends laughing together, unaware of the coming storm.",
    "The last time you saw your father alive, teaching you courage.",
    "A world where demons and humans lived in harmony.",
    "The ancient library where you discovered your true power.",
  ],
  future: [
    "Arishem's shadow grows, consuming all light and hope.",
    "The ruins of what once was... a warning of things to come.",
    "Darkness spreads, corrupting everything in its path.",
    "A future where only Arishem's will remains.",
    "The world burns, and you are the last spark of resistance.",
    "Time itself fractures under Arishem's dominion.",
    "A future where your failure means eternal darkness.",
    "The final battle approaches... will you be ready?",
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

// Boot Scene to load assets

class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    // Loads spritesheets
    this.load.spritesheet("player", "assets/necromancer.png", {
      frameWidth: 128,
      frameHeight: 128,
    });
    this.load.spritesheet("enemy", "assets/NightBorne.png", {
      frameWidth: 80,
      frameHeight: 80,
    });
    this.load.spritesheet("boss", "assets/mage_guardian-red.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    for (const chapterNum in chapterBosses) {
      const bossConfig = chapterBosses[chapterNum];
      this.load.spritesheet(bossConfig.key, bossConfig.filename, {
        frameWidth: bossConfig.frameWidth,
        frameHeight: bossConfig.frameHeight,
        transparent: 0xaa44ff, // to fix an internal bug with the background of the boss during attacking phase
      });
      // Loads boss attack spritesheet if different from idle, or if no dedicated attackKey is set in chapterBosses
      if (bossConfig.attackKey) {
        this.load.spritesheet(bossConfig.attackKey, bossConfig.attackFilename, {
          frameWidth: bossConfig.attackFrameWidth,
          frameHeight: bossConfig.attackFrameHeight,
          transparent: 0xaa44ff,
        });
      }
    }
    this.load.spritesheet("boss_attack_anim_png", "assets/boss.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    // Loading game backgrounds depending on the chapter number currently being played
    for (let i = 1; i <= 10; i++) {
      let filename;
      if (i === 1) {
        filename = "assets/Dark_Forest_17.jpg";
      } else if (i === 2) {
        filename = "assets/lava_bg.jpg";
      } else if (i === 3) {
        filename = "assets/crimson_forge.jpg";
      } else if (i === 4) {
        filename = "assets/shattered_plains.png";
      } else if (i === 5) {
        filename = "assets/citadel.jpg";
      } else if (i === 7) {
        filename = "assets/OldDungeon.png";
      } else {
        filename = i <= 5 ? "assets/lava_bg.png" : "assets/forest_bg.png";
      }
      this.load.image(`bg_${i}`, filename);
    }

    // Loading static items
    this.load.image("ground", "assets/ground.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("enemy_bullet", "assets/purple_ball.png");
    this.load.image("portal", "assets/portal.png");
    this.load.image("checkpoint", "assets/flag.png");
    this.load.audio("intro_horror_sound", "sounds/horror-transition.mp3"); // Loading for Intro Scene
    this.load.audio("evil_cue_sound", "sounds/evil-cue.mp3"); // Loading for Chapter 1
    this.load.audio("evil_drone_sound", "sounds/evil-drone.mp3"); // Loading for MainMenuScene
    this.load.audio("chapter2_bg_music", "sounds/old-evil-ghosts.mp3"); // Loading for Chapter 2
    this.load.spritesheet(
      "NightNorne_attack_png",
      "assets/NightBorne_attack.png",
      {
        frameWidth: 80,
        frameHeight: 80,
      }
    );
  }

  create() {
    // Player Animations
    this.anims.create({
      key: "player_idle",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
      repeat: -1,
    });

    this.anims.create({
      key: "player_run",
      frames: this.anims.generateFrameNumbers("player", {
        start: 1,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // Enemy Animations
    this.anims.create({
      key: "enemy_walk",
      frames: this.anims.generateFrameNumbers("enemy", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Boss Animations
    this.anims.create({
      key: "boss_idle",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Boss animations for each chapter
    for (const chapterNum in chapterBosses) {
      const bossConfig = chapterBosses[chapterNum];
      this.anims.create({
        key: `${bossConfig.key}_idle`,
        frames: this.anims.generateFrameNumbers(bossConfig.key, {
          start: 0,
          end: 1,
        }),
        frameRate: 4,
        repeat: -1,
      });

      // Boss attack animation for each chapter
      if (bossConfig.attackKey) {
        let endFrame = 2;
        if (bossConfig.attackFilename === "assets/boss.png") {
          endFrame = 0;
        }
        this.anims.create({
          key: bossConfig.attackKey,
          frames: this.anims.generateFrameNumbers(bossConfig.attackKey, {
            start: 0,
            end: endFrame,
          }),
          frameRate: 15,
          repeat: 0,
        });
      }
    }

    this.anims.create({
      key: "boss_attack_anim",
      frames: this.anims.generateFrameNames("boss_attack_anim_png"),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: "enemy_attack_gif_anim", // animation key
      frames: this.anims.generateFrameNames("NightNorne_attack_png"),
      frameRate: 15,
      repeat: 0,
    });

    this.scene.start("MainMenuScene");
  }
}

// Storyline Scene

class StorylineScene extends Phaser.Scene {
  constructor() {
    super("StorylineScene");
  }

  init(data) {
    this.chapter = data.chapter;
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");
    this.dialogueIndex = 0;
    this.currentStoryline = storylines[this.chapter] || [];

    this.dialogueText = this.add.text(50, 400, "", {
      fontSize: "20px",
      color: "#ffffff",
      wordWrap: { width: 860 },
      backgroundColor: "#000000AA",
      padding: { x: 10, y: 10 },
    });
    this.speakerText = this.add.text(50, 370, "", {
      fontSize: "24px",
      color: "#ffff00",
      backgroundColor: "#000000AA",
      padding: { x: 10, y: 5 },
    });
    this.continueText = this.add
      .text(800, 500, "Press ENTER", {
        fontSize: "16px",
        color: "#cccccc",
      })
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-ENTER", this.advanceDialogue, this);
    this.input.on("pointerdown", this.advanceDialogue, this);

    this.isAnimatingText = false; // Flag to check if text is currently animating
    this.typewriterTimer = null; // To hold the timed event for animation

    this.showDialogue();
  }

  showDialogue() {
    if (this.dialogueIndex < this.currentStoryline.length) {
      const line = this.currentStoryline[this.dialogueIndex];
      this.speakerText.setText(line.speaker);
      this.typewriteText(line.text); // Animate text
    } else {
      // Storyline finished, start the game
      this.scene.start("GameScene");
    }
  }

  advanceDialogue() {
    if (this.isAnimatingText) {
      // If text is animating, skip to end of current line
      if (this.typewriterTimer) {
        this.typewriterTimer.remove();
      }
      // Ensure dialogueIndex is valid before accessing currentStoryline
      if (this.dialogueIndex < this.currentStoryline.length) {
        this.dialogueText.setText(
          this.currentStoryline[this.dialogueIndex].text
        ); // Show full text of current line
      }
      this.isAnimatingText = false;
    } else {
      // If not animating, advance to next dialogue line or end storyline
      this.dialogueIndex++;
      this.showDialogue();
    }
  }

  typewriteText(text) {
    this.isAnimatingText = true;
    this.dialogueText.setText(""); // Clear current text
    const length = text.length;
    let i = 0;
    this.typewriterTimer = this.time.addEvent({
      callback: () => {
        this.dialogueText.setText(this.dialogueText.text + text[i]);
        i++;
        if (i === length) {
          this.isAnimatingText = false;
          this.typewriterTimer.remove();
        }
      },
      callbackScope: this,
      delay: 50, // Adjust this value for typing speed
      loop: true,
    });
  }
}

// Intro Scene

class IntroScene extends Phaser.Scene {
  constructor() {
    super("IntroScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#000000");

    this.introSound = this.sound.add("intro_horror_sound", {
      loop: false,
    });
    this.introSound.play();

    const introDisplay = this.add
      .text(480, 540, introText.text, {
        fontSize: "24px",
        color: "#ffff00",
        align: "center",
        wordWrap: { width: 800 },
      })
      .setOrigin(0.5, 0);

    this.tweens.add({
      targets: introDisplay,
      y: -introDisplay.height - 100, // Scroll up and off-screen
      scale: 0.1, // Fade into distance
      alpha: 0, // Fade out
      duration: 35000,
      ease: "Linear",
      onComplete: () => {
        this.introSound.stop();
        this.scene.start("StorylineScene", {
          chapter: GlobalState.chapter,
        });
      },
    });

    // Allowing skipping the intro scene
    this.input.keyboard.on("keydown-ENTER", () => {
      this.introSound.stop();
      this.scene.stop();
      this.scene.start("StorylineScene", {
        chapter: GlobalState.chapter,
      });
    });
    this.input.on("pointerdown", () => {
      this.introSound.stop();
      this.scene.stop();
      this.scene.start("StorylineScene", {
        chapter: GlobalState.chapter,
      });
    });
  }
}

// Main Menu Scene

class MainMenuScene extends Phaser.Scene {
  constructor() {
    super("MainMenuScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#150018");

    // Resuming audio on user interaction
    if (
      this.sys.game.device.input.touch &&
      this.sys.game.device.input.touch.is_touched
    ) {
      // For mobile phones
      if (this.sys.game.audio.context.state === "suspended") {
        this.sys.game.audio.context.resume();
      }
    }

    // Adding an input listener to resume audio context on any user interaction
    this.input.once("pointerdown", () => {
      if (this.sys.game.audio.context.state === "suspended") {
        this.sys.game.audio.context.resume();
      }
    });
    this.input.keyboard.once("keydown", () => {
      if (this.sys.game.audio.context.state === "suspended") {
        this.sys.game.audio.context.resume();
      }
    });

    if (this.menuMusic) {
      this.menuMusic.stop();
    }
    this.menuMusic = this.sound.add("evil_drone_sound", { loop: true });
    this.menuMusic.play();

    this.add
      .text(480, 60, "Demon Reborn: Arishem's Time", {
        fontSize: "28px",
        color: "#ffffff",
      })
      .setOrigin(0.5);

    this.menuItems = [
      "Play",
      "How to Play",
      "Load Game",
      "Subscription",
      "Options",
      "Credits",
    ];
    this.selectedIndex = 0;
    this.menuTexts = [];

    for (let i = 0; i < this.menuItems.length; i++) {
      const t = this.add
        .text(480, 160 + i * 40, "", {
          fontSize: "20px",
          color: "#dddddd",
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true }); // Enabling interactivity
      t.on("pointerdown", () => {
        this.selectedIndex = i; // Setting selected index to the clicked item
        this.updateMenuVisuals(); // Updating visuals to highlight clicked item
        this.handleSelect(); // Handles the selection
      });
      t.on("pointerover", () => {
        this.selectedIndex = i;
        this.updateMenuVisuals();
      }); // Updates visuals on hover
      t.on("pointerout", () => {
        // Resets visual if not selected
        if (this.selectedIndex === i) {
          this.updateMenuVisuals();
        }
      });
      this.menuTexts.push(t);
    }

    this.infoText = this.add
      .text(480, 430, "", {
        fontSize: "16px",
        color: "#ffff88",
        wordWrap: { width: 800 },
      })
      .setOrigin(0.5);
    this.updateMenuVisuals("Use UP/DOWN and ENTER");

    this.cursors = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.input.keyboard.on("keydown-UP", () => {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.menuItems.length) %
        this.menuItems.length;
      this.updateMenuVisuals();
    });

    this.input.keyboard.on("keydown-DOWN", () => {
      this.selectedIndex = (this.selectedIndex + 1) % this.menuItems.length;
      this.updateMenuVisuals();
    });

    this.enterKey.on("down", () => this.handleSelect());
  }

  updateMenuVisuals(extraInfo) {
    for (let i = 0; i < this.menuItems.length; i++) {
      const prefix = i === this.selectedIndex ? "> " : "  ";
      this.menuTexts[i]
        .setText(prefix + this.menuItems[i])
        .setStyle({ color: i === this.selectedIndex ? "#ffffff" : "#dddddd" });
    }
    const subStatus = GlobalState.isSubscribed ? "ACTIVE" : "LOCKED"; // Handling subscription
    this.infoText.setText(
      (extraInfo || "") +
        `\nSubscription: ${subStatus}\nChapters 4-10 require subscription.`
    );
  }

  handleSelect() {
    const choice = this.menuItems[this.selectedIndex];
    if (choice === "Play") {
      resetNewGame();

      // Explicitly resetting currentCheckpoint when starting a new game
      this.scene.get("GameScene").currentCheckpoint = null;

      if (GlobalState.chapter > 3 && !GlobalState.isSubscribed) {
        this.updateMenuVisuals("Subscription required!");
      } else {
        // Stopping menu music before starting another scene
        if (this.menuMusic) {
          this.menuMusic.stop();
        }
        // Starting Intro Scene only for Chapter 1, otherwise go to StorylineScene
        if (GlobalState.chapter === 1) {
          this.scene.start("IntroScene");
        } else {
          this.scene.start("StorylineScene", {
            chapter: GlobalState.chapter,
          });
        }
      }
    } else if (choice === "How to Play") {
      if (this.menuMusic) {
        this.menuMusic.stop();
      }
      this.scene.start("HowToPlayScene");
    } else if (choice === "Load Game") {
      if (loadGame()) {
        // Stopping menu music before starting another scene
        if (this.menuMusic) {
          this.menuMusic.stop();
        }
        this.scene.start("GameScene");
      } else this.updateMenuVisuals("No save file found.");
    } else if (choice === "Subscription") {
      GlobalState.isSubscribed = !GlobalState.isSubscribed;
      this.updateMenuVisuals(
        GlobalState.isSubscribed ? "Subscribed!" : "Unsubscribed."
      );
    } else if (choice === "Options") {
      this.updateMenuVisuals(
        "Options: In a full game you can adjust audio, controls, etc."
      );
    } else if (choice === "Credits") {
      this.updateMenuVisuals(
        "Credits: Saransh Golash (Game Designer)\nCopyright Demon Reborn: Arishem's Time @2025"
      );
    }
  }
}

// How to Play Scene
class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super("HowToPlayScene");
  }

  create() {
    this.cameras.main.setBackgroundColor("#150018");

    this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 250,
        "How to Play",
        { fontSize: "40px", fill: "#FFD700" }
      )
      .setOrigin(0.5);

    const instructions = [
      "Use arrow keys to move the character.",
      "Use spacebar key to hit enemies with magic bullets.",
      "Use shift key to slow down the time\n(uses mana that recovers over time).\n",
      "Use R key to rewind the player position by 3 seconds\n(uses 2 minutes of the remaining time).\n",
      "Use T key to interact with the timeline to see a past memory or a future possible scenario.\nThere are object blocking the path unless you interact with it, you won't move forward.\n",
      "Use enter key to skip the storylines.",
      "Use esc key to pause the game.",
      "In order to complete the game chapter,\nyou have to defeat the boss of that chapter.\n",
      "Whenever the young mage(player) dies\n10 mins is warped from the remaining time to complete the chapter.\n",
      "As the remaining time goes closer to 0 a reddish tint\nstarts to appear showcasing urgency and enraging enemies (enemies gets additional buff).\n",
      "When remaining time is over the game ends,\nyou have to replay the game from the very start.\n",
    ];

    let yOffset = -180;
    instructions.forEach((instruction) => {
      this.add
        .text(
          this.cameras.main.width / 2,
          this.cameras.main.height / 2 + yOffset,
          "• " + instruction,
          { fontSize: "14px", fill: "#fff" }
        )
        .setOrigin(0.5);
      yOffset += 40;
    });

    const backButton = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 250,
        "Back to Main Menu",
        { fontSize: "20px", fill: "#FFD700" }
      )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    backButton.on("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });
  }
}

// UI Scene

class UIScene extends Phaser.Scene {
  constructor() {
    super("UIScene");
  }

  create() {
    this.timerText = this.add.text(10, 10, "", {
      fontSize: "18px",
      color: "#ffffff",
    });
    this.hpText = this.add.text(10, 34, "", {
      fontSize: "18px",
      color: "#ff6666",
    });
    this.chapterText = this.add.text(10, 58, "", {
      fontSize: "18px",
      color: "#88ff88",
    });
    this.manaText = this.add.text(10, 82, "", {
      fontSize: "18px",
      color: "#8888ff",
    });
    this.gameScene = this.scene.get("GameScene");
  }

  formatTime(sec) {
    sec = Math.max(0, Math.floor(sec));
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  update(time, delta) {
    if (!this.gameScene) return;

    // Global time countdown
    if (GlobalState.remainingTimeSec > 0) {
      GlobalState.remainingTimeSec -= delta / 1000;
    }

    if (GlobalState.remainingTimeSec <= 0) {
      GlobalState.remainingTimeSec = 0;
      this.scene.stop("GameScene");
      this.scene.start("GameOverScene", { reason: "time" });
      return;
    }

    this.timerText.setText(
      "Time Left: " + this.formatTime(GlobalState.remainingTimeSec)
    );
    this.hpText.setText(
      `HP: ${Math.round(this.gameScene.playerHp)}/${
        GlobalState.playerStats.maxHp
      }`
    );
    this.chapterText.setText(`Chapter: ${GlobalState.chapter}`);
    this.manaText.setText(`Mana: ${Math.round(GlobalState.playerStats.mana)}`);
  }
}

// Pause Scene

class PauseScene extends Phaser.Scene {
  constructor() {
    super("PauseScene");
  }

  create() {
    this.add.rectangle(480, 270, 960, 540, 0x000000, 0.85);

    this.add
      .text(480, 100, "GAME PAUSED", {
        fontSize: "40px",
        color: "#ff0",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const createButton = (x, y, text, callback) => {
      const t = this.add
        .text(x, y, text, {
          fontSize: "28px",
          color: "#fff",
          backgroundColor: "#333",
          padding: { x: 10, y: 5 },
        })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

      t.on("pointerover", () => t.setStyle({ color: "#0f0" }));
      t.on("pointerout", () => t.setStyle({ color: "#fff" }));
      t.on("pointerdown", callback);
      return t;
    };

    createButton(480, 180, "RESUME GAME", () => {
      this.scene.resume("GameScene");
      this.scene.resume("UIScene");
      this.scene.stop();
    });

    createButton(480, 250, "SAVE GAME", () => {
      const gameScene = this.scene.get("GameScene");
      const cpId = gameScene.currentCheckpoint
        ? gameScene.currentCheckpoint.id
        : "manual_pause";
      saveGame(cpId);

      const txt = this.add
        .text(480, 290, "Game Saved!", { color: "#0f0" })
        .setOrigin(0.5);
      this.time.delayedCall(1000, () => txt.destroy());
    });

    this.chapterContainer = this.add.container(0, 0).setVisible(false);
    createButton(480, 320, "CHAPTER SELECT", () => {
      this.chapterContainer.setVisible(!this.chapterContainer.visible);
    });

    for (let i = 1; i <= 10; i++) {
      const cx = 300 + ((i - 1) % 5) * 90;
      const cy = 370 + Math.floor((i - 1) / 5) * 50;
      const btn = this.add
        .text(cx, cy, `[${i}]`, { fontSize: "24px", color: "#88ff88" })
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });
      btn.on("pointerdown", () => {
        if (i > 3 && !GlobalState.isSubscribed) {
          alert("Chapter Locked! Subscribe first.");
        } else {
          GlobalState.chapter = i;
          GlobalState.remainingTimeSec = GlobalState.chapterTimeLimit;
          const gameScene = this.scene.get("GameScene");
          gameScene.currentCheckpoint = null;
          gameScene.scene.restart();
          this.scene.resume("UIScene");
          this.scene.stop();
        }
      });
      this.chapterContainer.add(btn);
    }

    createButton(480, 480, "MAIN MENU", () => {
      const gameScene = this.scene.get("GameScene");
      if (
        gameScene &&
        gameScene.chapterMusic &&
        gameScene.chapterMusic.isPlaying
      ) {
        gameScene.chapterMusic.stop();
      }
      // If there's a bossIntroSound, stop it as well if it's playing
      if (
        gameScene &&
        gameScene.bossIntroSound &&
        gameScene.bossIntroSound.isPlaying
      ) {
        gameScene.bossIntroSound.stop();
      }
      this.scene.stop("GameScene");
      this.scene.stop("UIScene");
      this.scene.start("MainMenuScene");
    });

    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.resume("GameScene");
      this.scene.resume("UIScene");
      this.scene.stop();
    });
  }
}

// Game Scene

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.levelWidth = 2400;
    this.physics.world.setBounds(0, 0, this.levelWidth, 540);
    this.cameras.main.setBounds(0, 0, this.levelWidth, 540);

    // Stopping intro music if it's still playing
    const introScene = this.scene.get("IntroScene");
    if (
      introScene &&
      introScene.introSound &&
      introScene.introSound.isPlaying
    ) {
      introScene.introSound.stop();
    }

    // Playing chapter music
    if (this.chapterMusic) {
      this.chapterMusic.stop();
    }

    if (GlobalState.chapter === 1) {
      this.chapterMusic = this.sound.add("evil_cue_sound", {
        loop: true,
      });
      this.chapterMusic.play();
    } else if (GlobalState.chapter === 2) {
      this.chapterMusic = this.sound.add("chapter2_bg_music", {
        loop: true,
      });
      this.chapterMusic.play();
    } else {
      this.chapterMusic = null;
    }

    // Adding chapter backgrounds
    const bgKey = `bg_${Math.min(GlobalState.chapter, 10)}`;
    // Locking camera
    this.background = this.add
      .tileSprite(0, 0, 960, 540, bgKey)
      .setOrigin(0, 0)
      .setScrollFactor(0);
    this.background.displayWidth = this.game.config.width;
    this.background.displayHeight = this.game.config.height;

    this.platforms = this.physics.add.staticGroup();
    this.platforms
      .create(this.levelWidth / 2, 520, "ground")
      .setDisplaySize(this.levelWidth, 40)
      .refreshBody();

    let startX = 100;
    if (this.currentCheckpoint) startX = this.currentCheckpoint.x;

    this.player = this.physics.add.sprite(startX, 400, "player");
    this.player.setCollideWorldBounds(true);
    this.playerHp = GlobalState.playerStats.hp;

    this.physics.add.collider(this.player, this.platforms);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.attackKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.saveKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );
    this.isTimeSlowed = false;

    this.positionHistory = []; // Array storing {x, y, hp, time}
    this.recordTimer = 0;
    this.rewindKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );
    this.timelineKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.T
    );
    this.isFuture = true;

    // WASD keys
    this.wasd = {
      up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };

    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.pause();
      this.scene.pause("UIScene");
      this.scene.launch("PauseScene");
    });

    this.bullets = this.physics.add.group({ allowGravity: false });
    this.enemyBullets = this.physics.add.group({ allowGravity: false });

    this.enemies = this.physics.add.group();
    this.boss = null;
    this.spawnEnemiesAndBoss();

    // Collisions
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.onPlayerHitEnemyBody,
      null,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemyBullets,
      this.onPlayerHitMagic,
      null,
      this
    );
    this.physics.add.overlap(
      this.bullets,
      this.enemies,
      this.onBulletHitEnemy,
      null,
      this
    );

    this.checkpoints = this.physics.add.staticGroup();
    if (!this.currentCheckpoint)
      this.currentCheckpoint = { x: 100, y: 400, id: "start" };

    this.createCheckpoint(400, 460, "cp1");
    this.createCheckpoint(1200, 460, "cp2");
    this.createCheckpoint(1900, 460, "cp3");
    this.physics.add.overlap(
      this.player,
      this.checkpoints,
      this.onReachCheckpoint,
      null,
      this
    );

    this.portal = this.physics.add.staticSprite(
      this.levelWidth - 80,
      455,
      "portal"
    );
    this.physics.add.overlap(
      this.player,
      this.portal,
      this.onReachPortal,
      null,
      this
    );

    this.scene.launch("UIScene");
    // Adding past and future platforms
    this.futurePlatforms = this.physics.add.staticGroup();
    this.pastPlatforms = this.physics.add.staticGroup();

    this.pastPlatforms
      .create(1600, 400, "ground")
      .setDisplaySize(200, 40)
      .refreshBody();

    this.futurePlatforms
      .create(1000, 350, "ground")
      .setDisplaySize(40, 300)
      .refreshBody();

    this.pastPlatforms.setVisible(false);
    this.pastPlatforms.setActive(false);
    this.futurePlatforms.setVisible(true);
    this.futurePlatforms.setActive(true);

    this.futureCollider = this.physics.add.collider(
      this.player,
      this.futurePlatforms
    );
    this.pastCollider = null; // will change when interacting with past
  }

  spawnEnemiesAndBoss() {
    const numEnemies = 15 + GlobalState.chapter;
    for (let i = 0; i < numEnemies; i++) {
      const x = 300 + i * 180;
      const enemy = this.enemies.create(x, 450, "enemy");
      enemy.setCollideWorldBounds(true);
      enemy.setBounce(0.2);
      enemy.hp = 20 + GlobalState.chapter * 5;
      enemy.isBoss = false;
      enemy.attackCooldown = 0;
      enemy.speed = 60;

      // Start Animation
      enemy.play("enemy_walk");
      enemy.body.id = `enemy_${i}_chap${GlobalState.chapter}`; // Assigning unique ID
    }

    const currentBossConfig =
      chapterBosses[GlobalState.chapter] || chapterBosses[1]; // Default to chapter 1 boss if not found

    this.boss = this.enemies.create(
      this.levelWidth - 200,
      440,
      currentBossConfig.key
    );
    this.boss.setCollideWorldBounds(true);
    this.boss.hp = 100 + GlobalState.chapter * 30;
    this.boss.isBoss = true;
    this.boss.attackCooldown = 0;
    this.boss.speed = 90;

    // Start Animation
    this.boss.play(`${currentBossConfig.key}_idle`);
    this.boss.body.id = `boss_chap${GlobalState.chapter}`; // Assigning unique ID
  }

  createCheckpoint(x, y, id) {
    const cp = this.checkpoints.create(x, y, "checkpoint");
    cp.checkpointId = id;
  }

  onReachCheckpoint(player, checkpoint) {
    this.currentCheckpoint = {
      x: checkpoint.x,
      y: checkpoint.y - 20,
      id: checkpoint.checkpointId,
    };
    this.showFloatingText(checkpoint.x, checkpoint.y - 60, "Checkpoint!");
    checkpoint.disableBody(true, true);
  }

  onReachPortal(player, portal) {
    if (this.boss && this.boss.active) {
      this.showFloatingText(portal.x, portal.y - 80, "Defeat Boss First!");
      return;
    }

    if (GlobalState.chapter >= GlobalState.totalChapters) {
      this.scene.start("GameOverScene", { reason: "victory" });
    } else {
      GlobalState.chapter += 1;
      if (GlobalState.chapter > 3 && !GlobalState.isSubscribed) {
        this.scene.start("GameOverScene", { reason: "subscription" });
        return;
      }
      GlobalState.remainingTimeSec = GlobalState.chapterTimeLimit;
      this.currentCheckpoint = { x: 100, y: 400, id: "start" };

      if (this.chapterMusic && this.chapterMusic.isPlaying) {
        this.chapterMusic.stop(); // Stopping current chapter music
      }
      // If there's a bossIntroSound, stopping it as well if it was playing
      if (
        GlobalState.chapter === 1 &&
        this.bossIntroSound &&
        this.bossIntroSound.isPlaying
      ) {
        this.bossIntroSound.stop(); // safety check
      }

      // Checks if there's a storyline for the next chapter
      if (storylines[GlobalState.chapter]) {
        this.scene.start("StorylineScene", {
          chapter: GlobalState.chapter,
        });
      } else {
        this.scene.restart();
      }
    }
  }

  toggleTimeline() {
    this.isFuture = !this.isFuture;

    if (this.isFuture) {
      this.pastPlatforms.setVisible(false);
      this.pastPlatforms.setActive(false);
      this.futurePlatforms.setVisible(true);
      this.futurePlatforms.setActive(true);

      if (this.pastCollider) {
        this.pastCollider.destroy();
        this.pastCollider = null;
      }
      if (!this.futureCollider || !this.futureCollider.active) {
        this.futureCollider = this.physics.add.collider(
          this.player,
          this.futurePlatforms
        );
      }

      this.showTimelineMemory(false);
    } else {
      this.futurePlatforms.setVisible(false);
      this.futurePlatforms.setActive(false);
      this.pastPlatforms.setVisible(true);
      this.pastPlatforms.setActive(true);

      if (this.futureCollider) {
        this.futureCollider.destroy();
        this.futureCollider = null;
      }
      if (!this.pastCollider || !this.pastCollider.active) {
        this.pastCollider = this.physics.add.collider(
          this.player,
          this.pastPlatforms
        );
      }

      this.showTimelineMemory(true);
    }

    this.cameras.main.flash(200, 255, 255, 255);
  }

  update(time, delta) {
    // We shift the texture of the TileSprite based on camera scroll
    this.background.tilePositionX = this.cameras.main.scrollX * 0.5;

    const totalTime = GlobalState.chapterTimeLimit;
    const remaining = GlobalState.remainingTimeSec;
    const percentLeft = remaining / totalTime;

    // Changing the color shades from Normal (White) to "End of Times" (Red/Dark) to show urgency
    if (this.background) {
      // 0xFFFFFF 0xFF5555
      const r = Math.floor(255 * percentLeft + 255 * (1 - percentLeft)); // simple fade logic example
      const gb = Math.floor(255 * percentLeft); // Green and Blue fade out

      // Apply tint to background
      const color = Phaser.Display.Color.GetColor(255, gb, gb);
      this.background.setTint(color);
    }

    // Player Movement & Animation
    if (this.shiftKey.isDown && GlobalState.playerStats.mana > 0) {
      if (!this.isTimeSlowed) {
        this.isTimeSlowed = true;
        this.physics.world.timeScale = 3.0;
        this.player.anims.timeScale = 3.0;
      }
      GlobalState.playerStats.mana -= 0.5;
    } else {
      if (this.isTimeSlowed) {
        this.isTimeSlowed = false;
        this.physics.world.timeScale = 1.0;
        this.player.anims.timeScale = 1.0;
      }
      if (GlobalState.playerStats.mana < 100) {
        GlobalState.playerStats.mana += 0.1;
      }
    }

    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      this.player.setVelocityX(-GlobalState.playerStats.speed);
      this.player.flipX = true;
      this.player.anims.play("player_run", true);
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      this.player.setVelocityX(GlobalState.playerStats.speed);
      this.player.flipX = false;
      this.player.anims.play("player_run", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("player_idle", true);
    }

    if (
      (this.cursors.up.isDown || this.wasd.up.isDown) &&
      this.player.body.onFloor()
    ) {
      this.player.setVelocityY(-420);
    }

    if (this.wasd.down.isDown && !this.player.body.onFloor()) {
      this.player.setVelocityY(GlobalState.playerStats.speed);
    }

    if (Phaser.Input.Keyboard.JustDown(this.attackKey)) this.fireBullet();
    if (Phaser.Input.Keyboard.JustDown(this.saveKey)) {
      saveGame(this.currentCheckpoint.id);
      this.showFloatingText(this.player.x, this.player.y - 50, "Saved!");
    }
    if (Phaser.Input.Keyboard.JustDown(this.timelineKey)) {
      this.toggleTimeline();
    }

    this.recordTimer += delta;
    if (this.recordTimer > 100) {
      this.positionHistory.push({
        x: this.player.x,
        y: this.player.y,
        hp: this.playerHp,
      });
      // keeps the last position history only upto 3 seconds
      if (this.positionHistory.length > 30) this.positionHistory.shift();
      this.recordTimer = 0;
    }

    if (
      Phaser.Input.Keyboard.JustDown(this.rewindKey) &&
      this.positionHistory.length > 0
    ) {
      GlobalState.remainingTimeSec -= 120; // Cost of rewinding time is 2 minutes

      const oldState = this.positionHistory[0];
      this.player.setPosition(oldState.x, oldState.y);
      this.playerHp = oldState.hp;
      this.positionHistory = [];

      this.cameras.main.flash(500, 0, 255, 255); // Cyan flash for time travel
      this.showFloatingText(this.player.x, this.player.y, "TIME REWIND!");
    }

    this.enemies.children.each((enemy) => {
      if (enemy.active) this.updateEnemyAI(enemy, delta);
    });
  }

  updateEnemyAI(enemy, delta) {
    if (enemy.attackCooldown > 0) enemy.attackCooldown -= delta;

    let speedMultiplier = 1;
    // If less than 15 mins left, enemies enrage
    if (GlobalState.remainingTimeSec < 15 * 60) {
      speedMultiplier = 1.5;
      enemy.setTint(0xff0000);
    } else {
      enemy.clearTint();
    }

    const dist = Phaser.Math.Distance.Between(
      enemy.x,
      enemy.y,
      this.player.x,
      this.player.y
    );

    // Face the player
    enemy.flipX = this.player.x < enemy.x;

    // Chase
    if (dist < 400 && dist > 50) {
      if (this.player.x < enemy.x)
        enemy.setVelocityX(-enemy.speed * speedMultiplier);
      else enemy.setVelocityX(enemy.speed * speedMultiplier);
    } else {
      enemy.setVelocityX(0);
    }

    // Magic Attack
    if (dist < 300 && dist > 100 && enemy.attackCooldown <= 0) {
      this.enemyFireMagic(enemy);
      enemy.attackCooldown = 2000;
    }
  }

  enemyFireMagic(enemy) {
    if (enemy.isBoss) {
      const currentBossConfig =
        chapterBosses[GlobalState.chapter] || chapterBosses[1];
      const bossAttackAnimKey =
        currentBossConfig.attackKey || `${currentBossConfig.key}_idle`; // Fallback to idle if no attack animation specified

      enemy.play(bossAttackAnimKey);
      enemy.once(`animationcomplete-${bossAttackAnimKey}`, () => {
        if (enemy.active) {
          enemy.play(`${currentBossConfig.key}_idle`);
        }
      });
    } else {
      enemy.play("enemy_attack_gif_anim");

      // Use 'onComplete' to switch back to the 'enemy_walk' animation after the attack animation finishes.
      enemy.once("animationcomplete-enemy_attack_gif_anim", () => {
        if (enemy.active) {
          // Only switch back if the enemy is still alive
          enemy.play("enemy_walk");
        }
      });
    }
    const bullet = this.enemyBullets.create(enemy.x, enemy.y, "enemy_bullet");
    this.physics.moveToObject(bullet, this.player, 250);
    bullet.lifespan = 2000;
  }

  onPlayerHitEnemyBody(player, enemy) {
    if (enemy.attackCooldown <= 0) {
      this.takeDamage(10); // All normal enemies deal 10 damage
      enemy.attackCooldown = 1000;
      if (player.x < enemy.x) player.setVelocityX(-300);
      else player.setVelocityX(300);
    }
  }

  onPlayerHitMagic(player, bullet) {
    bullet.destroy();
    this.takeDamage(15);
  }

  takeDamage(amount) {
    this.playerHp -= amount;
    this.showFloatingText(this.player.x, this.player.y - 40, `-${amount} HP`);
    this.cameras.main.shake(100, 0.01);

    if (this.playerHp <= 0) {
      this.handlePlayerDeath();
    }
  }

  handlePlayerDeath() {
    GlobalState.remainingTimeSec -= GlobalState.deathPenaltySec;
    if (GlobalState.remainingTimeSec <= 0) {
      GlobalState.remainingTimeSec = 0;
      this.scene.start("GameOverScene", { reason: "time" });
    } else {
      this.playerHp = GlobalState.playerStats.maxHp;
      this.player.setPosition(
        this.currentCheckpoint.x,
        this.currentCheckpoint.y
      );
      this.player.setVelocity(0, 0);
      const alert = this.add
        .text(this.player.x, this.player.y - 80, "-10 MINS (TIME WARP)!", {
          fontSize: "20px",
          color: "#ff0000",
          backgroundColor: "#000",
        })
        .setOrigin(0.5);
      this.time.delayedCall(2000, () => alert.destroy());
    }
  }

  onBulletHitEnemy(bullet, enemy) {
    bullet.destroy();
    enemy.hp -= GlobalState.playerStats.attack;
    this.showFloatingText(
      enemy.x,
      enemy.y - 30,
      `-${GlobalState.playerStats.attack}`
    );
    if (enemy.hp <= 0) {
      enemy.destroy();
    }
  }

  fireBullet() {
    const bullet = this.bullets.create(this.player.x, this.player.y, "bullet");
    const dir = this.player.flipX ? -1 : 1;
    bullet.body.velocity.x = dir * 400;
    this.time.delayedCall(1000, () => bullet.destroy());
  }

  showFloatingText(x, y, txt) {
    const t = this.add
      .text(x, y, txt, {
        fontSize: "14px",
        color: "#fff",
        stroke: "#000",
        strokeThickness: 2,
      })
      .setOrigin(0.5);
    this.tweens.add({
      targets: t,
      y: y - 40,
      alpha: 0,
      duration: 1000,
      onComplete: () => t.destroy(),
    });
  }

  showTimelineMemory(isPast) {
    // Getting random memory or possible scenario based on timeline
    const memories = isPast ? timelineMemories.past : timelineMemories.future;
    const randomMemory = memories[Math.floor(Math.random() * memories.length)];

    const overlay = this.add.rectangle(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      this.cameras.main.width,
      this.cameras.main.height,
      isPast ? 0x88ff88 : 0xff8888,
      0.7
    );
    overlay.setScrollFactor(0);
    overlay.setDepth(1000);

    const memoryText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 50,
        randomMemory,
        {
          fontSize: "20px",
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 3,
          wordWrap: { width: 800 },
          align: "center",
          backgroundColor: "#000000AA",
          padding: { x: 20, y: 15 },
        }
      )
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1001);

    const timelineLabel = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 150,
        isPast ? "PAST MEMORY" : "FUTURE VISION",
        {
          fontSize: "32px",
          color: isPast ? "#88ff88" : "#ff8888",
          stroke: "#000000",
          strokeThickness: 4,
          fontStyle: "bold",
        }
      )
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(1001);

    overlay.setAlpha(0);
    memoryText.setAlpha(0);
    timelineLabel.setAlpha(0);

    this.tweens.add({
      targets: [overlay, memoryText, timelineLabel],
      alpha: 1,
      duration: 500,
      ease: "Power2",
    });

    this.tweens.add({
      targets: [overlay, memoryText, timelineLabel],
      alpha: 0,
      duration: 500,
      delay: 3000,
      ease: "Power2",
      onComplete: () => {
        overlay.destroy();
        memoryText.destroy();
        timelineLabel.destroy();
      },
    });
  }
}

// Game Over Scene

class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }
  init(data) {
    this.reason = data.reason || "time";
  }

  create() {
    this.cameras.main.setBackgroundColor("#000");
    let msg = "";
    if (this.reason === "time")
      msg = "TIME EXPIRED\nArishem consumed your timeline.";
    else if (this.reason === "subscription")
      msg = "LOCKED\nSubscribe to proceed.";
    else if (this.reason === "victory")
      msg = "VICTORY\nYou escaped the Demon World!";

    this.add
      .text(480, 300, msg, {
        fontSize: "32px",
        color: "#f00",
        align: "center",
      })
      .setOrigin(0.5);
    this.add
      .text(480, 450, "Press ENTER to Menu", { fontSize: "20px" })
      .setOrigin(0.5);

    this.input.keyboard.on("keydown-ENTER", () =>
      this.scene.start("MainMenuScene")
    );
  }
}

const config = {
  type: Phaser.AUTO,
  width: 960,
  height: 540,
  pixelArt: false,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 800 }, debug: false },
  },
  scene: [
    BootScene,
    MainMenuScene,
    StorylineScene,
    IntroScene,
    GameScene,
    UIScene,
    PauseScene,
    HowToPlayScene,
    GameOverScene,
  ],
};

const game = new Phaser.Game(config);
