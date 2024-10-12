'use client';
import { actions } from '../context';
import useAppContext from './useAppContext';

export default function useModal() {
	const { state, dispatch } = useAppContext();
	const openModal = ({ title, children }) => {
		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'modal',
				value: {
					title,
					children,
					visible: true,
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
				},
			}),
		);
	};

	return { openModal, closeModal };
}
