import { useEffect, useMemo } from 'react';
import { Link, useRouteLoaderData } from "react-router-dom";
import { getWeightStats, getDistanceStats } from '../utils/dashboardUtils/levelCalculator'; 

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

    return (
        <>
            <h1><a href="https://zenquotes.io/">{quote?.text}</a></h1>
            <h2>{quote?.author}</h2>

            <h1>Total Weight: {totalWeight}</h1>
            <h1>Current Weight Level: {weightStats.level} </h1>
            <h1>Current Weight Label: {weightStats.label} </h1>
            <h1>Current Weight Progress: {weightStats.progress} </h1>

            <h1>Total Distance: {totalDistance}</h1>
            <h1>Current Distance Level: {distanceStats.level} </h1>
            <h1>Current Distance Label: {distanceStats.label} </h1>
            <h1>Current Distance Progress: {distanceStats.progress} </h1>
        </>
    );
}

export default Dashboard