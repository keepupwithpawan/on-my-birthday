"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [birthday, setBirthday] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthday || !name) return;
    const encodedName = encodeURIComponent(name.trim());
    router.push(
      `/dashboard?name=${encodeURIComponent(encodedName)}&birthday=${birthday}`
    );
  };

  const zodiacImages = [
    { src: "/zodiac/aries.png", style: "top-10 left-50 rotate-[10deg]" },
    { src: "/zodiac/taurus.png", style: "top-10 right-38 -rotate-[15deg]" },
    { src: "/zodiac/gemini.png", style: "top-50 left-10 rotate-[5deg]" },
    {
      src: "/zodiac/cancer.png",
      style: "top-[25%] right-[22%] -rotate-[10deg]",
    },
    { src: "/zodiac/leo.png", style: "bottom-20 left-16 rotate-[8deg]" },
    { src: "/zodiac/virgo.png", style: "bottom-50 right-14 -rotate-[-10deg]" },
    { src: "/zodiac/libra.png", style: "top-[55%] left-[15%] rotate-[6deg]" },
    { src: "/zodiac/scorpio.png", style: "bottom-10 right-55 -rotate-[5deg]" },
    {
      src: "/zodiac/sagittarius.png",
      style: "top-65 left-[19.5%] rotate-[15deg]",
    },
    { src: "/zodiac/capricorn.png", style: "top-76 right-[4%] -rotate-[8deg]" },
    {
      src: "/zodiac/aquarius.png",
      style: "bottom-14 left-[20%] rotate-[4deg]",
    },
    {
      src: "/zodiac/pisces.png",
      style: "bottom-60 right-[25%] -rotate-[6deg]",
    },
  ];

  return (
    <main className="relative flex min-h-screen items-center justify-center bg-orange-600 p-6 overflow-hidden">
      {zodiacImages.map((zodiac, index) => (
        <Image
          key={index}
          src={zodiac.src}
          alt={`Zodiac ${index}`}
          width={80}
          height={80}
          className={`absolute opacity-80 ${zodiac.style} pointer-events-none`}
        />
      ))}

      <div className="relative w-[400px] h-[500px] flex flex-col bg-white p-8 rounded-2xl shadow-xl border-black border-2 text-left z-10">
        <div className="absolute -top-43 -right-43 z-10">
          <Image
            src="/star-doodle.png"
            alt="Star decoration"
            width={100}
            height={100}
            className="w-90 h-90"
          />
        </div>

        <div className="flex-grow">
          <h1 className="text-4xl font-bold text-black mb-2">
            Birthday Insights
          </h1>
          <p className="text-black/50 text-base">
            Discover amazing things about the day you were born! Download your
            OnMyBirthday Card and share with your friends and family!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-auto space-y-5">
          <input
            type="text"
            required
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-5 py-3 text-black border-2 border-orange-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
          <input
            type="date"
            required
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full px-5 py-3 text-black border-2 border-orange-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-3 rounded-2xl hover:bg-orange-700 transition-shadow shadow-md"
          >
            On My Birthday...
          </button>
        </form>
      </div>
    </main>
  );
}
