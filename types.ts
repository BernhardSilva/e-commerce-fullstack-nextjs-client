export interface Product {
	id: string;
	category: Category;
	name: string;
	description: string;
	price: string;
	isFeatured: boolean;
	size: Size;
	color: Color;
	images: Image[];
	stock: Stock[];
}

export interface Stock {
	id: string;
	idProduct: string;
	quantity: number;
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
export interface Size {
	id: string;
	name: string;
	value: string;
}
export interface Image {
	id: string;
	url: string;
}
export interface Billboard {
	id: string;
	label: string;
	imageUrl: string;
}
export interface Store {
	name: string;
}
