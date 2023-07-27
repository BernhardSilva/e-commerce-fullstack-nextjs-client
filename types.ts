export interface Billboard {
	id: string;
	label: string;
	imageUrl: string;
}

export interface Category {
	id: string;
	name: string;
	billboard: Billboard;
}

export interface Color {
	id: string;
	name: string;
	value: string;
}
