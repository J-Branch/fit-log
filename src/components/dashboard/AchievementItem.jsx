import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const AchievementItem = ({ threshold, total, label }) => {
    const rawPercentage = (total / threshold) * 100;
    const displayPercentage = rawPercentage.toFixed(1);

    return (
        <div className="flex flex-col items-center">
            <div className="w-[30%] h-[30%]">
                <CircularProgressbarWithChildren
                    value={rawPercentage}
                    styles={buildStyles({
                        pathColor: '#800020', 
                        trailColor: '#989595', 
                        strokeLinecap: 'round',
                        pathTransitionDuration: 0.5,
                    })}
                >
                    {/* Everything in here is centered in the circle */}
                    <div className="text-center">
                        <div className="text-primary-red-one font-bold text-[20px]">{displayPercentage}%</div>
                        <div className="text-[16px] text-primary-black uppercase">Goal</div>
                    </div>
                </CircularProgressbarWithChildren>
            </div>
            
            {/* Label below the circle */}
            <span className="text-primary-black text-sm font-medium">{label}</span>
        </div>
    );
};