import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Lagos",
});

/** Live clock in Lagos time, refreshed every 30 seconds. */
export default function LocalTime() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);

  // Pre-rendered HTML carries build-time text; the client corrects it on
  // hydration, so the mismatch is expected.
  return (
    <time dateTime={now.toISOString()} suppressHydrationWarning>
      {formatter.format(now)}
    </time>
  );
}
