'use client';
import { actions } from '../context';
import useAppContext from './useAppContext';

export default function useToast() {
	const { state, dispatch } = useAppContext();
	const openToast = ({ type, message, Message, autoClose = true }) => {
		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'toast',
				value: {
					type,
					message,
					Message,
					visible: true,
					autoClose,
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
					Message: null,
					visible: false,
					autoClose: true,
				},
			}),
		);
	};

	return { openToast, closeToast };
}
