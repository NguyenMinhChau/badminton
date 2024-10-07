'use client';
import { Container } from '@/components/Container';
import { Hero } from '@/components/Hero';
import { SectionTitle } from '@/components/SectionTitle';
import { Benefits } from '@/components/Benefits';
import { Testimonials } from '@/components/Testimonials';
import { Faq } from '@/components/Faq';
import { LoadingScreen } from '@/components/LoadingScreen';
import { useAppContext } from '../../hooks/';
import prizeStructureImg from '../../public/img/prize_structure.png';

import { benefitOne } from '@/components/data';
import Image from 'next/image';

export default function Home() {
	const { state } = useAppContext();
	const { isLoading } = state.set_toggle;
	return (
		<>
			{isLoading && <LoadingScreen />}
			<Container>
				<Hero />

				<SectionTitle
					preTitle="PRIZE STRUCTURE"
					title="CƠ CẤU GIẢI THƯỞNG"
				></SectionTitle>

				<div className="flex items-center justify-center w-full">
					<div className="">
						<Image
							src={prizeStructureImg}
							width="1000"
							height="617"
							className={'aspect-auto rounded-xl overflow-hidden'}
							alt="Background Image"
							loading="eager"
							placeholder="blur"
						/>
					</div>
				</div>

				<SectionTitle preTitle="BENEFITS" title="LỢI ÍCH KHI THAM GIA">
					Chơi cầu lông mang lại nhiều lợi ích cả về sức khỏe và tinh
					thần. Dưới đây là một số lợi ích chính
				</SectionTitle>

				<Benefits data={benefitOne} />

				<SectionTitle
					preTitle="SHARE"
					title="NHỮNG CHIA SẺ THÚ VỊ"
				></SectionTitle>
				<Testimonials />

				{/* <Benefits imgPos="right" data={benefitTwo} /> */}
				{/* <Video videoId="fZ0D0cnR88E" /> */}
				{/* <SectionTitle preTitle="FAQ " title="CÁC CÂU HỎI THƯỜNG GẶP">
					Giúp cho người dùng có thể biết được những thắc mắc mà mình
					đang gặp phải về chương trình
				</SectionTitle>
				<Faq /> */}

				<SectionTitle
					preTitle="SPONSORS"
					title="ĐƠN VỊ ĐỒNG HÀNH CÙNG GIẢI ĐẤU"
				></SectionTitle>

				<div className="flex flex-col justify-center">
					<div className="flex flex-wrap items-center justify-center gap-10 md:justify-center">
						<div className="pt-2 text-gray-400">
							<Image
								src="/fpt-logo.png"
								width="130"
								alt="INF LOGO"
								height="130"
								className="w-[130px]"
							/>
						</div>
						<div className="pt-2 text-gray-400">
							<Image
								src="/sponsors/INF_logo.png"
								width="130"
								alt="INF LOGO"
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
