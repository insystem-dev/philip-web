const PHILIPPINES_OFFSET_MS = 8 * 60 * 60 * 1000;
const MIDNIGHT_REFRESH_DELAY_MS = 1000;

const getPhilippinesNow = () => new Date(Date.now() + PHILIPPINES_OFFSET_MS);

export const getTodayInPhilippines = () => {
  const philippinesNow = getPhilippinesNow();

  return [
    philippinesNow.getUTCFullYear(),
    String(philippinesNow.getUTCMonth() + 1).padStart(2, "0"),
    String(philippinesNow.getUTCDate()).padStart(2, "0"),
  ].join("-");
};

export const getMillisecondsUntilPhilippineMidnight = () => {
  const philippinesNow = getPhilippinesNow();
  const nowInPhilippines = philippinesNow.getTime();
  philippinesNow.setUTCHours(24, 0, 0, 0);

  return (
    philippinesNow.getTime() - nowInPhilippines + MIDNIGHT_REFRESH_DELAY_MS
  );
};
