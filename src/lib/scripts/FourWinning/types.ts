export type Team = {
	color: string;
	data: string[];
};

export type Row = {
	side: string;
	data: string[];
};

export type winCombination = {
	cells: { outerIndex: number; innerIndex: number }[];
};
