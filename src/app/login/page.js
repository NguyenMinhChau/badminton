'use client';
import { HANDLE_LOGIN } from '@/services';
import { useState } from 'react';
import { useAppContext, useToast } from '../../../hooks';
import { isExist } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import useToggle from '@/utils/useToogle';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function Login() {
	const { dispatch } = useAppContext();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const { _setSubmitting, _submitting } = useToggle();
	const { openToast } = useToast();
	return (
		<>
			{_submitting && <LoadingScreen />}
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
										value={email}
										onChange={(e) => {
											setEmail(e.target.value);
										}}
									/>
								</div>
								<div className="mb-8 relative">
									<label
										htmlFor="password"
										className="mb-3 block text-sm font-medium text-black dark:text-white"
									>
										Mật khẩu
									</label>
									<input
										type={showPassword ? 'text' : 'password'}
										name="password"
										placeholder="Nhập mật khẩu"
										className="w-full rounded-md border border-transparent py-3 pl-6 pr-10 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#0000006a] dark:shadow-signUp"
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
										}}
									/>
									<div
										className="absolute bottom-3 right-3 cursor-pointer"
										onClick={() => {
											setShowPassword(!showPassword);
										}}
									>
										{showPassword ? (
											<i class="fa-regular fa-eye"></i>
										) : (
											<i class="fa-regular fa-eye-slash"></i>
										)}
									</div>
								</div>
								{/* <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
									<div>
										<Link
											href="/forgot-password"
											className="text-sm font-medium text-black dark:text-white hover:underline"
										>
											Quên mật khẩu?
										</Link>
									</div>
								</div> */}
								<div className="mb-6">
									<button
										className="flex w-full items-center justify-center rounded-md py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp bg-[#ea580c] disabled:bg-opacity-30"
										disabled={!isExist(email) || !isExist(password)}
										onClick={(e) => {
											e.preventDefault();
											HANDLE_LOGIN({
												_setSubmitting,
												openToast,
												email,
												password,
												dispatch,
												router,
											});
										}}
									>
										Đăng nhập
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
