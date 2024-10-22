'use client';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { ProviderContext } from '../../context/';
import './globals.css';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';
import { Modal } from '@/components/Modal';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<title>Trang chủ - Badminton - FTEL</title>
				<meta name="description" content="FTEL NHẤT - CHƠI CẦU LÔNG CHẤT" />
				<link rel="icon" href="/favicon.png" />
				<meta property="og:image" content="/img/badminton_bg.jpg" />
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
					integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
					// crossorigin="anonymous"
					// referrerpolicy="no-referrer"
				/>
			</head>
			<body className={inter.className}>
				<ProviderContext>
					<ThemeProvider attribute="class">
						<Navbar />
						<div>{children}</div>
						<Footer />
						<Toast />
						<Modal />
					</ThemeProvider>
				</ProviderContext>
			</body>
		</html>
	);
}
