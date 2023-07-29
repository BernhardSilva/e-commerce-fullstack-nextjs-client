import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Product } from '@/types';

interface CartStore {
	items: Product[];
	addItem: (data: Product) => void;
	removeItem: (id: string) => void;
	removeAll: () => void;
}

const useCart = create(
	persist<CartStore>(
		(set, get) => ({
			items: [],
			//add item to CartStore
			addItem: (data: Product) => {
				const currentItems = get().items;
				const existingItem = currentItems.find((item) => item.id === data.id);

				if (existingItem) {
					//i need here to update the quantity of the item
					return toast('Item already in cart.');
				}

				set({ items: [...get().items, data] });
				toast.success('Item added to cart.');
			},
			//remove item from CartStore
			removeItem: (id: string) => {
				set({ items: [...get().items.filter((item) => item.id !== id)] });
				toast.success('Item removed from cart.');
			},
			//remove all from CartStore
			removeAll: () => set({ items: [] })
		}),
		{
			name: 'cart-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useCart;
