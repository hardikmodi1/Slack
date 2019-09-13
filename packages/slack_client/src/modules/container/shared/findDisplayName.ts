export default function findDisplayName(name: string, username: string) {
	const names = name.split(", ");
	return names[0] === username ? names[1] : names[0];
}
