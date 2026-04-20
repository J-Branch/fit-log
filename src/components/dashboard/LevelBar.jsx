export const ProgressBar = ({ progress }) => {  
  const displayValue = progress || 0;

  return (
    <div className="w-full">
      <div className="h-4 bg-primary-gray-two rounded-full overflow-hidden border border-primary-black ">
        <div 
          className="h-full bg-primary-red-one transition-all duration-700" 
          style={{ width: `${displayValue}%` }} 
        />
      </div>
    </div>
  );
};