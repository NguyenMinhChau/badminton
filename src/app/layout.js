'use client';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ProviderContext } from '../../context/';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>Trang chủ - Badminton - FTEL</title>
				<meta
					name="description"
					content="FTEL NHẤT - CHƠI CẦU LÔNG CHẤT"
				/>
				<link rel="icon" href="/favicon.png" />
				<meta property="og:image" content="/img/badminton_bg.jpg" />
			</head>
			<body className={inter.className}>
				<ProviderContext>
					<ThemeProvider attribute="class">
						<Navbar />
						<div>{children}</div>
						<Footer />
						<Toast />
					</ThemeProvider>
				</ProviderContext>
			</body>
		</html>
	);
}
