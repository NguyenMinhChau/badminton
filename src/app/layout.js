'use client';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ProviderContext } from '../../context/';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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
				<meta property="og:image" content="/img/badminton_bg.png" />
				<link
					href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
					rel="stylesheet"
					integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
				></link>
				<script
					defer
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
					crossorigin="anonymous"
				></script>
			</head>
			<body className={inter.className}>
				<ProviderContext>
					<ThemeProvider attribute="class">
						<Navbar />
						<div>{children}</div>
						<Footer />
					</ThemeProvider>
				</ProviderContext>
			</body>
		</html>
	);
}
