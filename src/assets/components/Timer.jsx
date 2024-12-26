

import { useEffect, useState } from "react";
import { timeZoneOptions } from "./timeZone";
import Footer from "./Footer";

const Timer = () => {
      const [selectedTimeZone, setSelectedTimeZone] = useState(
            Intl.DateTimeFormat().resolvedOptions().timeZone
      );

      const targetDate = new Date("December 31, 2024 23:59:59 UTC").getTime();

      const [time, setTime] = useState({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
      });

      const [isNewYear, setIsNewYear] = useState(false);

      const padWithZero = (num) => (num < 10 ? `0${num}` : num);

      const convertToTimeZone = (timeZone) => {
            const dateInTimeZone = new Date().toLocaleString("en-US", {
                  timeZone,
            });
            const localDate = new Date(dateInTimeZone);
            return localDate.getTime() - Date.now();
      };

      useEffect(() => {
            const interval = setInterval(() => {
                  const timeZoneOffset = convertToTimeZone(selectedTimeZone);
                  const now = Date.now() + timeZoneOffset;
                  const distance = targetDate - now;

                  if (distance <= 0) {
                        setIsNewYear(true);
                        setTime({
                              days: 0,
                              hours: 0,
                              minutes: 0,
                              seconds: 0,
                        });
                        return;
                  }

                  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                  setTime({
                        days: padWithZero(days),
                        hours: padWithZero(hours),
                        minutes: padWithZero(minutes),
                        seconds: padWithZero(seconds),
                  });
            }, 1000);

            return () => clearInterval(interval);
      }, [selectedTimeZone, targetDate]);

      return (
            <>

                  <div className="flex items-center justify-center min-h-screen bg-slate-950">

                        <main className="flex flex-col items-center justify-center text-center space-y-8">
                              {isNewYear ? (
                                    <h1 className="text-slate-100 text-4xl sm:text-8xl lg:text-9xl font-thin font-mono">
                                          Happy New Year!
                                    </h1>
                              ) : (
                                    <>
                                          <p className="text-white text-2xl sm:text-3xl lg:text-6xl font-thin font-mono">
                                                Time Left for the End of <button className="bg-emerald-950 rounded-xl p-4 text-white">2024</button>
                                          </p>

                                          <h1 className="text-slate-100 text-5xl sm:text-8xl lg:text-9xl font-thin font-mono">
                                                {time.days}:{time.hours}:{time.minutes}:{time.seconds}
                                          </h1>

                                          <section className="bg-white p-3 rounded-lg border-black mt-4">
                                                <p>Time Zone: {selectedTimeZone}</p>
                                          </section>

                                          <p className="text-white font-bold font-mono m-5">Select a different Timezone</p>

                                          <label htmlFor="timezone-select" className="sr-only">
                                                Select a timezone
                                          </label>
                                          <select
                                                id="timezone-select"
                                                value={selectedTimeZone}
                                                onChange={(e) => setSelectedTimeZone(e.target.value)}
                                                className="p-2 rounded-md"

                                          >
                                                {timeZoneOptions.map((zone) => (
                                                      <option key={zone} value={zone}>
                                                            {zone}
                                                      </option>
                                                ))}
                                          </select>
                                    </>
                              )}
                        </main>
                  </div>

                  <Footer />




            </>
      );
};

export default Timer;
