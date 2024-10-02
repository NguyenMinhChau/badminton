'use client';
import { useReducer } from 'react';
import AppContext from './AppContext.create';
import reducer, { initialStateApp } from './AppContext.reducer';

const ProviderContext = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialStateApp);
	return (
		<AppContext.Provider value={{ state, dispatch }}>
			{children}
		</AppContext.Provider>
	);
};

export default ProviderContext;
