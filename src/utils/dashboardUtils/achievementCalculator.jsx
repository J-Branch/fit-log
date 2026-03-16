// src/utils/fitnessLogic.js
export const getCurrentMilestone = ( totalValue, milestones ) => {
  const currentMilestone = milestones.find(milestone => milestone.threshold >= totalValue);

  if (!currentMilestone) {
    return {}
  } 

  const progress = totalValue / currentMilestone.threshold;

  /* 
    RETURN - 
    Milestone that you are currently on
    Progress for that milestone
  */
  return {
    progress: Math.min(progress, 99.9)
  };
};