import { Category } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CategoryStore {
	categories: Category[];
	addCategories: (data: Category[]) => void;
}

const useCategory = create(
	persist<CategoryStore>(
		(set, get) => ({
			categories: [],

			addCategories: (data: Category[]) => {
				set({ categories: data });
			}
		}),
		{
			name: 'category-storage',
			storage: createJSONStorage(() => localStorage)
		}
	)
);

export default useCategory;
