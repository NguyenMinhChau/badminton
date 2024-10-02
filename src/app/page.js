'use client';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { SectionTitle } from '@/components/SectionTitle';
import { Benefits } from '@/components/Benefits';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAppContext } from '../../hooks/';

import { benefitOne } from '@/components/data';
import Image from 'next/image';

export default function Home() {
	const { state, dispatch } = useAppContext();
	return (
		<>
			{/* <LoadingScreen /> */}
			<Container>
				<Hero />

				<SectionTitle preTitle="BENEFITS" title="LỢI ÍCH KHI THAM GIA">
					Chơi cầu lông mang lại nhiều lợi ích cả về sức khỏe và tinh
					thần. Dưới đây là một số lợi ích chính
				</SectionTitle>

				<Benefits data={benefitOne} />
				<Testimonials />

				{/* <Benefits imgPos="right" data={benefitTwo} /> */}
				{/* <Video videoId="fZ0D0cnR88E" /> */}
				<SectionTitle preTitle="FAQ " title="CÁC CÂU HỎI THƯỜNG GẶP">
					Giúp cho người dùng có thể biết được những thắc mắc mà mình
					đang gặp phải về chương trình
				</SectionTitle>
				<Faq />

				<div className="flex flex-col justify-center mt-12">
					<div className="text-3xl text-center text-white font-bold lg:leading-tight lg:text-4xl">
						ĐƠN VỊ ĐỒNG HÀNH CÙNG GIẢI ĐẤU
					</div>
					<div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around">
						<div className="pt-2 text-gray-400">
							<Image
								src="/fpt-logo.png"
								width="130"
								alt="FPT TELECOM"
								height="130"
								className="w-[130px]"
							/>
						</div>
						<div className="pt-2 text-gray-400">
							<Image
								src="/fpt-logo.png"
								width="130"
								alt="FPT TELECOM"
								height="130"
								className="w-[130px]"
							/>
						</div>
						<div className="pt-2 text-gray-400">
							<Image
								src="/fpt-logo.png"
								width="130"
								alt="FPT TELECOM"
								height="130"
								className="w-[130px]"
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
