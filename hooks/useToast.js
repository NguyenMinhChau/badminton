'use client';
import { actions } from '../context';
import useAppContext from './useAppContext';

export default function useToast() {
	const { state, dispatch } = useAppContext();
	const openToast = ({ type, message }) => {
		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'toast',
				value: {
					type,
					message,
					visible: true,
				},
			}),
		);
	};
	const closeToast = () => {
		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'toast',
				value: {
					type: 'SUCCESS',
					message: 'Thao tác thành công',
					visible: false,
				},
			}),
		);
	};

	return { openToast, closeToast };
}
