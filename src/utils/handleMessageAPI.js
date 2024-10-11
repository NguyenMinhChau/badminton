export const errorMessage = (error, parsed) => {
	const errRaw = parsed ? error : error?.response?.data?.errors || [];

	const errList = Array.isArray(errRaw) ? errRaw : [errRaw];

	const fMessage = (item) => {
		if (typeof item?.msg === 'string') return item.msg;
		if (typeof item?.param === 'string') return item.param;
		if (typeof item?.message === 'string') return item.message;
		if (typeof item?.message?.[0]?.message === 'string')
			return item?.message?.[0]?.message;
		if (typeof item?.param?.[0]?.param === 'string')
			return item?.param?.[0]?.param;
		if (typeof item?.errors?.[0]?.msg === 'string')
			return item?.errors?.[0]?.msg;
		if (typeof item?.errors?.[0]?.message === 'string')
			return item?.errors?.[0]?.message;
		if (typeof item?.message?.error?.errorMsg === 'string')
			return item?.message.error.errorMsg;

		return JSON.stringify(item, null, 2);
	};

	const msg = errList?.map((i) => fMessage(i)).join(', ');

	return msg || 'Đã xảy ra lỗi';
};
