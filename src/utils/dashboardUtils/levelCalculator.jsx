export const calculateLevel = ( totalWeight, totalDistance ) => {
    const totalXP = (totalWeight * .10) + (totalDistance * 500);

    const BASE_XP = 100;
    const GROWTH = 1.1;

    // Base Case for New User
    if (totalXP < BASE_XP) {
        return {
            level: 1,
            progress: (totalXP / BASE_XP) * 100
        };
    }

    const level = Math.floor(Math.log(totalXP / BASE_XP) / Math.log(GROWTH)) + 1;
    const xpAtLevelStart = BASE_XP * Math.pow(GROWTH, level - 1);
    const xpAtLevelNext = BASE_XP * Math.pow(GROWTH, level);
    const progress = ((totalXP - xpAtLevelStart) / (xpAtLevelNext - xpAtLevelStart)) * 100;


    return {
        level,
        progress: Math.min(progress, 99.9)
    };
};