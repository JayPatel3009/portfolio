export function computeDuration(startDate, endDate) {
    const start = new Date(startDate);
    // If endDate is null, use current date
    const end = endDate ? new Date(endDate) : new Date();
  
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
  
    // Adjust if the month difference is negative
    if (months < 0) {
      years--;
      months += 12;
    }

    // If it's been less than one month
    if (years === 0 && months === 0) return "<1 month";
  
    // Build a string for the duration. You can further refine the display if needed.
    const yearsDisplay = years > 0 ? `${years} ${years === 1 ? "year" : "years"}` : "";
    const monthsDisplay = months > 0 ? `${months} ${months === 1 ? "month" : "months"}` : "";
  
    return [yearsDisplay, monthsDisplay].filter(Boolean).join(" ");
}
