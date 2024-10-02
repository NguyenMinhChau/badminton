import { Container } from '@/components/Container';
import Link from 'next/link';

export default function Login() {
	return (
		<section className="relative z-10 overflow-hidden">
			<div className="-mx-4 flex flex-wrap">
				<div className="w-full px-4">
					<div className="mx-auto bg-gray-300 dark:bg-black dark:bg-opacity-30 max-w-[500px] rounded-xl bg-primary bg-opacity-60 py-10 px-6 sm:p-[60px]">
						<h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
							ĐĂNG NHẬP TÀI KHOẢN
						</h3>
						<p className="mb-11 text-center text-base font-medium text-black dark:text-white">
							FTEL nhất - Chơi cầu lông chất
						</p>

						<form>
							<div className="mb-8">
								<label
									htmlFor="email"
									className="mb-3 block text-sm font-medium text-dark text-black dark:text-white"
								>
									Email
								</label>
								<input
									type="email"
									name="email"
									placeholder="Nhập địa chỉ email"
									className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0000006a] dark:shadow-signUp"
								/>
							</div>
							<div className="mb-8">
								<label
									htmlFor="password"
									className="mb-3 block text-sm font-medium text-black dark:text-white"
								>
									Mật khẩu
								</label>
								<input
									type="password"
									name="password"
									placeholder="Nhập mật khẩu"
									className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0000006a] dark:shadow-signUp"
								/>
							</div>
							<div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
								<div>
									<Link
										href="/forgot-password"
										className="text-sm font-medium text-black dark:text-white hover:underline"
									>
										Quên mật khẩu?
									</Link>
								</div>
							</div>
							<div className="mb-6">
								<button className="flex w-full items-center justify-center rounded-md py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp bg-[#ea580c]">
									Đăng nhập
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
