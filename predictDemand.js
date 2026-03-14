function predictTatkalDemand(trainNumber, date) {

  const day = new Date(date).getDay();
  let score = 0;

  if (day === 5 || day === 6 || day === 0) {
    score += 30;
  }

  const busyTrains = ["12627", "12628"];

  if (busyTrains.includes(trainNumber)) {
    score += 40;
  }

  if (score >= 60) return "HIGH";
  if (score >= 30) return "MEDIUM";
  return "LOW";
}

module.exports = predictTatkalDemand;