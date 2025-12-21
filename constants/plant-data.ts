import { PlantWateringDataEntry, PlantType } from '@/types/plant';

export const PlantWateringData: Record<PlantType, PlantWateringDataEntry> = {
  [PlantType.Monstera]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 14, // days
        maximum: 21 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.Pothos]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 14, // days
        maximum: 21 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.SpiderPlant]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 10, // days
        maximum: 14 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.SnakePlant]: {
    wateringRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 21 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 42 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.RubberPlant]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 14, // days
        maximum: 21 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.PeaceLily]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 10, // days
        maximum: 14 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.ZzPlant]: {
    wateringRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 21 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 42 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.Philodendron]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 10, // days
        maximum: 14 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.Dracaena]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 14, // days
        maximum: 21 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.AloeVera]: {
    wateringRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 21 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 42 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.FiddleLeafFig]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 10, // days
        maximum: 14 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.ChineseEvergreen]: {
    wateringRange: {
      inSeason: {
        minimum: 7, // days
        maximum: 10 // days
      },
      outOfSeason: {
        minimum: 14, // days
        maximum: 21 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.BostonFern]: {
    wateringRange: {
      inSeason: {
        minimum: 2, // days
        maximum: 3 // days
      },
      outOfSeason: {
        minimum: 3, // days
        maximum: 5 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.JadePlant]: {
    wateringRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 21 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 42 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  },

  [PlantType.EnglishIvy]: {
    wateringRange: {
      inSeason: {
        minimum: 5, // days
        maximum: 7 // days
      },
      outOfSeason: {
        minimum: 7, // days
        maximum: 10 // days
      }
    },
    fertilizeRange: {
      inSeason: {
        minimum: 14, // days
        maximum: 28 // days
      },
      outOfSeason: {
        minimum: 28, // days
        maximum: 35 // days
      }
    }
  }
};

export const PLANT_IMAGES_BY_TYPE = {
  [PlantType.Monstera]: require('@/assets/images/plants/monstera-1.jpg'),
  [PlantType.Pothos]: require('@/assets/images/plants/pothos-1.jpg'),
  [PlantType.Dracaena]: require('@/assets/images/plants/dracaena-1.jpg'),
  [PlantType.SpiderPlant]: require('@/assets/images/plants/spider-plant-1.jpg'),
  [PlantType.SnakePlant]: require('@/assets/images/plants/snake-plant-1.jpg'),
  [PlantType.RubberPlant]: require('@/assets/images/plants/rubber-plant-1.jpg'),
  [PlantType.PeaceLily]: require('@/assets/images/plants/peace-lily-1.jpg'),
  [PlantType.ZzPlant]: require('@/assets/images/plants/zz-plant-1.jpg'),
  [PlantType.Philodendron]: require('@/assets/images/plants/philodendron-1.jpg'),
  [PlantType.AloeVera]: require('@/assets/images/plants/aloe-vera-1.jpg'),
  [PlantType.FiddleLeafFig]: require('@/assets/images/plants/fiddle-leaf-fig-1.jpg'),
  [PlantType.ChineseEvergreen]: require('@/assets/images/plants/chinese-evergreen-1.jpg'),
  [PlantType.BostonFern]: require('@/assets/images/plants/boston-fern-1.jpg'),
  [PlantType.JadePlant]: require('@/assets/images/plants/jade-plant-1.jpg'),
  [PlantType.EnglishIvy]: require('@/assets/images/plants/english-ivy-1.jpg'),
  [PlantType.Succulent]: require('@/assets/images/plants/succulent-1.jpg'),
  [PlantType.PrayerPlant]: require('@/assets/images/plants/prayer-plant-1.jpg'),
  [PlantType.ArrowheadPlant]: require('@/assets/images/plants/arrowhead-plant-1.jpg'),
  [PlantType.Peperomia]: require('@/assets/images/plants/peperomia-1.jpg'),
  [PlantType.WaxPlant]: require('@/assets/images/plants/wax-plant-1.jpg'),
  [PlantType.InchPlant]: require('@/assets/images/plants/inch-plant-1.jpg'),
  [PlantType.StringOfPearls]: require('@/assets/images/plants/string-of-pearls-1.jpg'),
  [PlantType.DumbCane]: require('@/assets/images/plants/dumb-cane-1.jpg'),
  [PlantType.UmbrellaPlant]: require('@/assets/images/plants/umbrella-plant-1.jpg'),
  [PlantType.Anthurium]: require('@/assets/images/plants/anthurium-1.jpg'),
  [PlantType.ParlorPalm]: require('@/assets/images/plants/parlor-palm-1.jpg'),
  [PlantType.CastIronPlant]: require('@/assets/images/plants/cast-iron-plant-1.jpg'),
  [PlantType.BirdOfParadise]: require('@/assets/images/plants/bird-of-paradise-1.jpg'),
  [PlantType.Croton]: require('@/assets/images/plants/croton-1.jpg')
};

export interface PlantCareData {
  overview: string;
  watering: string;
  fertilizer: string;
  light: string;
  soil: string;
}

export const PLANT_CARE_DATA: Record<PlantType, PlantCareData> = {
  [PlantType.Pothos]: {
    overview:
      "Pothos is a trailing vine with heart-shaped, glossy leaves that can be variegated in shades of green, yellow, and white. It's one of the most popular and forgiving houseplants, perfect for beginners.",
    watering:
      'During growing season (spring and summer), water when the top 1-2 inches of soil feels dry, typically every 7-10 days. In fall and winter, reduce watering to every 2-3 weeks as growth slows. Pothos is drought-tolerant and prefers to dry out slightly between waterings rather than staying constantly moist.',
    fertilizer:
      'Feed every 4-6 weeks during the growing season (spring through early fall) with a balanced, water-soluble houseplant fertilizer diluted to half strength. No fertilizer needed in winter.',
    light: 'Thrives in low to bright indirect light, though variegated varieties maintain better color in brighter conditions. Avoid direct sunlight which can scorch the leaves.',
    soil: 'Use a well-draining potting mix. A standard houseplant soil or a mix of potting soil with perlite works well.'
  },

  [PlantType.SnakePlant]: {
    overview:
      "Snake plants feature upright, sword-like leaves with striking patterns that can reach several feet tall. They're extremely hardy and can survive considerable neglect, making them ideal for busy plant owners.",
    watering:
      'During growing season (spring and summer), water every 2-3 weeks, allowing soil to dry completely between waterings. In fall and winter, reduce to every 4-6 weeks or even less. Overwatering is the most common cause of problems with snake plants.',
    fertilizer: 'Feed once in spring and once in mid-summer with a balanced, diluted houseplant fertilizer. Snake plants have minimal fertilizer needs and can thrive without regular feeding.',
    light: 'Tolerates low light but grows best in indirect bright light. Can handle some direct morning sun.',
    soil: 'Requires well-draining soil, such as a cactus or succulent mix. Standard potting soil amended with sand or perlite also works well.'
  },

  [PlantType.SpiderPlant]: {
    overview:
      'Spider plants produce long, arching leaves with green and white stripes and send out runners with baby plantlets called "spiderettes." They\'re fast-growing and excellent for hanging baskets or elevated planters.',
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry, typically once a week, keeping soil evenly moist. In fall and winter, reduce watering to every 10-14 days as growth slows. They can tolerate some drought but prefer consistent moisture during active growth.',
    fertilizer: 'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and skip fertilizing in winter.',
    light: 'Prefers bright, indirect light but tolerates a range of lighting conditions from partial shade to bright spots. Avoid harsh direct sunlight.',
    soil: "Use a well-draining, general-purpose potting mix. They're not particularly fussy about soil composition."
  },

  [PlantType.PeaceLily]: {
    overview:
      "Peace lilies are elegant plants with dark green, glossy leaves and distinctive white spathes (modified leaves) that resemble flowers. They're excellent natural air purifiers and will visibly droop when thirsty.",
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry or when the plant begins to droop slightly, usually once a week. In fall and winter, reduce to every 10-14 days. They prefer consistently moist (but not waterlogged) soil year-round but tolerate less frequent watering when dormant.',
    fertilizer: 'Feed every 6-8 weeks during spring and summer with a balanced, water-soluble houseplant fertilizer diluted to half strength. No fertilizer needed in fall and winter.',
    light: 'Thrives in low to medium indirect light, making them perfect for offices and dimmer rooms. Can tolerate brighter light but avoid direct sun.',
    soil: 'Use a rich, well-draining potting mix that retains some moisture. A peat-based potting soil works well.'
  },

  [PlantType.RubberPlant]: {
    overview:
      'Rubber plants are tree-like specimens with large, thick, glossy leaves that can be deep green, burgundy, or variegated. They can grow into impressive indoor trees when given proper care.',
    watering:
      'During growing season (spring and summer), water when the top 1-2 inches of soil is dry, approximately once a week. In fall and winter, reduce watering to every 2-3 weeks as growth slows significantly. They prefer soil that dries out slightly between waterings to prevent root rot.',
    fertilizer: 'Feed monthly during spring and summer with a balanced, water-soluble fertilizer at half strength. Reduce to every 6-8 weeks in fall and skip fertilizing in winter.',
    light: 'Prefers bright, indirect light for best growth and leaf color. Can tolerate medium light but growth will slow, and variegated varieties may lose their patterns.',
    soil: 'Use a well-draining potting mix. A standard houseplant soil or a mix with added perlite for drainage works best.'
  },

  [PlantType.Monstera]: {
    overview:
      'Monstera is a tropical climbing plant famous for its large, split, and perforated leaves that develop as the plant matures. Also known as the Swiss cheese plant, it creates an instant jungle atmosphere.',
    watering:
      'During growing season (spring and summer), water when the top 2-3 inches of soil is dry, typically every 7-10 days. In fall and winter, reduce watering to every 2-3 weeks. Prefers evenly moist soil during active growth but should not sit in water.',
    fertilizer: 'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and skip fertilizing in winter.',
    light: 'Thrives in bright, indirect light but can tolerate medium light conditions. Direct sunlight can burn the leaves.',
    soil: 'Needs a well-draining, nutrient-rich potting mix. A mixture of potting soil, perlite, and orchid bark provides good drainage and aeration.'
  },

  [PlantType.ZzPlant]: {
    overview:
      "The ZZ plant features thick, waxy, dark green leaves on upright stems that grow from underground rhizomes. It's virtually indestructible and perfect for low-light spaces and forgetful waterers.",
    watering:
      'During growing season (spring and summer), water every 2-3 weeks, allowing soil to dry out completely between waterings. In fall and winter, reduce to every 4-6 weeks or less. The rhizomes store water, making the plant very drought-tolerant, and overwatering is the biggest risk.',
    fertilizer: 'Feed once in spring and once in mid-summer with a balanced, diluted houseplant fertilizer. ZZ plants have very minimal fertilizer needs and grow well with infrequent feeding.',
    light: 'Tolerates low light extremely well but grows faster in bright, indirect light. Avoid prolonged direct sunlight.',
    soil: 'Requires well-draining soil to prevent root rot. Use a cactus/succulent mix or standard potting soil with added perlite or sand.'
  },

  [PlantType.Philodendron]: {
    overview: "Philodendrons are a diverse genus with heart-shaped leaves that come in climbing and non-climbing varieties. They're easy to grow and propagate, making them perennial favorites.",
    watering:
      'During growing season (spring and summer), water when the top inch of soil feels dry, usually once a week. In fall and winter, reduce watering to every 10-14 days. They prefer consistently moist soil during active growth but can tolerate occasional missed waterings.',
    fertilizer: 'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and skip fertilizing in winter.',
    light: 'Prefers medium to bright, indirect light. Can tolerate lower light but growth will slow and leaves may become smaller.',
    soil: 'Use a well-draining, peat-based potting mix. Adding perlite or orchid bark improves drainage and aeration.'
  },

  [PlantType.Dracaena]: {
    overview:
      "Dracaenas are a large group of plants with strappy, often colorful foliage on woody stems that can grow into small indoor trees. They're available in many varieties with different leaf patterns and colors.",
    watering:
      "During growing season (spring and summer), water when the top 2-3 inches of soil is dry, typically every 7-10 days. In fall and winter, reduce watering to every 2-3 weeks. They're somewhat drought-tolerant and prefer to dry out between waterings.",
    fertilizer: 'Feed monthly during spring and summer with a balanced, water-soluble houseplant fertilizer at half strength. Reduce to every 6-8 weeks in fall and skip fertilizing in winter.',
    light: 'Prefers medium to bright, indirect light. Variegated varieties need more light to maintain their patterns, while solid green types tolerate lower light.',
    soil: 'Use a well-draining potting mix. Standard houseplant soil works well, or you can add perlite for extra drainage.'
  },

  [PlantType.AloeVera]: {
    overview:
      'Aloe vera is a succulent plant with thick, fleshy leaves containing a gel famous for its soothing properties on burns and skin irritations. The spiky, upright leaves form attractive rosettes.',
    watering:
      'During growing season (spring and summer), water deeply every 2-3 weeks, allowing the soil to dry out completely between waterings. In fall and winter, reduce to every 4-6 weeks as the plant goes dormant. Overwatering is the most common cause of problems.',
    fertilizer:
      'Feed 2-3 times during spring and summer (once every 6-8 weeks) with a balanced, water-soluble fertilizer diluted to half strength or a succulent-specific fertilizer. No fertilizer needed in fall and winter.',
    light: 'Prefers bright, indirect light and can tolerate some direct sunlight. Insufficient light will cause the plant to become leggy and pale.',
    soil: 'Requires excellent drainage. Use a cactus or succulent potting mix, or create your own with regular potting soil mixed with sand and perlite.'
  },

  [PlantType.ChineseEvergreen]: {
    overview:
      "Chinese evergreens feature attractive, patterned leaves in various shades of green, silver, pink, and red depending on the variety. They're remarkably tolerant of low light and neglect.",
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry, approximately every 7-10 days. In fall and winter, reduce watering to every 2-3 weeks. They prefer evenly moist soil but are forgiving of occasional under-watering.',
    fertilizer:
      'Feed every 4-6 weeks during spring and summer with a balanced, water-soluble houseplant fertilizer diluted to half strength. Reduce to every 8 weeks in fall and skip fertilizing in winter.',
    light: 'Tolerates low to medium light very well, though varieties with more color prefer brighter conditions. Avoid direct sunlight which can scorch the leaves.',
    soil: 'Use a well-draining potting mix that retains some moisture. A standard houseplant soil or peat-based mix works well.'
  },

  [PlantType.FiddleLeafFig]: {
    overview:
      "Fiddle leaf figs are statement plants with large, violin-shaped leaves that can grow into impressive indoor trees reaching 6-10 feet tall. They're more particular about their care than some houseplants but are stunning when thriving.",
    watering:
      "During growing season (spring and summer), water when the top 1-2 inches of soil is dry, typically once a week. In fall and winter, reduce watering to every 10-14 days as growth slows. They prefer consistent watering schedules and don't like to completely dry out or stay soggy.",
    fertilizer:
      'Feed monthly during spring and summer with a balanced, water-soluble fertilizer at half strength or use a fiddle leaf fig-specific fertilizer. Reduce to every 6-8 weeks in fall and skip fertilizing in winter.',
    light: 'Requires bright, indirect light for optimal growth. They can tolerate some direct morning sun but need protection from harsh afternoon rays.',
    soil: 'Needs well-draining soil to prevent root rot. Use a high-quality potting mix amended with perlite or a commercial fiddle leaf fig soil blend.'
  },

  [PlantType.BostonFern]: {
    overview:
      "Boston ferns are lush, feathery plants with gracefully arching fronds that create a soft, cascading effect. They're classic houseplants that thrive in humid environments and look beautiful in hanging baskets.",
    watering:
      'During growing season (spring and summer), keep soil consistently moist, checking every 2-3 days and watering as needed. In fall and winter, allow the top half-inch to dry slightly between waterings, checking every 3-5 days. They may need daily misting in dry environments year-round.',
    fertilizer: 'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and every 6-8 weeks in winter.',
    light: 'Prefers bright, indirect light but tolerates medium light conditions. Avoid direct sunlight which can scorch the delicate fronds.',
    soil: 'Use a rich, well-draining potting mix that retains moisture. A peat-based mix or standard potting soil works well.'
  },

  [PlantType.JadePlant]: {
    overview:
      "Jade plants are slow-growing succulents with thick, oval-shaped leaves on branching stems that develop a tree-like appearance over time. They're symbols of good luck and can live for decades with proper care.",
    watering:
      'During growing season (spring and summer), water deeply when the soil is completely dry, usually every 2-3 weeks. During fall and winter dormancy, reduce watering significantly to once a month or even less, as the plant requires minimal water when not actively growing.',
    fertilizer:
      'Feed every 4-6 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength or a succulent-specific fertilizer. No fertilizer needed during fall and winter dormancy.',
    light: 'Needs bright light, including several hours of direct sunlight daily for best growth and to prevent legginess. South or west-facing windows are ideal.',
    soil: 'Requires excellent drainage. Use a cactus or succulent potting mix, or create a blend of regular potting soil with sand and perlite.'
  },

  [PlantType.EnglishIvy]: {
    overview:
      "English ivy is a versatile climbing or trailing vine with lobed leaves that can be solid green or variegated. It's excellent for hanging baskets, topiaries, or as a climbing plant with support.",
    watering:
      'During growing season (spring and summer), water when the top inch of soil feels dry, typically every 5-7 days. In fall and winter, reduce watering to every 7-10 days. Prefers evenly moist soil year-round and benefits from occasional misting to increase humidity, especially in dry indoor environments.',
    fertilizer: 'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and skip fertilizing in winter.',
    light: 'Prefers bright, indirect light but tolerates medium light conditions. Variegated varieties need more light to maintain their patterns.',
    soil: 'Use a well-draining, general-purpose potting mix. Adding perlite can improve drainage and prevent root rot.'
  },

  [PlantType.Succulent]: {
    overview:
      "Succulents are a diverse group of water-storing plants with thick, fleshy leaves that come in countless shapes, colors, and sizes. They're low-maintenance and perfect for sunny windowsills or bright desks.",
    watering:
      'During growing season (spring and summer), water deeply every 2-3 weeks when soil is completely dry. In fall and winter, reduce to once a month or less as they enter dormancy. Overwatering causes rot, so always err on the side of underwatering.',
    fertilizer:
      'Feed 2-3 times during spring and summer (every 6-8 weeks) with a balanced, water-soluble fertilizer diluted to half strength or use a succulent-specific formula. No fertilizer needed in fall and winter.',
    light: 'Need bright light with several hours of direct sun daily. South or west-facing windows are ideal. Insufficient light causes stretching and pale coloring.',
    soil: 'Require excellent drainage. Use a cactus or succulent potting mix, or create a blend of regular potting soil with coarse sand and perlite in a 1:1:1 ratio.'
  },

  [PlantType.PrayerPlant]: {
    overview:
      'Calatheas are stunning tropical plants known for their elaborately patterned leaves and unique behavior of folding their leaves up at night. They require more attention than most houseplants but reward you with dramatic foliage.',
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry, typically every 5-7 days, keeping soil consistently moist. In fall and winter, reduce to every 7-10 days. Use filtered or distilled water as they're sensitive to chemicals in tap water.',
    fertilizer:
      'Feed every 3-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to quarter strength. Reduce to every 6-8 weeks in fall and skip fertilizing in winter.',
    light: 'Prefer medium to bright, indirect light. Direct sunlight will fade the leaf patterns and scorch the leaves. Can tolerate lower light but growth will slow.',
    soil: 'Need well-draining, moisture-retentive soil. Use a peat-based mix with added perlite for drainage, or a specialized African violet mix.'
  },

  [PlantType.ArrowheadPlant]: {
    overview:
      'Syngoniums are fast-growing vining plants with arrow-shaped leaves that come in shades of green, pink, and white. As they mature, the leaf shape changes from compact arrows to larger, more lobed foliage.',
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry, approximately every 5-7 days. In fall and winter, reduce watering to every 10-14 days. They prefer evenly moist soil but tolerate brief periods of dryness.',
    fertilizer:
      'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and skip fertilizing in winter.',
    light: 'Thrive in medium to bright, indirect light. Varieties with more white or pink coloring need brighter light to maintain their variegation. Avoid direct sun.',
    soil: 'Use a well-draining, peat-based potting mix. Adding perlite or orchid bark improves drainage and root aeration.'
  },

  [PlantType.Peperomia]: {
    overview:
      "Peperomias are compact plants with diverse leaf shapes, textures, and patterns ranging from smooth and glossy to deeply textured and rippled. They're slow-growing and stay relatively small, making them perfect for limited spaces.",
    watering:
      'During growing season (spring and summer), water when the top 2 inches of soil is dry, approximately every 7-10 days. In fall and winter, reduce to every 2-3 weeks. Their thick leaves store water, so they're drought-tolerant.',
    fertilizer:
      'Feed every 4-6 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. They have low fertilizer needs and can skip feeding in fall and winter.',
    light: 'Prefer bright, indirect light but tolerate medium light conditions. Varieties with darker leaves handle lower light better than variegated types.',
    soil: 'Need well-draining soil as they're susceptible to root rot. Use a mix of peat-based potting soil with perlite or orchid bark for improved drainage.'
  },

  [PlantType.WaxPlant]: {
    overview:
      "Hoyas are trailing or climbing succulents with thick, waxy leaves and clusters of fragrant, star-shaped flowers when mature. They're long-lived plants that become more beautiful with age.",
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry and the leaves feel slightly less firm, typically every 7-10 days. In fall and winter, reduce to every 2-3 weeks. They prefer to dry out between waterings.',
    fertilizer:
      'Feed every 2-4 weeks during spring and summer with a high-phosphorus fertilizer (like a bloom formula) diluted to half strength to encourage flowering. Reduce to monthly in fall and skip in winter.',
    light: 'Need bright, indirect light with some direct morning sun to bloom well. Can tolerate medium light but flowering will be reduced or absent.',
    soil: 'Require well-draining soil. Use a chunky mix of potting soil, orchid bark, and perlite, or a succulent mix with added organic matter.'
  },

  [PlantType.InchPlant]: {
    overview:
      "Tradescantias are fast-growing trailing plants with colorful, striped foliage in combinations of green, purple, pink, and silver. They're vigorous growers that create cascading displays and propagate easily.",
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry, typically every 5-7 days. In fall and winter, reduce to every 7-10 days. They prefer consistently moist soil but tolerate brief dry periods.',
    fertilizer:
      'Feed every 2-3 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and every 6-8 weeks in winter.',
    light: 'Need bright, indirect light to maintain vibrant colors. Lower light causes the colorful variegation to fade and growth to become leggy. Can handle some direct morning sun.',
    soil: "Use a well-draining, general-purpose potting mix. They're not particularly fussy about soil composition."
  },

  [PlantType.StringOfPearls]: {
    overview:
      "String of Pearls is a distinctive succulent with trailing stems adorned with spherical, pea-shaped leaves that resemble beads on a string. It's a conversation-starter plant perfect for hanging baskets.",
    watering:
      'During growing season (spring and summer), water when the pearls start to slightly shrivel or feel soft, typically every 2-3 weeks. In fall and winter, reduce to every 4-6 weeks. Overwatering is the most common cause of failure.',
    fertilizer:
      'Feed 2-3 times during spring and summer (every 6-8 weeks) with a balanced, water-soluble fertilizer diluted to half strength. No fertilizer needed in fall and winter.',
    light: 'Needs bright light with some direct sun for compact growth. South or west-facing windows work best. Insufficient light causes stretching and gaps between pearls.',
    soil: 'Requires excellent drainage. Use a cactus or succulent potting mix, or create a blend of potting soil with extra perlite and coarse sand.'
  },

  [PlantType.DumbCane]: {
    overview:
      'Dieffenbachias are upright plants with large, oblong leaves featuring bold white or yellow patterns against green backgrounds. They're fast-growing and make impressive floor plants, though all parts are toxic if ingested.',
    watering:
      'During growing season (spring and summer), water when the top 1-2 inches of soil is dry, approximately every 5-7 days. In fall and winter, reduce watering to every 10-14 days. They prefer evenly moist soil during active growth.',
    fertilizer:
      'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer at half strength. Reduce to monthly in fall and skip fertilizing in winter.',
    light: 'Thrive in medium to bright, indirect light. Too much direct sun bleaches the leaves, while too little light causes legginess and fading of variegation.',
    soil: 'Use a well-draining, peat-based potting mix that retains some moisture. Adding perlite improves drainage.'
  },

  [PlantType.UmbrellaPlant]: {
    overview:
      "Scheffleras are tree-like plants with glossy, palmate leaves that radiate from a central point like umbrella spokes. They're fast-growing and can become impressive indoor trees with proper care.",
    watering:
      'During growing season (spring and summer), water when the top 2-3 inches of soil is dry, typically every 7-10 days. In fall and winter, reduce to every 2-3 weeks. They tolerate some drought but prefer consistent moisture during active growth.',
    fertilizer:
      'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and skip fertilizing in winter.',
    light: 'Prefer bright, indirect light but tolerate medium light conditions. Variegated varieties need brighter light to maintain their patterns. Can adapt to lower light but growth slows significantly.',
    soil: 'Use a well-draining, rich potting mix. Standard houseplant soil works well, or add perlite for improved drainage.'
  },

  [PlantType.Anthurium]: {
    overview:
      'Anthuriums are exotic tropical plants known for their glossy, heart-shaped flowers (actually modified leaves called spathes) in red, pink, white, or orange. The blooms are long-lasting and appear throughout the year with proper care.',
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry, approximately every 5-7 days. In fall and winter, reduce to every 7-10 days. They prefer evenly moist soil but excellent drainage to prevent root rot.',
    fertilizer:
      'Feed every 2-4 weeks during spring and summer with a phosphorus-rich fertilizer diluted to quarter strength to encourage blooming. Reduce to monthly in fall and every 6-8 weeks in winter.',
    light: 'Need bright, indirect light to bloom well. Direct sun burns the leaves and flowers. Can tolerate medium light but flowering will be reduced.',
    soil: 'Require a very well-draining, chunky mix. Use an orchid potting mix or create a blend of peat, perlite, and orchid bark in equal parts.'
  },

  [PlantType.ParlorPalm]: {
    overview:
      "Parlor Palms are compact, elegant palms with delicate, arching fronds that bring a tropical feel to any space. They're slow-growing, shade-tolerant, and one of the easiest palms to grow indoors.",
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry, keeping soil consistently moist but not waterlogged, typically every 5-7 days. In fall and winter, reduce to every 7-10 days as growth slows.',
    fertilizer:
      'Feed every 4-6 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength or use a palm-specific fertilizer. Reduce to every 8 weeks in fall and skip winter feeding.',
    light: 'Thrive in low to medium, indirect light, making them perfect for dimmer corners. Can tolerate brighter light but avoid direct sun which scorches the fronds.',
    soil: 'Use a well-draining, peat-based potting mix that retains some moisture. A mix with added perlite works well.'
  },

  [PlantType.CastIronPlant]: {
    overview:
      'Cast Iron Plants earn their name from their nearly indestructible nature, tolerating neglect, low light, and temperature fluctuations. They have long, dark green, blade-like leaves that grow directly from the soil.',
    watering:
      'During growing season (spring and summer), water when the top 2-3 inches of soil is dry, approximately every 7-10 days. In fall and winter, reduce to every 2-3 weeks. They're very drought-tolerant and prefer underwatering to overwatering.',
    fertilizer:
      'Feed once in spring and once in mid-summer with a balanced, water-soluble fertilizer diluted to half strength. They have minimal fertilizer needs and grow well with infrequent feeding.',
    light: 'Tolerates very low light better than almost any other houseplant. Can also handle medium to bright, indirect light, though growth is slow regardless of light level.',
    soil: 'Use a well-draining, general-purpose potting mix. They're not particular about soil type as long as it drains adequately.'
  },

  [PlantType.BirdOfParadise]: {
    overview:
      'Birds of Paradise are dramatic tropical plants with large, banana-like leaves that create a bold architectural statement. Mature plants produce stunning orange and blue flowers resembling tropical birds, though flowering rarely occurs indoors.',
    watering:
      'During growing season (spring and summer), water when the top 2-3 inches of soil is dry, approximately every 5-7 days. In fall and winter, reduce to every 10-14 days. They prefer consistently moist soil during active growth but need good drainage.',
    fertilizer:
      'Feed every 2 weeks during spring and summer with a balanced, water-soluble fertilizer at full strength. Reduce to monthly in fall and every 6-8 weeks in winter.',
    light: 'Need very bright, indirect light with several hours of direct sun daily for best growth and any chance of flowering. South or west-facing windows are ideal.',
    soil: 'Use a rich, well-draining potting mix. A blend of standard potting soil with perlite and compost works well for providing nutrients and drainage.'
  },

  [PlantType.Croton]: {
    overview:
      'Crotons are flamboyant tropical plants with thick, leathery leaves in brilliant combinations of red, orange, yellow, green, and purple. They're stunning accent plants that require more consistent care than many houseplants.',
    watering:
      'During growing season (spring and summer), water when the top inch of soil is dry, approximately every 5-7 days, keeping soil evenly moist. In fall and winter, reduce to every 7-10 days but don't allow complete drying. They're sensitive to both overwatering and underwatering.',
    fertilizer:
      'Feed every 2-4 weeks during spring and summer with a balanced, water-soluble fertilizer diluted to half strength. Reduce to monthly in fall and every 6-8 weeks in winter.',
    light: 'Need very bright, indirect light with some direct sun to maintain vibrant leaf colors. Insufficient light causes colors to fade and leaf drop. East or west-facing windows work best.',
    soil: 'Use a well-draining, peat-based potting mix that retains some moisture. Adding perlite helps with drainage while maintaining adequate moisture retention.'
  }
};
