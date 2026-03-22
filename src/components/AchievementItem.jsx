import AchievementIcon from '../assets/icons/achievementIcon.svg';
import CompletedAchievementIcon from '../assets/icons/completedAchievementIcon.svg';
import { ProgressBar } from './LevelBar';

export const AchievementItem = ({ threshold, total }) => {
    const completed = total >= threshold;
    const progress = completed ? 99.9 : (total / threshold) * 100;

    return (
        <div className="flex flex-row w-full">
            <div className="w-[20%]">
                <img 
                    src={completed ? CompletedAchievementIcon : AchievementIcon}
                    alt="Achievement Status"
                    className="h-6 w-4"
                />
            </div>
            <div className="w-[80%]">
                <ProgressBar progress={progress} />
            </div>
        </div>
    );
};