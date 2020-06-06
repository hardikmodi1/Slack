const monthMap = {
	1: "Jan",
	2: "Feb",
	3: "Mar",
	4: "Apr",
	5: "May",
	6: "Jun",
	7: "Jul",
	8: "Aug",
	9: "Sep",
	10: "Oct",
	11: "Nov",
	12: "Dec"
};

export function expandDate(date: Date) {
	return `${date.getDate()} ${
		monthMap[date.getMonth()]
	}, ${date.getFullYear()}`;
}