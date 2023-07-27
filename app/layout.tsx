import './globals.css';
import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const urb = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Store',
	description: 'Store of this application'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={urb.className}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
