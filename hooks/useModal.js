'use client';
import { actions } from '../context';
import useAppContext from './useAppContext';

export default function useModal() {
	const { state, dispatch } = useAppContext();
	const openModal = ({
		title,
		children,
		showSubmitted = false,
		funcSubmitted,
		funcCancel,
	}) => {
		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'modal',
				value: {
					title,
					children,
					visible: true,
					showSubmitted,
					funcSubmitted,
					funcCancel,
				},
			}),
		);
	};
	const closeModal = () => {
		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'modal',
				value: {
					title: '',
					children: null,
					visible: false,
					showSubmitted: false,
					funcSubmitted: null,
					funcCancel: null,
				},
			}),
		);
	};

	return { openModal, closeModal };
}
