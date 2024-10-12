import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Container } from '@/components/Container';

export function Footer() {
	return (
		<div className="relative">
			<Container>
				<div className="grid max-w-screen-xl grid-cols-1 gap-10 pt-10 mx-auto mt-5 border-t border-gray-300 lg:grid-cols-3">
					<div className="lg:col-span-2">
						{/* <div>
							<Link
								href="/"
								className="flex items-center space-x-2 text-2xl font-medium"
							>
								<Image
									src="/fpt-logo.png"
									alt="FPT TELECOM"
									width="130"
									height="130"
									className="w-[130px]"
								/>
							</Link>
						</div> */}
						<div className="w-full text-justify text-white">
							<b className="text-white">
								FTEL NHẤT - CHƠI CẦU LÔNG CHẤT
							</b>{' '}
							là một chương trình thi đấu cầu lông do FPT Telecom
							tổ chức, nhằm tạo sân chơi thể thao cho cán bộ, nhân
							viên và các thành viên trong công ty. Chương trình
							không chỉ thúc đẩy tinh thần thể dục thể thao mà còn
							gắn kết các đồng nghiệp, tạo nên môi trường làm việc
							tích cực. Với tổng giá trị giải thưởng lên đến{' '}
							<b className="text-orange-600">30.000.000 VNĐ</b>,
							đây là cơ hội để các tay vợt thể hiện tài năng và
							nhận được những phần thưởng giá trị từ chương trình.
						</div>
					</div>

					<div className="">
						<div className="text-white">
							Liên hệ với chúng tôi qua:{' '}
						</div>
						<div className="flex flex-col gap-5 mt-5 text-white">
							<a
								href="https://www.facebook.com/FiLFUNisLife?mibextid=JRoKGi"
								target="_blank"
								rel="noopener"
							>
								<span className="sr-only">Facebook</span>
								<div className="flex flex-row flex-wrap items-center gap-1">
									<Facebook />
									<span className="text-white">
										FiL - FUN is Life
									</span>
								</div>
							</a>
							<a
								href="https://fpt.workplace.com/profile.php?id=100092727603366"
								target="_blank"
								rel="noopener"
							>
								<span className="sr-only">Workplace</span>
								<div className="flex flex-row flex-wrap items-center gap-1">
									<Workplace />
									<span className="text-white">
										FiL - FUN is Life
									</span>
								</div>
							</a>
							<div className="flex flex-row gap-1 items-center flex-wrap">
								<a
									href="tel:0908023600"
									target="_blank"
									rel="noopener"
								>
									<span className="sr-only">Phone</span>
									<div className="flex flex-row flex-wrap items-center gap-1">
										<Phone />
										<span className="text-white">
											0908.023.600 (LinhTTT41)
										</span>
									</div>
								</a>
								<b>HOẶC</b>
								<a
									href="tel:0523576666"
									target="_blank"
									rel="noopener"
								>
									<span className="sr-only">Phone</span>
									<div className="flex flex-row flex-wrap items-center gap-1">
										<span className="text-white">
											0523.576.666 (TanTN8)
										</span>
									</div>
								</a>
							</div>
							<a
								href="mailto:funftel@fpt.com"
								target="_blank"
								rel="noopener"
							>
								<span className="sr-only">Mail</span>
								<div className="flex flex-row flex-wrap items-center gap-1">
									<Email />
									<span className="text-white">
										FUNFTEL@FPT.COM
									</span>
								</div>
							</a>
						</div>
					</div>
				</div>

				<div className="my-10 text-sm text-center text-white">
					Copyright © {new Date().getFullYear()}. Made with ♥ by FTEL
					- INFMN - KTHT
				</div>
			</Container>
		</div>
	);
}

const Facebook = ({ size = 28 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path>
	</svg>
);
const Phone = ({ size = 30 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M17.707 12.293a.999.999 0 0 0-1.414 0l-1.594 1.594c-.739-.22-2.118-.72-2.992-1.594s-1.374-2.253-1.594-2.992l1.594-1.594a.999.999 0 0 0 0-1.414l-4-4a.999.999 0 0 0-1.414 0L3.581 5.005c-.38.38-.594.902-.586 1.435.023 1.424.4 6.37 4.298 10.268s8.844 4.274 10.269 4.298h.028c.528 0 1.027-.208 1.405-.586l2.712-2.712a.999.999 0 0 0 0-1.414l-4-4.001zm-.127 6.712c-1.248-.021-5.518-.356-8.873-3.712-3.366-3.366-3.692-7.651-3.712-8.874L7 4.414 9.586 7 8.293 8.293a1 1 0 0 0-.272.912c.024.115.611 2.842 2.271 4.502s4.387 2.247 4.502 2.271a.991.991 0 0 0 .912-.271L17 14.414 19.586 17l-2.006 2.005z"></path>
	</svg>
);

const Email = ({ size = 28 }) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 2v.511l-8 6.223-8-6.222V6h16zM4 18V9.044l7.386 5.745a.994.994 0 0 0 1.228 0L20 9.044 20.002 18H4z"></path>
	</svg>
);
const Workplace = ({ size = 28 }) => (
	<svg
		role="img"
		width={size}
		height={size}
		viewBox="0 0 24 24"
		fill="currentColor"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>Workplace</title>
		<path d="M23.268 10.541C23.268 4.715 18.544 0 12.728 0c-1.614 0-3.191.317-4.663.952a11.952 11.952 0 00-3.817 2.574 11.915 11.915 0 00-3.516 8.478 11.924 11.924 0 003.516 8.48 12.05 12.05 0 003.817 2.573c1.472.626 3.05.943 4.671.943 1.56 0 3.05-.3 4.416-.837l-.908-2.292a9.448 9.448 0 01-3.508.67 9.481 9.481 0 01-6.743-2.794A9.481 9.481 0 013.2 12.004c0-2.547.996-4.944 2.794-6.742a9.496 9.496 0 016.743-2.794 8.072 8.072 0 016.734 12.524l-2.098-5.165c-.308-.758-.679-1.895-2.071-1.895-1.393 0-1.763 1.146-2.063 1.895l-1.93 4.769-2.591-6.54H5.993l3.226 7.95c.326.802.688 1.895 2.09 1.895 1.4 0 1.753-1.093 2.08-1.895l1.912-4.724 1.921 4.724c.388.978.802 1.895 2.08 1.895.908 0 1.481-.582 1.798-.96a10.493 10.493 0 002.168-6.4Z" />
	</svg>
);
