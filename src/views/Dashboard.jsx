import { useMemo } from 'react';
import { useRouteLoaderData, useLoaderData } from "react-router-dom";
import { ProgressBar } from '../components/dashboard/LevelBar';
import { calculateLevel } from "../utils/dashboardUtils/levelCalculator";
import { WEIGHT_MILESTONES, DISTANCE_MILESTONES } from "../utils/dashboardUtils/gamificationConstants";
import { AchievementItem } from '../components/dashboard/AchievementItem';
import AchievementIcon from "../assets/icons/achievementIcon.svg";
import { AchievementPageLink } from "../components/dashboard/AchievementButton.jsx";
import { MetricCard } from "../components/dashboard/MetricCard.jsx";

function Dashboard() {
    const { dailyQuote, userAggregate } = useRouteLoaderData("AppLayout");
    const { lastWeightliftingWorkout, lastDistanceWorkout, stats } = useLoaderData();
    const quote = dailyQuote[0];

    const totalWeight = userAggregate[0].totalWeight;
    const totalDistance = userAggregate[0].totalDistance;

    const { level, progress } = useMemo(() => {
        return calculateLevel(totalWeight, totalDistance)
    }, [totalWeight, totalDistance]);

    const nextWeightGoal = WEIGHT_MILESTONES.find(m => m.threshold > totalWeight);
    const nextDistanceGoal = DISTANCE_MILESTONES.find(m => m.threshold > totalDistance);

    return (
        <>
            <div className="flex flex-col h-screen w-full overflow-hidden">
                {/* Container for the top part of dashboard */}
                <div className="flex-none bg-white border-b border-gray-100 py-4">
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-2xl text-center px-10">
                            <span className="text-primary-red-one font-bold uppercase tracking-widest text-sm">
                                Current Level: {level}
                            </span>
                            <ProgressBar progress={progress} color="var(--color-primary-red-one)" />
                        </div>
                        <div className="mt-4 text-center px-4">
                            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">"{quote?.text}"</h1>
                            <h2 className="text-gray-500 italic mt-1">- {quote?.author}</h2>
                        </div>
                    </div>
                </div>

                {/* Container for the middle part of dashboard */}
                <div className="flex-1 bg-white p-6 overflow-hidden flex flex-col"> 
                    <div className="grid h-full w-full 
                        grid-cols-1 md:grid-cols-2 lg:grid-cols-3 
                        grid-rows-6 md:grid-rows-3 lg:grid-rows-2 
                        gap-4 md:gap-6">

                        <MetricCard 
                            title="Monthly Volume" 
                            value={stats.monthlyWeight} 
                            unit="lbs" 
                            label="Total weight moved this month" 
                        />
                        <MetricCard 
                            title="Monthly Distance" 
                            value={stats.monthlyDistance} 
                            unit="mi" 
                            label="Total distance covered" 
                        />
                        <MetricCard 
                            title="Consistency" 
                            value={stats.workoutCount} 
                            unit="days" 
                            label="Workouts in the last 30 days" 
                        />
                        <MetricCard 
                            title="Strength Trend" 
                            value={stats.weightTrendDiff} 
                            unit="lbs" 
                            trend={stats.weightTrend}
                            label="Last 3 vs. Monthly Average" 
                        />
                        <MetricCard 
                            title="Peak Performance" 
                            value={stats.peakLift} 
                            unit="lbs" 
                            label="Heaviest session this month" 
                        />
                        <MetricCard 
                            title="Avg Session" 
                            value={stats.distanceAvg} 
                            unit="mi" 
                            label="Average miles per outing" 
                        />
                    </div>
                </div>

                {/* Container for the bottom part of dashboard */}
                <div className="flex-none flex flex-row bg-white pb-3 text-black">
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