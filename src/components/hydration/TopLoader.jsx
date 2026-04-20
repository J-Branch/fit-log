import { useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function TopLoader() {
  const navigation = useNavigation();
  const isLoading = navigation.state !== "idle";

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isLoading) {
      setVisible(true);
      setProgress(10);

      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 90) return p;
          return p + Math.random() * 10;
        });
      }, 200);
    } else {
      setProgress(100);

      const timeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 300);

      return () => clearTimeout(timeout);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 z-50 h-[3px] w-full bg-transparent">
      <div
        className="h-full bg-primary-red-one transition-all duration-200 ease-out"
        style={{ width: progress + "%" }}
      />
    </div>
  );
}