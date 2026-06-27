export function buildMilestoneAnalysis(reviews: any[]) {
  const milestones: string[] = [];

  if (reviews.length >= 10) {
    milestones.push("Completed first 10 reviewed trades.");
  }

  if (reviews.length >= 25) {
    milestones.push("Completed first 25 reviewed trades.");
  }

  if (reviews.length >= 50) {
    milestones.push("Completed first 50 reviewed trades.");
  }

  if (reviews.length >= 100) {
    milestones.push("Completed first 100 reviewed trades.");
  }

  return milestones;
}