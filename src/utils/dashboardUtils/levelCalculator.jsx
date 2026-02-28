// src/utils/fitnessLogic.js
import { WEIGHT_CONFIG, DISTANCE_CONFIG } from "./gamificationConstants";

const calculateStats = (totalValue, config) => {
  const { milestones, maxLevel } = config;

  // 1. Find the current and next milestones from your array
  let currentMilestone = milestones[0];
  let nextMilestone = milestones[milestones.length - 1];

  for (let i = 0; i < milestones.length; i++) {
    if (totalValue >= milestones[i].threshold) {
      currentMilestone = milestones[i];
    } else {
      nextMilestone = milestones[i];
      break;
    }
  }

  // 2. Calculate the specific Level
  // If they are between milestones (e.g., between Lvl 15 and 30), 
  // we calculate exactly where they are in that range.
  let level = currentMilestone.level;
  let progress = 0;

  if (totalValue < milestones[milestones.length - 1].threshold) {
    const rangeValue = nextMilestone.threshold - currentMilestone.threshold;
    const progressInThreshold = totalValue - currentMilestone.threshold;
    const levelRange = nextMilestone.level - currentMilestone.level;

    progress = progressInThreshold / rangeValue;
    level = Math.floor(currentMilestone.level + (progress * levelRange));
  } else {
    level = maxLevel;
    progress = 1;
  }

  return {
    level: Math.min(level, maxLevel),
    label: currentMilestone.comparison,
    nextLabel: nextMilestone.comparison,
    progress: Math.min(Math.max(progress, 0), 1)
  };
};

export const getWeightStats = (totalLbs) => calculateStats(totalLbs, WEIGHT_CONFIG);
export const getDistanceStats = (totalMiles) => calculateStats(totalMiles, DISTANCE_CONFIG);