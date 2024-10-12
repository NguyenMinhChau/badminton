import { SET_DATA, SET_TOGGLE } from './AppContext.actions';
import { TOAST, DATA_STATE, MODAL } from './AppContext.state';

const initialStateApp = {
	set_data: {
		data: DATA_STATE,
		toast: TOAST,
		modal: MODAL,
	},
	set_toggle: {
		isLoading: false,
	},
};

const SET_DATA_PAYLOAD = (payload) => {
	return {
		type: SET_DATA,
		key: payload.key,
		value: payload.value,
	};
};
const SET_TOGGLE_PAYLOAD = (payload) => {
	return {
		type: SET_TOGGLE,
		key: payload.key,
		value: payload.value,
	};
};

const reducer = (state, action) => {
	switch (action.type) {
		case SET_DATA:
			return {
				...state,
				set_data: {
					...state.set_data,
					[action.key]:
						typeof state.set_data[action.key] !== 'object'
							? action.value
							: {
									...state.set_data[action.key],
									...action.value,
							  },
				},
			};
		case SET_TOGGLE:
			return {
				...state,
				set_toggle: {
					...state.set_toggle,
					[action.key]:
						typeof state.set_toggle[action.key] !== 'object'
							? action.value
							: {
									...state.set_toggle[action.key],
									...action.value,
							  },
				},
			};
		default:
			return state;
	}
};
export default reducer;
export { initialStateApp, SET_DATA_PAYLOAD, SET_TOGGLE_PAYLOAD };
