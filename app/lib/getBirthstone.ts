export type BirthstoneInfo = {
  name: string;
  meaning: string;
  image: string;
  description: string;
};

export function getBirthstone(birthday: string): BirthstoneInfo {
  const month = new Date(birthday).getMonth() + 1;

  const birthstones: Record<number, BirthstoneInfo> = {
    1: {
      name: "Garnet",
      meaning: "Symbolizes protection, vitality, and strength.",
      image: "/birthstones/garnet.png",
      description:
        "Garnet, the stone of deep passion and energy, is known for safeguarding travelers and igniting inner fire. Those born in January are believed to carry a grounded yet determined spirit, with Garnet fueling their ambitions and emotional resilience.",
    },
    2: {
      name: "Amethyst",
      meaning: "Represents clarity, peace, and protection.",
      image: "/birthstones/amethyst.png",
      description:
        "Amethyst is a calming stone that enhances spiritual wisdom and inner peace. February-born individuals often possess a balanced and intuitive nature, and Amethyst is said to strengthen their clarity and emotional intelligence.",
    },
    3: {
      name: "Aquamarine",
      meaning: "Embodies tranquility, courage, and communication.",
      image: "/birthstones/aquamarine.png",
      description:
        "With a color reminiscent of the sea, Aquamarine promotes harmony and clear communication. March babies are thought to be naturally empathetic and serene, with Aquamarine offering protection and emotional balance.",
    },
    4: {
      name: "Diamond",
      meaning: "Symbol of purity, strength, and eternal love.",
      image: "/birthstones/diamond.png",
      description:
        "Diamond, the hardest gemstone, symbolizes unmatched strength and everlasting love. April-born individuals are believed to shine with inner brilliance, and the diamond enhances their clarity, confidence, and resilience.",
    },
    5: {
      name: "Emerald",
      meaning: "Represents rebirth, wisdom, and love.",
      image: "/birthstones/emerald.png",
      description:
        "Emerald is the stone of vibrant growth and renewal. May-born individuals are often nurturing, wise, and compassionate. Emerald is said to open the heart and enhance their ability to love and lead with grace.",
    },
    6: {
      name: "Pearl",
      meaning: "Signifies purity, humility, and serenity.",
      image: "/birthstones/pearl.png",
      description:
        "Pearls, created by nature over time, represent innocence and calm. Those born in June often radiate a quiet elegance and depth of emotion. Pearl enhances their inner serenity and timeless charm.",
    },
    7: {
      name: "Ruby",
      meaning: "Represents passion, vitality, and courage.",
      image: "/birthstones/ruby.png",
      description:
        "Ruby, the king of gems, fuels energy and confidence. July-born individuals are vibrant, bold, and fiercely loyal. Ruby empowers their heart-driven nature and helps them lead with fiery determination.",
    },
    8: {
      name: "Spinel",
      meaning: "Symbolizes warmth, prosperity, and peace.",
      image: "/birthstones/spinel.png",
      description:
        "Spinel brings sunshine and prosperity to those born in August. Known to repel negativity and foster abundance, this gem amplifies their innate generosity and optimistic spirit.",
    },
    9: {
      name: "Sapphire",
      meaning: "Stands for wisdom, loyalty, and nobility.",
      image: "/birthstones/sapphire.png",
      description:
        "Sapphire is the gem of deep insight and truth. September-born souls are known for their integrity and clarity of thought. This stone enhances their mental focus and spiritual depth.",
    },
    10: {
      name: "Opal",
      meaning: "Encourages creativity, hope, and transformation.",
      image: "/birthstones/opal.png",
      description:
        "Opal is a mystical gem full of color and mystery. October-born individuals are imaginative, intuitive, and full of charm. Opal nurtures their creativity and emotional awareness.",
    },
    11: {
      name: "Topaz",
      meaning: "Symbolizes abundance, joy, and strength.",
      image: "/birthstones/topaz.png",
      description:
        "Topaz radiates with positivity and good fortune. Those born in November are thoughtful and grounded, and Topaz enhances their warmth and manifesting power.",
    },
    12: {
      name: "Turquoise",
      meaning: "Represents healing, protection, and truth.",
      image: "/birthstones/turquoise.png",
      description:
        "Turquoise is a stone of healing and spiritual grounding. December-born individuals often carry a wise, calm presence. Turquoise strengthens their communication and shields them from negativity.",
    },
  };

  return birthstones[month];
}
