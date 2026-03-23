import AchievementIcon from '../assets/icons/achievementIcon.svg';
import CompletedAchievementIcon from '../assets/icons/completedAchievementIcon.svg';
import { ProgressBar } from './LevelBar';

export const AchievementItem = ({ threshold, total }) => {
    const completed = total >= threshold;
    const progress = completed ? 99.9 : (total / threshold) * 100;

    return (
        <div className="flex flex-row w-full p-2">
            <div className="w-[10%]">
                <img 
                    src={completed ? CompletedAchievementIcon : AchievementIcon}
                    alt="Achievement Status"
                    className="h-8 w-8"
                />
            </div>
            <div className="w-[90%]">
                <div className="flex flex-col">
                    <div className="h-[20%]">
                        Total {total} / Threshold {threshold}
                    </div>
                    <div className="h-[80%]">
                        <ProgressBar progress={progress} /> 
                    </div>
                </div>
            </div>
        </div>
    );
};