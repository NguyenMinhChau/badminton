import { useContext } from 'react';
import { AppContext } from '../context/';

export default function useAppContext() {
	const { state, dispatch } = useContext(AppContext);
	return { state, dispatch };
}
