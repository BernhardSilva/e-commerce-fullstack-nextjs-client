'use client';

import { Dialog } from '@headlessui/react';
import { Search, X } from 'lucide-react';
import { useState } from 'react';

import IconButton from '@/components/ui/icon-button';
import { Color, Size } from '@/types';

import CustomButton from '@/components/ui/custom-button';
import Filter from './filter';

interface MobileFiltersProps {
	sizes: Size[];
	colors: Color[];
}

const MobileFilters = ({ sizes, colors }: MobileFiltersProps) => {
	const [open, setOpen] = useState(false);

	const onOpen = () => setOpen(true);
	const onClose = () => setOpen(false);

	return (
		<>
			<CustomButton onClick={onOpen} className='flex items-center gap-x-2 lg:hidden dark:border border-white'>
				Filters
				<Search size={20} />
			</CustomButton>

			<Dialog open={open} as='div' className='relative z-40 lg:hidden' onClose={onClose}>
				{/* Background color and opacity */}
				<div className='fixed inset-0 bg-black bg-opacity-25' />

				{/* Dialog position */}
				<div className='fixed inset-0 z-40 flex'>
					<Dialog.Panel
						className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto
						bg-white dark:bg-black py-4 pb-6 shadow-xl dark:border-l-2 border-slate-900'
					>
						{/* Close button */}
						<div className='flex items-center justify-end px-4'>
							<IconButton icon={<X size={15} />} onClick={onClose} />
						</div>

						<div className='p-4'>
							<Filter valueKey='sizeId' name='Sizes' data={sizes} />
							<Filter valueKey='colorId' name='Colors' data={colors} />
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
		</>
	);
};

export default MobileFilters;
