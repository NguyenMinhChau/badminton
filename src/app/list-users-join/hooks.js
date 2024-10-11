'use client';
import { useAppContext, useToast } from '../../../hooks/';
import { GET_LIST_PLAYERS } from '../../services';
import useToggle from '../../utils/useToogle';

export const useListUserJoin = () => {
	const { state, dispatch } = useAppContext();
	const { data } = state.set_data;
	const { _submitting, _setSubmitting } = useToggle();
	const { user_list_join } = { ...data };
	const { openToast } = useToast();

	const CallApiGetListPlayers = () => {
		GET_LIST_PLAYERS({
			dispatch,
			_setSubmitting,
			openToast,
		});
	};

	return {
		_submitting,
		user_list_join,

		CallApiGetListPlayers,
	};
};
