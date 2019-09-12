export default function determineFileType(name: string) {
	const indexOfDot = name.lastIndexOf(".");
	return name.substring(indexOfDot + 1, name.length);
}
