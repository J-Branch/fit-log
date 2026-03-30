import { useEffect, useMemo } from 'react';
import { Link, useRouteLoaderData } from "react-router-dom";
import { ProgressBar } from '../components/dashboard/LevelBar';
import { calculateLevel } from "../utils/dashboardUtils/levelCalculator";
import { WEIGHT_MILESTONES, DISTANCE_MILESTONES } from "../utils/dashboardUtils/gamificationConstants";
import { getCurrentMilestone } from "../utils/dashboardUtils/achievementCalculator";
import { WorkoutRow } from '../utils/workoutPageUtils/workoutPageTable';
import { AchievementItem } from '../components/dashboard/AchievementItem';
import AchievementIcon from "../assets/icons/achievementIcon.svg";
import { AchievementPageLink } from "../components/dashboard/AchievementButton.jsx";


function Dashboard() {
    const { dailyQuote, userSets, userWorkouts } = useRouteLoaderData("AppLayout");
    const quote = dailyQuote?.[0];

    const totalWeight = useMemo(() => {
        return userSets.reduce(( sum, set ) => sum + (set.reps * set.weight), 0);
    }, [userSets]);

    const totalDistance = useMemo(() => {
        return userWorkouts.reduce(( sum, workout ) => sum + workout.distance, 0);
    }, [userWorkouts]);

    const { level, progress } = useMemo(() => {
        return calculateLevel(totalWeight, totalDistance)
    }, [totalWeight, totalDistance]);

    const nextWeightGoal = WEIGHT_MILESTONES.find(m => m.threshold > totalWeight);
    const nextDistanceGoal = DISTANCE_MILESTONES.find(m => m.threshold > totalDistance);

    return (
        <>
            <div className="flex flex-col h-screen w-full">
                {/* Container for the top part of dashboard */}
                <div className="h-[15%] bg-primary-white border-l-1">
                    <div className="flex flex-col">
                        <div className="h-[20%] text-center ml-10 mr-10">
                            Current Level: {level}
                            <ProgressBar progress={progress} />
                        </div>
                        <div className="h-[80%] text-center">
                            <h1>{quote?.text}</h1>
                            <h2>- {quote?.author}</h2>
                        </div>
                    </div>
                </div>

                {/* Container for the middle part of dashboard */}
                <div className="h-[60%] bg-primary-white border-1 text-center">
                    Middle Content
                    {/* 
                    Want to fill this up with previous Workouts.
                    But need to fix backend issues first.
                    */}
                </div>

                {/* Container for the bottom part of dashboard */}
                <div className="h-[25%] flex flex-row bg-primary-white border-l-1">
                    <div className="w-[40%] text-center overflow-y-auto">
                        Next Weightlifting Achievement

                        <AchievementItem 
                        threshold={nextWeightGoal.threshold} 
                        total={totalWeight} 
                        label={nextWeightGoal.comparison} 
                        />

                    </div>
                    <div className="w-[40%] text-center overflow-y-auto">
                        Next Distance Achievement

                        <AchievementItem 
                        threshold={nextDistanceGoal.threshold}
                        total={totalDistance}
                        label={nextDistanceGoal.comparison}
                        />
                    </div>
                    <div className="w-[20%] text-center overflow-y-auto">
                        Go To Achievements

                        {/* Add Button to go to Achievements Page */}
                        <AchievementPageLink to="achievements" icon={<img src={AchievementIcon} className="w-40 h-30"></img>} />
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard