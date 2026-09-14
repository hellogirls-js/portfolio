import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useInterval } from "react-use";

export default function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const time = dayjs().format("h:mm A");
    setTime(time);
  }, []);

  useInterval(() => {
    setTime(dayjs().format("h:mm A"));
  }, 1000)

  return (
    <div className={clsx("text-xs", "text-base-50", "text-shadow-sm")}>
      {time}
    </div>
  )
}
