export function extractKanji(text: string): string[] {
	const seen = new Set<string>();
	const result: string[] = [];
	for (const char of text) {
		const cp = char.codePointAt(0)!;
		if (
			(cp >= 0x4E00 && cp <= 0x9FFF) ||
			(cp >= 0x3400 && cp <= 0x4DBF) ||
			(cp >= 0xF900 && cp <= 0xFAFF)
		) {
			if (!seen.has(char)) {
				seen.add(char);
				result.push(char);
			}
		}
	}
	return result;
}
