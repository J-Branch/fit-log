import { useEffect, useMemo } from 'react';
import { Link, useRouteLoaderData } from "react-router-dom";
import { getWeightStats, getDistanceStats } from '../utils/dashboardUtils/achievementCalculator'; 
import { ProgressBar } from '../components/LevelBar';
import { calculateLevel } from "../utils/dashboardUtils/levelCalculator";
import { WEIGHT_MILESTONES, DISTANCE_MILESTONES } from "../utils/dashboardUtils/gamificationConstants";
import { getCurrentMilestone } from "../utils/dashboardUtils/achievementCalculator";
import { WorkoutRow } from '../utils/workoutPageUtils/workoutPageTable';
import AchievementIcon from '../assets/icons/achievementIcon.svg';
import CompletedAchievementIcon from '../assets/icons/completedAchievementIcon.svg';

function Dashboard() {
    const { dailyQuote, userSets, userWorkouts } = useRouteLoaderData("AppLayout");
    const quote = dailyQuote?.[0];

    const totalWeight = useMemo(() => {
        return userSets.reduce(( sum, set ) => sum + (set.reps * set.weight), 0);
    }, [userSets]);

    const totalDistance = useMemo(() => {
        return userWorkouts.reduce(( sum, workout ) => sum + workout.distance, 0);
    }, [userWorkouts]);

    const weightStats = useMemo(() => getWeightStats(totalWeight), [totalWeight]);
    const distanceStats = useMemo(() => getDistanceStats(totalDistance), [totalDistance]);

    const { level, progress } = useMemo(() => {
        return calculateLevel(totalWeight, totalDistance)
    }, [totalWeight, totalDistance]);

    return (
        <>
            <h1>Total Weight: {totalWeight}</h1>
            <h1>Current Weight Level: {weightStats.level} </h1>
            <h1>Current Weight Label: {weightStats.label} </h1>
            <h1>Current Weight Progress: {weightStats.progress} </h1>

            <h1>Total Distance: {totalDistance}</h1>
            <h1>Current Distance Level: {distanceStats.level} </h1>
            <h1>Current Distance Label: {distanceStats.label} </h1>
            <h1>Current Distance Progress: {distanceStats.progress} </h1>

            <div className="flex flex-col h-screen w-full">
                {/* Container for the top part of dashboard */}
                <div className="h-[15%]">
                    <div className="h-[20%] text-center">
                        Current Level: {level}
                        <ProgressBar progress={progress} />
                    </div>
                    <div className="h-[80%] text-center">
                        <h1>{quote?.text}</h1>
                        <h2>{quote?.author}</h2>
                    </div>
                </div>

                {/* Container for the middle part of dashboard */}
                <div className="h-[70%] bg-primary-gray">
                    Middle Content
                    {/* 
                    Want to fill this up with previous Workouts.
                    But need to fix backend issues first.
                    */}
                </div>

                {/* Container for the bottom part of dashboard */}
                <div className="h-[15%] flex flex-row bg-primary-red-one">
                    <div className="w-[50%] text-center">
                        Hello
                        <br />
                        <img src={CompletedAchievementIcon} className="w-40 h-30"></img>
                    </div>
                    <div className="w-[50%] text-center">
                        World
                        <br />
                        <img src={AchievementIcon} className="w-40 h-30"></img>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard