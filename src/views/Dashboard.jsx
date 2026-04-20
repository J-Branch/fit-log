import { useMemo } from 'react';
import { useRouteLoaderData, useLoaderData } from "react-router-dom";
import { ProgressBar } from '../components/dashboard/LevelBar';
import { calculateLevel } from "../utils/dashboardUtils/levelCalculator";
import { WEIGHT_MILESTONES, DISTANCE_MILESTONES } from "../utils/dashboardUtils/gamificationConstants";
import { AchievementItem } from '../components/dashboard/AchievementItem';
import AchievementIcon from "../assets/icons/achievementIcon.svg";
import { AchievementPageLink } from "../components/dashboard/AchievementButton.jsx";

function Dashboard() {
    const { dailyQuote, userAggregate } = useRouteLoaderData("AppLayout");
    const { lastWeightliftingWorkout, lastDistanceWorkout } = useLoaderData();
    const quote = dailyQuote?.[0];

    console.log("aggregate data: ", userAggregate);

    const totalWeight = userAggregate[0].totalWeight;

    const totalDistance = userAggregate[0].totalDistance;

    console.log("totalWeight:", totalWeight);
    console.log("totalDistance:", totalDistance);

    const { level, progress } = useMemo(() => {
        return calculateLevel(totalWeight, totalDistance)
    }, [totalWeight, totalDistance]);

    const nextWeightGoal = WEIGHT_MILESTONES.find(m => m.threshold > totalWeight);
    const nextDistanceGoal = DISTANCE_MILESTONES.find(m => m.threshold > totalDistance);

    console.log("nextWeightGoal:", nextWeightGoal);

    return (
        <>
            <div className="flex flex-col h-screen w-full overflow-hidden">
                {/* Container for the top part of dashboard */}
                <div className="flex-none bg-primary-white">
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
                <div className="flex-1 bg-primary-white text-center pt-8">
                    Middle Content
                    {/* 
                    Want to fill this up with previous Workouts.
                    But need to fix backend issues first.
                    */}
                </div>

                {/* Container for the bottom part of dashboard */}
                <div className="flex-none flex flex-row bg-primary-white pb-3">
                    <div className="flex-1 text-center overflow-hidden">
                        Next Weightlifting Achievement

                        <AchievementItem 
                        threshold={nextWeightGoal.threshold} 
                        total={totalWeight} 
                        label={nextWeightGoal.comparison} 
                        />

                    </div>
                    <div className="flex-1 text-center overflow-hidden">
                        Next Distance Achievement

                        <AchievementItem 
                        threshold={nextDistanceGoal.threshold}
                        total={totalDistance}
                        label={nextDistanceGoal.comparison}
                        />
                    </div>
                    <div className="flex-1 text-center overflow-hidden">
                        Go To Achievements

                        {/* Add Button to go to Achievements Page */}
                        <AchievementPageLink to="achievements" icon={<img src={AchievementIcon} className="w-60 h-40"></img>} />
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard