export const WEIGHT_CONFIG = {
    base: 25,
    exponent: 2.0,
    maxLevel: 100,
    milestones: [
        { level: 1, threshold: 1, comparison: "Your First Pound" },
        { level: 5, threshold: 10000, comparison: "An Elephant" },
        { level: 10, threshold: 20000, comparison: "Anchor of a Cruise Ship" },
        { level: 15, threshold: 30000, comparison: "Average Weight of an 18 Wheeler" },
        { level: 20, threshold: 45000, comparison: "Statue of Liberty" },
        { level: 30, threshold: 300000, comparison: "A Blue Whale" },
        { level: 40, threshold: 404600, comparison: "Boeing 747" },
        { level: 55, threshold: 990000, comparison: "International Space Station" },
        { level: 70, threshold: 1440000, comparison: "Heaviest Door in the world" },
        { level: 90, threshold: 4000000, comparison: "CERN Particle Accelerator" },
        { level: 95, threshold: 162240000, comparison: "The Washington Monument" },
        { level: 99, threshold: 12000000000, comparison: "The Great Pyramid of Khufu" },
        { level: 100, threshold: 116000000000, comparison: "The Great Wall of China" }
  ]
};

export const DISTANCE_CONFIG = {
    base: 0.5,
    exponent: 2.35, // Adjusted to hit ~25k at Level 100
    maxLevel: 100,
    milestones: [
      { level: 1, threshold: 1, comparison: "The First Mile" },
      { level: 5, threshold: 5.4984, comparison: "The height of Everest" },
      { level: 10, threshold: 13.1, comparison: "Half Marathon Length" },
      { level: 15, threshold: 26.2, comparison: "Full Marathon Length" },
      { level: 30, threshold: 277, comparison: "Length of the Grand Canyon" },
      { level: 40, threshold: 350, comparison: "Length of the English Channel" },
      { level: 55, threshold: 2197.9, comparison: "Length of the Appalachian Trail" },
      { level: 70, threshold: 2800, comparison: "Length of the Continental USA" },
      { level: 85, threshold: 4258, comparison: "Length of the Nile River" },
      { level: 90, threshold: 12450, comparison: "Half the length of the Globe" },
      { level: 95, threshold: 13171, comparison: "Total length of the Great Wall of China"},
      { level: 99, threshold: 24901, comparison: "Total length of the Globe" },
      { level: 100, threshold: 238900, comparison: "Distance to the moon" }
    ]
  };