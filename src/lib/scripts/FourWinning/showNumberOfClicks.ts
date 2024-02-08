export function showNumberofClicks(
	hitCounts: number | Record<string, number>,
	numberOfClicks: string
) {
	numberOfClicks = JSON.stringify(hitCounts);
	return numberOfClicks;
}
