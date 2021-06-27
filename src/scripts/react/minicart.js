import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Minicart from './components/Minicart';
import store from './stores/cart';

export default function initMinicart(container) {
	render(
		<Provider store={store}>
			<React.StrictMode>
				<Minicart />
			</React.StrictMode>
		</Provider>,
		container
	);
};
