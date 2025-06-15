// app/lib/fetchApod.ts

export type ApodResponse = {
  url: string;
  title: string;
  explanation: string;
  media_type: "image" | "video";
};

export async function fetchApodByDate(
  date: string
): Promise<ApodResponse | null> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&date=${date}`
    );

    if (!res.ok) {
      console.error("Failed to fetch APOD", await res.text());
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching APOD:", error);
    return null;
  }
}
