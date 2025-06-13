export const activities = {
  home: [
    {
      name: "Get some meal",
      icon: "🍲",
      effect: { hunger: 30, money: -5 },
      description: "Makan masakan mama - Menambah +30 hunger, bayar Rp. 5000",
      duration: 5,
      animation: "/assets/animations/makan-rumah.gif",
    },
    {
      name: "Take a bath",
      icon: "🚿",
      effect: { hygiene: 40 },
      description: "Bersihkan diri - Menambah +40 hygiene",
      duration: 5,
      animation: "./assets/animations/bath-home.gif",
    },
    {
      name: "Sleep",
      icon: "😴",
      effect: { energy: 50 },
      description: "Istirahat untuk memulihkan energi - Menambah +50 energy",
      duration: 5,
      animation: "./assets/animations/sleep-home.gif",
    },
    {
      name: "Do chores",
      icon: "🧹",
      effect: { hygiene: -10, hunger: -5, money: 25 },
      description:
        "Melakukan pekerjaan rumah - Mendapatkan Rp 25.000, mengurangi -10 hygiene dan -5 hunger",
      duration: 2,
      animation: null,
    },
  ],

  beach: [
    {
      name: "Explore the beach",
      icon: "🏖️",
      effect: { happiness: 20, energy: -15, hygiene: -10 },
      description:
        "Jelajahi pantai - Menambah +20 happiness, mengurangi -15 energy dan -10 hygiene",
      duration: 2,
      animation: "./assets/animations/explore-beach.gif",
    },
    {
      name: "Buy souvenirs",
      icon: "🐚",
      effect: { happiness: 15, money: -10 },
      description: "Beli souvenir - Menambah +15 happiness, biaya Rp 10.000",
      duration: 2,
      animation: null,
    },
    {
      name: "Eat at seafood restaurant",
      icon: "🍽️",
      effect: { hunger: 25, money: -20 },
      description: "Makan seafood - Menambah +25 hunger, biaya Rp 20.000",
      duration: 2,
      animation: null,
    },
    {
      name: "Buy Food",
      icon: "🍞",
      effect: { money: -10 },
      description: "Beli makanan - Biaya Rp 10.000, dapat 1 food",
      giveItem: "food",
      duration: 2,
      animation: null,
    },
    {
      name: "Sell Fish",
      icon: "🐟",
      effect: { money: +20 },
      description: "Jual ikan - Dapat Rp 20.000, butuh 1 fish",
      requireItem: "fish",
      removeItem: "fish",
      duration: 2,
      animation: null,
    },
  ],

  lake: [
    {
      name: "Ride a boat",
      icon: "🛥️",
      effect: { happiness: 25, hunger: -10, money: -15 },
      description:
        "Naik perahu - Menambah +25 happiness, mengurangi -10 hunger, biaya Rp 15.000",
      duration: 5,
      animation: "./assets/animations/riding-a-boat.gif",
    },
    {
      name: "Fishing",
      icon: "🎣",
      effect: { happiness: 15, energy: -10, hunger: -5 },
      description:
        "Memancing - Menambah +15 happiness, mengurangi -10 energy dan -5 hunger, mendapatkan satu ekor ikan",
      giveItem: "fish",
      duration: 2,
      animation: "./assets/animations/fishing.gif",
    },
    {
      name: "Buy crafts",
      icon: "🧶",
      effect: { happiness: 10, money: -10 },
      description:
        "Beli kerajinan lokal - Menambah +10 happiness, biaya Rp 10.000",
      duration: 2,
      animation: null,
    },
    {
      name: "Eat at a local restaurant",
      icon: "🍽",
      effect: { hunger: 25, money: -20 },
      description:
        "Makan direstoran lokal - Menambah +25 hunger, biaya Rp 20.000",
      duration: 2,
      animation: null,
    },
  ],

  temple: [
    {
      name: "Tour Guide",
      icon: "🛕",
      effect: { happiness: 20, hunger: -15, money: -10 },
      description:
        "Tur di candi - Menambah +20 happiness, mengurangi -15 hunger dengan biaya Rp 10.000",
      duration: 5,
      animation: null,
    },
    {
      name: "Pray",
      icon: "🙏",
      effect: { happiness: 50 },
      description: "Berdoa kepada Yang Maha Esa - Menambah +50 happiness",
      duration: 5,
      animation: "./assets/animations/berdoa.gif",
    },
    {
      name: "Eat at a restaurant",
      icon: "🍽️",
      effect: { hunger: 20, money: -15 },
      description:
        "Makan di restoran lokal - Menambah +20 hunger, biaya Rp 15.000",
      duration: 2,
      animation: null,
    },
    {
      name: "Buy Potion of Energetic",
      icon: "⚡",
      effect: { money: -15 },
      description: "Beli potion energi - Tambah 1 potion of energetic",
      giveItem: "potion of energetic",
      duration: 2,
      animation: null,
    },
    {
      name: "Buy Potion of Cheerfulness",
      icon: "🎉",
      effect: { money: -15 },
      description: "Beli potion kebahagiaan - Tambah 1 potion of cheerfulness",
      giveItem: "potion of cheerfulness",
      duration: 2,
      animation: null,
    },
    {
      name: "Buy Potion of Cleanliness",
      icon: "🧼",
      effect: { money: -15 },
      description: "Beli potion kebersihan - Tambah 1 potion of cleanliness",
      giveItem: "potion of cleanliness",
      duration: 2,
      animation: null,
    },
  ],

  mountain: [
    {
      name: "Hiking",
      icon: "🥾",
      effect: { happiness: 30, energy: -30, hunger: -10, hygiene: -15 },
      description:
        "Hiking di gunung - Menambah +30 happiness, mengurangi -30 energy, -10 hunger, dan -15 hygiene",
      duration: 5,
      animation: "./assets/animations/hiking.gif",
    },
    {
      name: "Take a photo",
      icon: "📷",
      effect: { happiness: 15, energy: 5 },
      description: "Mengambil foto - Menambah +15 happiness dan +5 energy",
      duration: 2,
      animation: null,
    },
    {
      name: "Eat indomie",
      icon: "🍽",
      effect: { hunger: 20, money: -5 },
      description: "Makan indomie - Menambah +20 hunger, biaya Rp 5.000",
      duration: 5,
      animation: "./assets/animations/makan-gunung.gif",
    },
  ],
};
