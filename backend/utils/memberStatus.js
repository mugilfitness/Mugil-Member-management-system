
const { getISTDayDiff } = require("./dateFilter");

function getMemberStatus(expiryDate) {
    if (!expiryDate) {
        return "Expired";
    }

    const diffDays = getISTDayDiff(expiryDate);

    if (diffDays === null) {
        return "Expired";
    }

    // More than 60 days expired
    if (diffDays < -60) {
        return "Inactive";
    }

    // Expired from yesterday up to 60 days
    if (diffDays < 0) {
        return "Expired";
    }

    // Expiring today or within the next 7 days
    if (diffDays <= 7) {
        return "Expiring Soon";
    }

    // More than 7 days remaining
    return "Active";
}

module.exports = getMemberStatus;
