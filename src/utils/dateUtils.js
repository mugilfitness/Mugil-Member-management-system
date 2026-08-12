const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

export const getISTNow = () => {
  return new Date(Date.now() + IST_OFFSET_MS);
};

export const getISTDateParts = (date = new Date()) => {
  const istDate = new Date(date.getTime() + IST_OFFSET_MS);

  return {
    year: istDate.getUTCFullYear(),
    month: istDate.getUTCMonth(),
    date: istDate.getUTCDate(),
  };
};

export const getISTToday = () => {
  const { year, month, date } = getISTDateParts();

  return new Date(Date.UTC(year, month, date));
};

export const calculateISTDaysLeft = (expiryDate) => {
  if (!expiryDate) return 0;

  const today = getISTToday();

  const { year, month, date } = getISTDateParts(new Date(expiryDate));

  const expiry = new Date(Date.UTC(year, month, date));

  const diff = expiry.getTime() - today.getTime();

  return Math.round(diff / (1000 * 60 * 60 * 24));
};

export const formatISTDate = (date) => {
  if (!date) return "-";

  const { year, month, date: day } = getISTDateParts(new Date(date));

  return new Date(Date.UTC(year, month, day)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};