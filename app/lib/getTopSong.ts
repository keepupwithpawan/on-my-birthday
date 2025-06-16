// app/lib/getTopSong.ts

export type TopSong = {
  date: string;
  song: string;
  artist: string;
};

export type TopSongWithCover = TopSong & {
  coverUrl?: string;
};

/**
 * Fetch #1 Billboard Hot 100 song on nearest chart date >= birthday.
 * Uses public GitHub JSON data from mhollingshead/billboard-hot-100 :contentReference[oaicite:0]{index=0}.
 */
export async function getTopSong(birthday: string): Promise<TopSong | null> {
  const date = new Date(birthday);
  const day = date.getDay(); // 0 = Sunday, … 6 = Saturday
  const diff = (6 - day + 7) % 7;
  date.setDate(date.getDate() + diff);
  const dateStr = date.toISOString().slice(0, 10);
  const url = `https://raw.githubusercontent.com/mhollingshead/billboard-hot-100/main/date/${dateStr}.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const json = await res.json();
    const topEntry = json.data.find((e: any) => e.this_week === 1);
    if (!topEntry) return null;
    return { date: json.date, song: topEntry.song, artist: topEntry.artist };
  } catch {
    return null;
  }
}

/**
 * Enhances TopSong with album art via iTunes Search API :contentReference[oaicite:1]{index=1}.
 */
export async function getTopSongWithCover(
  birthday: string
): Promise<TopSongWithCover | null> {
  const base = await getTopSong(birthday);
  if (!base) return null;

  const query = encodeURIComponent(`${base.song} ${base.artist}`);
  const itunesUrl = `https://itunes.apple.com/search?term=${query}&entity=song&limit=1`;

  try {
    const res = await fetch(itunesUrl);
    const data = await res.json();
    const artwork100 = data.results?.[0]?.artworkUrl100;

    if (!artwork100) {
      console.log("❌ No album cover found from iTunes for:", query);
      return base;
    }

    const coverUrl = artwork100.replace("100x100", "600x600");
    console.log("✅ Album cover URL:", coverUrl); // <--- This logs the image URL
    return { ...base, coverUrl };
  } catch (err) {
    console.error("❌ Error fetching album cover", err);
    return base;
  }
}

