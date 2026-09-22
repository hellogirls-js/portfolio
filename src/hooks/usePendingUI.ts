import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export function usePendingUI(pendingMinMs = 500) {
  const routerPending = useRouterState({
    select: (s) => s.status === "pending",
  });

  const [showPending, setShowPending] = useState(true);

  const prevPendingRef = useRef<boolean>(true);

  useEffect(() => {
    let timeout: number | undefined;
    if (!routerPending && prevPendingRef.current) {
      timeout = setTimeout(() => {
        setShowPending(false);
      }, pendingMinMs);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [routerPending]);

  return showPending;
}
