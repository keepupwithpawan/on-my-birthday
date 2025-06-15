// lib/fetchMoonPhase.ts

export type MoonData = {
  moon_phase: string;
  moon_illumination: string;
  moonrise: string;
  moonset: string;
};

export async function fetchMoonPhase(birthday: string): Promise<MoonData | null> {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/astronomy.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=auto:ip&dt=${birthday}`
    );
    const data = await response.json();
    return data.astronomy.astro;
  } catch (error) {
    console.error("Failed to fetch moon phase data:", error);
    return null;
  }
}
