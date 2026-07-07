import { useEffect, useRef, useState } from "react";

export function useDebouncedSave(value, onSave, delay = 700) {
  const [saved, setSaved] = useState(false);
  const isFirstRun = useRef(true);

  useEffect(() => {
    // اولین بار که کامپوننت mount می‌شه، نباید سیو کنه (چون تغییری اتفاق نیفتاده)
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    setSaved(false);
    const timer = setTimeout(() => {
      onSave(value);
      setSaved(true);
      const hideTimer = setTimeout(() => setSaved(false), 1800);
      return () => clearTimeout(hideTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [value]);

  return saved;
}
