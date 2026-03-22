export const getCurrentMilestone = ( totalValue, milestones ) => {
  const nextMilestone = milestones.find(m => m.threshold > totalValue);

  const currentMilestone = [...milestones]
    .reverse()
    .find(m => m.threshold <= totalValue) || milestones[0];

  // If Max Level is Reached
  if (!nextMilestone) {
    return {
      currentLevel: currentMilestone.level,
      nextLevel: "MAX",
      progress: 100
    };
  }

  const progress = (totalValue / currentMilestone.threshold) * 100;

  return {
    currentLevel: currentMilestone.level,
    nextLevel: nextMilestone.level,
    progress: Math.min(progress, 99.9)
  };
};