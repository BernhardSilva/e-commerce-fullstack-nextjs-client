'use client';

import queryString from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Color, Size } from '@/types';
import CustomButton from '@/components/ui/custom-button';

interface FilterProps {
	data: (Size | Color)[];
	name: string;
	valueKey: string;
}

const Filter = ({ data, name, valueKey }: FilterProps) => {
	const searchParams = useSearchParams();
	const router = useRouter();

	const selectedValue = searchParams.get(valueKey);

	const onClick = (id: string) => {
		const current = queryString.parse(searchParams.toString());

		const query = {
			...current,
			[valueKey]: id
		};

		if (current[valueKey] === id) {
			query[valueKey] = null;
		}

		const url = queryString.stringifyUrl(
			{
				url: window.location.href,
				query
			},
			{ skipNull: true }
		);

		router.push(url);
	};

	return (
		<div className='mb-8'>
			<h3 className='text-lg font-semibold'>{name}</h3>
			<hr className='my-4' />
			<div className='flex flex-wrap gap-2'>
				{data.map((filter) => (
					<div key={filter.id} className='flex items-center'>
						<CustomButton
							className={cn(
								'rounded-full text-sm p-2 dark:border-slate-700 dark:bg-black bg-slate-700',
								selectedValue === filter.id && 'bg-black dark:text-white dark:border-white text-white border-2'
							)}
							onClick={() => onClick(filter.id)}
						>
							{filter.name}
						</CustomButton>
					</div>
				))}
			</div>
		</div>
	);
};

export default Filter;
