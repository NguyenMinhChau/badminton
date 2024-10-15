'use client';
import React, { useReducer } from 'react';
import AppContext from './AppContext.create';
import reducer, { initialStateApp } from './AppContext.reducer';
import { actions } from '.';

const ProviderContext = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialStateApp);
	React.useEffect(() => {
		dispatch(
			actions.SET_DATA_PAYLOAD({
				key: 'data',
				value: {
					user: JSON.parse(localStorage.getItem('currentUser')),
				},
			}),
		);
	}, []);
	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export default ProviderContext;
