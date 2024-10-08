'use client';
export const FileUploadSmall = ({ color, onChange, file, className }) => {
	return (
		<div className={`flex items-center justify-center`}>
			<label
				// for="dropzone-file"
				className={`flex flex-col items-center justify-center w-full border-2 bg-gray-200 border-dashed rounded-lg cursor-pointer ${className}`}
				style={{
					borderColor: color,
				}}
			>
				<div className="flex flex-col items-center justify-center p-2">
					<svg
						className="w-5 h-5"
						style={{
							color: color,
						}}
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 16"
					>
						<path
							stroke="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
						/>
					</svg>
				</div>
				<input
					// id="dropzone-file"
					type="file"
					className="hidden"
					onChange={(e) => {
						onChange(e.target.files);
					}}
					accept=".xlsx,.xls"
				/>
			</label>
		</div>
	);
};