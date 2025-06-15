"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../navbar/page";
import Image from "next/image";
import { fetchMoonPhase, MoonData } from "../lib/fetchMoonPhase";
import { getRandomBirthdayFact } from "../lib/funFacts";
import { getBirthstone } from "../lib/getBirthstone";

type ApodResponse = {
  url: string;
  title: string;
  explanation: string;
  media_type: "image" | "video";
};

export default function Dashboard() {
  const searchParams = useSearchParams();
  const birthdayRaw = searchParams.get("birthday") || "2000-01-01";
  const userName = searchParams.get("name") || "User";

  const [apodData, setApodData] = useState<ApodResponse | null>(null);
  const [moon, setMoon] = useState<MoonData | null>(null);
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
    minutes: 0,
    seconds: 0,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const getZodiacSign = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    if ((month === 1 && day >= 20) || (month === 2 && day <= 18))
      return "Aquarius";
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20))
      return "Pisces";
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19))
      return "Aries";
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20))
      return "Taurus";
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20))
      return "Gemini";
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22))
      return "Cancer";
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22))
      return "Virgo";
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22))
      return "Libra";
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21))
      return "Scorpio";
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21))
      return "Sagittarius";
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19))
      return "Capricorn";

    return "Unknown";
  };

  const birthdayFormatted = formatDate(birthdayRaw);
  const zodiac = getZodiacSign(birthdayRaw);

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        const res = await fetch(
          `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&date=${birthdayRaw}`
        );
        const data = await res.json();
        setApodData(data);
      } catch (error) {
        console.error("Failed to fetch NASA APOD:", error);
      }
    };

    fetchAPOD();
  }, [birthdayRaw]);

  useEffect(() => {
    const birthdayDate = new Date(birthdayRaw);

    const updateAge = () => {
      const now = new Date();
      let years = now.getFullYear() - birthdayDate.getFullYear();
      let months = now.getMonth() - birthdayDate.getMonth();
      let days = now.getDate() - birthdayDate.getDate();
      let hours = now.getHours() - birthdayDate.getHours();
      let minutes = now.getMinutes() - birthdayDate.getMinutes();
      let seconds = now.getSeconds() - birthdayDate.getSeconds();

      if (seconds < 0) {
        seconds += 60;
        minutes--;
      }
      if (minutes < 0) {
        minutes += 60;
        hours--;
      }
      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        months += 12;
        years--;
      }

      setAge({ years, months, days, minutes, seconds });
    };

    updateAge();
    const interval = setInterval(updateAge, 1000);

    return () => clearInterval(interval);
  }, [birthdayRaw]);

  useEffect(() => {
    const loadMoonPhase = async () => {
      const moonData = await fetchMoonPhase(birthdayRaw);
      setMoon(moonData);
    };

    loadMoonPhase();
  }, [birthdayRaw]);

  type Star = { top: string; left: string };

  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      const totalStars = 30; // number of stars you want

      for (let i = 0; i < totalStars; i++) {
        const top = `${Math.floor(Math.random() * 100)}%`;
        const left = `${Math.floor(Math.random() * 100)}%`;
        newStars.push({ top, left });
      }

      setStars(newStars);
    };

    generateStars();
  }, []);

  const [funFact, setFunFact] = useState("");

  useEffect(() => {
    setFunFact(getRandomBirthdayFact(birthdayRaw, userName));
  }, [birthdayRaw, userName]);

  const birthstone = getBirthstone(birthdayRaw);

  return (
    <div className="min-h-screen bg-orange-50 text-black">
      <Navbar />

      <main className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 flex-col md:flex-row mt-5">
          <div className="text-orange-600 max-w-md">
            <h1 className="text-6xl font-bold text-orange-600 mb-4 ml-8">
              HI, {userName}
            </h1>
          </div>
          <p className="text-orange-600 max-w-[30%] text-lg text-right md:text-right mr-8">
            Welcome to your dashboard! Explore insights and facts about your
            special day.
          </p>
        </div>

        {/* Name and Zodiac Sign */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="md:col-span-6 md:row-span-2 bg-orange-600 text-white shadow-md p-9 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <h2 className="md:text-5xl font-bold">{birthdayFormatted}</h2>
              <div className="flex items-center gap-3">
                <p className="md:text-5xl font-bold mr-2">{zodiac}</p>
                <Image
                  src={`/zodiac/${zodiac.toLowerCase()}.png`}
                  alt={`${zodiac} sign`}
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>

          {/* NASA APOD */}
          <div className="md:col-span-6 md:row-span-3 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">
              NASA Astronomy Photo of the Day
            </h2>
            {apodData ? (
              <div className="flex justify-between flex-col md:flex-row">
                {apodData.media_type === "image" ? (
                  <img
                    src={apodData.url}
                    alt={apodData.title}
                    className="w-full md:w-[48%] h-auto rounded-xl mb-3"
                  />
                ) : (
                  <p className="text-lg">No photo on your birthday :(</p>
                )}
                <div className="md:w-[48%] text-justify">
                  <h3 className="text-xl font-semibold mb-2">
                    {apodData.title}
                  </h3>
                  <p className="text-lg">{apodData.explanation}</p>
                </div>
              </div>
            ) : (
              <p>Loading NASA photo...</p>
            )}
          </div>

          {/* Age */}
          <div className="md:col-span-2 md:row-span-1 bg-orange-600 text-white shadow-md p-9 rounded-2xl">
            <div className="w-full h-full flex flex-col items-center justify-center">
              <h2 className="md:text-2xl font-bold text-justify">
                Wow it's been{" "}
                <span className="text-orange-200">
                  {age.years} years, {age.months} months, {age.days} days,
                  {` `}
                  {age.minutes} minutes and {age.seconds} seconds
                </span>{" "}
                since the world witnessed your pretty face{" "}
                <span className="text-black">(˶˃ ᵕ ˂˶)</span>
              </h2>
            </div>
          </div>

          {/* Moon Phase */}
          <div className="relative md:col-span-4 md:row-span-2 bg-black text-white p-6 rounded-2xl shadow-md flex flex-col items-center overflow-hidden">
            {/* Random Static Stars */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              {stars.map((star, idx) => (
                <div
                  key={idx}
                  className="star"
                  style={{ top: star.top, left: star.left }}
                />
              ))}
            </div>

            {/* Moon Info */}
            <h2 className="text-2xl font-bold mb-2 z-10">
              Moon Phase: {moon ? moon.moon_phase : "Loading..."}
            </h2>

            {moon ? (
              <div className="flex justify-evenly mt-10 font-bold z-10 text-center w-full">
                <p>Illumination: {moon.moon_illumination}%</p>
                <p>Moonrise: {moon.moonrise}</p>
                <p>Moonset: {moon.moonset}</p>
              </div>
            ) : (
              <p className="z-10">Loading moon data...</p>
            )}

            <div className="flex justify-center items-end z-10">
              <Image
                src="/moon.png"
                alt="Moon decoration"
                width={350}
                height={300}
                className="mb-[-250px]"
              />
            </div>
          </div>

          {/* Fun Fact */}
          <div className="md:col-span-2 p-6 bg-orange-200 rounded-2xl shadow-md">
            <p className="text-lg font-bold">{funFact}</p>
          </div>

          {/* Birthstone */}
          <div className="md:col-span-4 md:row-span-4 bg-orange-600 p-8 rounded-2xl shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <Image
                  src={birthstone.image}
                  alt={birthstone.name}
                  width={180}
                  height={180}
                  className="mr-8 ml-4"
                />
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-3xl font-extrabold text-white mb-3">
                  Your birthstone is {birthstone.name}
                </h2>
                <p className="text-lg font-bold text-orange-200 leading-relaxed">
                  {birthstone.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
