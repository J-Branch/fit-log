import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const AchievementItem = ({ threshold, total, label }) => {
    const rawPercentage = (total / threshold) * 100;
    const displayPercentage = rawPercentage.toFixed(1);
    const isCompleted = total >= threshold;

    return (
        <div className="flex flex-col items-center">
            <div className="w-24 h-24">
                <CircularProgressbarWithChildren
                    value={rawPercentage}
                    styles={buildStyles({
                        pathColor: '#ff4d4d', 
                        trailColor: '#27272a', 
                        strokeLinecap: 'round',
                        pathTransitionDuration: 0.5,
                    })}
                >
                    {/* Everything in here is centered in the circle */}
                    <div className="text-center">
                        <div className="text-white font-bold text-lg">{displayPercentage}%</div>
                        <div className="text-[10px] text-zinc-500 uppercase">Goal</div>
                    </div>
                </CircularProgressbarWithChildren>
            </div>
            
            {/* Label below the circle */}
            <span className="text-zinc-300 text-sm font-medium">{label}</span>
        </div>
    );
};