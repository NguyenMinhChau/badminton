'use client';
import Link from 'next/link';
import ThemeChanger from './DarkSwitch';
import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
	const pathName = usePathname();
	const navigation = [
		{ label: 'Danh sách tham gia', href: '/list-users-join' },
		{ label: 'Bảng kết quả', href: '/table-result' },
		{ label: 'Xếp hạng', href: '/range' },
		{ label: 'Quản lý', href: '/management' },
		{ label: 'Lịch thi đấu', href: '/schedule-match' },
	];

	const checkActiveRoute = (route) => {
		return pathName.startsWith(route.href);
	};

	return (
		<div className="w-full">
			<nav className="container relative flex flex-wrap items-center justify-between gap-5 p-8 mx-auto lg:justify-between xl:px-1">
				{/* Logo  */}
				<Link href="/">
					<span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
						<span>
							<Image
								src="/fpt-logo.png"
								width="130"
								alt="FPT TELECOM"
								height="130"
								className="w-[130px]"
							/>
						</span>
					</span>
				</Link>

				{/* get started  */}
				<div className="gap-3 nav__item mr-2 lg:flex ml-auto lg:ml-0 lg:order-2">
					{/* <ThemeChanger /> */}
					<div className="hidden lg:flex nav__item">
						<Link
							href="/login"
							className="px-6 py-2 text-white bg-[#ea580c] rounded-md"
						>
							Đăng nhập
						</Link>
					</div>
					<div className="hidden lg:flex nav__item">
						<Link
							href="/"
							className="px-6 py-2 text-[#ea580c] bg-gray-200 border border-[#ea580c] rounded-md"
						>
							Đăng ký
						</Link>
					</div>
				</div>

				<Disclosure>
					{({ open }) => (
						<>
							<Disclosure.Button
								aria-label="Toggle Menu"
								className="px-2 py-1 text-white rounded-md lg:hidden hover:text-[#ea580c] focus:text-[#ea580c] focus:outline-none"
							>
								<svg
									className="w-6 h-6 fill-current"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
								>
									{open && (
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
										/>
									)}
									{!open && (
										<path
											fillRule="evenodd"
											d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
										/>
									)}
								</svg>
							</Disclosure.Button>

							<Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
								<>
									{navigation.map((item, index) => (
										<Link
											key={index}
											href={item?.href}
											className="w-full text-white uppercase font-bold px-4 py-2 -ml-4 rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-[#ea580c3a] focus:outline-none"
											style={{
												color: checkActiveRoute(item)
													? '#ea580c'
													: 'inherit',
											}}
										>
											{item?.label}
										</Link>
									))}
									<Link
										href="/login"
										className="w-full px-6 py-2 mt-3 text-center text-white bg-[#ea580c] rounded-md lg:ml-5"
									>
										Đăng nhập
									</Link>
									<Link
										href="/"
										className="w-full px-6 py-2 mt-3 text-center text-[#ea580c] bg-gray-200 border border-[#ea580c] rounded-md lg:ml-5"
									>
										Đăng ký
									</Link>
								</>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>

				{/* menu  */}
				<div className="hidden text-center lg:flex lg:items-center">
					<ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
						{navigation.map((menu, index) => (
							<li className="mr-3 nav__item" key={index}>
								<Link
									href={menu?.href}
									className={`inline-block uppercase text-white font-bold px-4 py-2 text-lg no-underline rounded-md hover:text-indigo-500 focus:text-indigo-500 focus:bg-[#ea580c3a] focus:outline-none`}
									style={{
										color: checkActiveRoute(menu)
											? '#ea580c'
											: 'inherit',
									}}
								>
									{menu?.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</nav>
		</div>
	);
};
