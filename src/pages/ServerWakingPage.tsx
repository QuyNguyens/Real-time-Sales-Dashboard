import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ServerWakingPage = () => {
  const [progress, setProgress] = useState(0);
  const {t} = useTranslation();

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        💤 {t('serverWaking.serverStarting')}
      </h1>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 text-center max-w-md">
        {t('serverWaking.serverDesc')}
      </p>

      <div className="w-full max-w-sm h-2 bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-500 mt-3 dark:text-gray-400">
        {t('serverWaking.startingUp')}: {progress}%
      </p>
    </div>
  );
};

export default ServerWakingPage;
