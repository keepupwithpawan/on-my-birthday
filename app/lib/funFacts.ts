// lib/funFacts.ts

export function getRandomBirthdayFact(birthday: string, name?: string): string {
  const date = new Date(birthday);
  const year = date.getFullYear();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });

  const facts = [
    `If you were born on Mars, you'd only be around ${(new Date().getFullYear() - year) / 1.88} Martian years old!`,
    `Your birthday on Venus would come every ${(365 * 243 / 365.25).toFixed(0)} Earth days — that's a LOOOOONG wait!`,
    `Since ${birthday}, Earth has completed approximately ${(new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365.25)} rotations around the Sun!`,
    `Did you know? On your birthday, the moon was in the phase: 🌑🌒🌓🌔🌕🌖🌗🌘 — guess which one?`,
    `On ${day} ${month}, many famous people were born. Maybe you're destined for greatness too!`,
    `Hey ${name || "you"}, fun fact: Your heart has beaten over ${Math.floor(((new Date().getTime() - date.getTime()) / 1000 / 60) * 70).toLocaleString()} times since you were born.`,
    `If you were a dog, you'd be approximately ${Math.floor((new Date().getFullYear() - year) * 7)} years old! 🐶`,
    `Since ${birthday}, you've taken over ${Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24) * 2000).toLocaleString()} breaths.`,
    `In your lifetime, light has traveled nearly ${(new Date().getTime() - date.getTime()) / 1000 * 299792458 / 1000}. km since you were born.`,
    `On the day you were born, thousands of stars were exactly where they needed to be for you to arrive. Cosmic coincidence? ✨`,
  ];

  const index = Math.floor(Math.random() * facts.length);
  return facts[index];
}
