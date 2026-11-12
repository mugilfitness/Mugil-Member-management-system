
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

const getISTNow = () => {
    return new Date(Date.now() + IST_OFFSET_MS);
};

const getISTDateParts = (date) => {
    const istDate = new Date(date.getTime() + IST_OFFSET_MS);

    return {
        year: istDate.getUTCFullYear(),
        month: istDate.getUTCMonth(),
        date: istDate.getUTCDate(),
    };
};

const getISTDayStart = (date) => {
    const { year, month, date: day } = getISTDateParts(date);

    return new Date(
        Date.UTC(year, month, day, 0, 0, 0, 0) - IST_OFFSET_MS
    );
};

const getISTDayEnd = (date) => {
    const { year, month, date: day } = getISTDateParts(date);

    return new Date(
        Date.UTC(year, month, day, 23, 59, 59, 999) - IST_OFFSET_MS
    );
};

// Get IST calendar day number
const getISTDayNumber = (date) => {
    if (!date) return null;

    const value = new Date(date);

    if (isNaN(value.getTime())) {
        return null;
    }

    const { year, month, date: day } = getISTDateParts(value);

    return Date.UTC(year, month, day) / (24 * 60 * 60 * 1000);
};

// Calculate date difference using IST calendar days
const getISTDayDiff = (expiryDate) => {
    const expiryDay = getISTDayNumber(expiryDate);
    const today = getISTDayNumber(new Date());

    if (expiryDay === null || today === null) {
        return null;
    }

    return expiryDay - today;
};

const isDateInPeriod = (date, period = "overall") => {
    if (!date) return false;

    const value = new Date(date);

    if (isNaN(value.getTime())) {
        return false;
    }

    const now = new Date();

    const todayStart = getISTDayStart(now);
    const todayEnd = getISTDayEnd(now);

    const { year, month } = getISTDateParts(now);

    // First day of current month in IST
    const monthStart = new Date(
        Date.UTC(year, month, 1, 0, 0, 0, 0) - IST_OFFSET_MS
    );

    // Last day of current month in IST
    const monthEnd = new Date(
        Date.UTC(year, month + 1, 0, 23, 59, 59, 999) - IST_OFFSET_MS
    );

    // First day of 3-month period in IST
    const threeMonthStart = new Date(
        Date.UTC(year, month - 2, 1, 0, 0, 0, 0) - IST_OFFSET_MS
    );

    switch (period) {

        case "today":
            return value >= todayStart && value <= todayEnd;

        case "thisMonth":
            return value >= monthStart && value <= monthEnd;

        case "last3Months":
            return value >= threeMonthStart && value <= now;

        case "overall":
        default:
            return true;
    }
};

module.exports = {
    isDateInPeriod,
    getISTDayDiff
};
