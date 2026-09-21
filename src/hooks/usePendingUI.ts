import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export function usePendingUI(pendingMs = 500, pendingMinMs = 500) {
  const routerPending = useRouterState({
    select: (s) => s.status === "pending",
  });
  const [showPending, setShowPending] = useState(false);
  const shownAtRef = useRef<number | null>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (routerPending) {
      clearTimeout(hideTimer.current);
      showTimer.current = setTimeout(() => {
        shownAtRef.current = Date.now();
        setShowPending(true);
      }, pendingMs);
    } else {
      clearTimeout(showTimer.current);
      if (shownAtRef.current) {
        const elapsed = Date.now() - shownAtRef.current;
        const remaining = Math.max(pendingMinMs - elapsed, 0);
        hideTimer.current = setTimeout(() => {
          setShowPending(false);
          shownAtRef.current = null;
        }, remaining);
      } else {
        setShowPending(false);
      }
    }
    return () => clearTimeout(showTimer.current);
  }, [routerPending, pendingMs, pendingMinMs]);

  return showPending;
}
