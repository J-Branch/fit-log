export const ProgressBar = ({ progress }) => {  
  const displayValue = progress || 0;

  return (
    <div className="w-full">
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden border border-primary-black ">
        <div 
          className="h-full bg-light-default transition-all duration-700" 
          style={{ width: `${displayValue}%` }} 
        />
      </div>
    </div>
  );
};