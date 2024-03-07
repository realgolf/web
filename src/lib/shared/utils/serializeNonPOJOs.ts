export const serializeNonPOJOs = (value: object | null) => {
	return JSON.parse(JSON.stringify(value));
};
