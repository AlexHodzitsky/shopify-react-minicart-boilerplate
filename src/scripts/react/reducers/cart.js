import { CLOSE_CART, OPEN_CART, UPDATE_CART } from "../actions/types";

const initialState = {
	isOpened: false,
	cart: {
		items: [],
		item_count: 0
	}
}

export const getCart = state => state.cart.cart;

export const isOpened = state => state.cart.isOpened;

export default function (state = initialState, action) {
	switch(action.type){
		case UPDATE_CART: {
			return {
				...state,
				cart: action.cart
			};
		}
		case OPEN_CART: {
			return {
				...state,
				isOpened: true
			};
		}
		case CLOSE_CART: {
			return {
				...state,
				isOpened: false
			};
		}
		default: {
			return state;
		}
	}
};
