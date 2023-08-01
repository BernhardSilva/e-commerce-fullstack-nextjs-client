import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Product } from '@/types';

interface CartProduct extends Product {
	quantityItem: number;
}

interface CartStore {
	items: CartProduct[];
	addItem: (data: Product) => void;
	removeItem: (id: string) => void;
	removeAll: () => void;
	quantityItem: (val: string) => number;
	quantityItemSum: () => number;
	totalPricePerItem: (val: string) => number;
	totalPriceCartSum: () => number;
	addOrSubstractItem: (id: string, quantity: number) => void;
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			items: [],

			addItem: (data: Product) => {
				const items = get().items;
				const existingItem = items.find((item) => item.id === data.id);
				if (existingItem) {
					// Item already exists, update the quantity
					const updatedItem = {
						...existingItem,
						quantityItem: existingItem.quantityItem + 1
					};
					set({ items: items.map((item) => (item.id === data.id ? updatedItem : item)) });
					toast.success('Item updated to cart!');
				} else {
					// Item does not exist, add a new one
					const newItem = { ...data, quantityItem: 1 };
					set({ items: [...items, newItem] });
					toast.success('Item added to cart!');
				}
			},
			//substractItem -1 quantity
			addOrSubstractItem: (id: string, quantity: number) => {
				const items = get().items;
				const existingItem = items.find((item) => item.id === id);
				if (existingItem && existingItem.quantityItem + 1) {
					const updatedItem = {
						...existingItem,
						quantityItem: existingItem.quantityItem + quantity
					};
					set({ items: items.map((item) => (item.id === id ? updatedItem : item)) });
				}
			},
			removeItem: (id: string) => {
				const items = get().items;
				set({ items: items.filter((item) => item.id !== id) });
				toast.success('Item removed from cart!');
			},

			removeAll: () => {
				set({ items: [] });
				toast.success('All items removed from cart!');
			},

			quantityItemSum: () => {
				const items = get().items;
				return items.reduce((acc, item) => acc + item.quantityItem, 0);
			},
			quantityItem: (id: string) => {
				const items = get().items;
				const item = items.find((item) => item.id === id);
				return item ? item.quantityItem : 0;
			},

			totalPriceCartSum: () => {
				const items = get().items;
				return items.reduce((acc, item) => acc + parseInt(item.price) * item.quantityItem, 0);
			},

			totalPricePerItem: (id: string) => {
				const items = get().items;
				const item = items.find((item) => item.id === id);
				return item ? parseFloat(item.price) * item.quantityItem : 0;
			}
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useCart;
