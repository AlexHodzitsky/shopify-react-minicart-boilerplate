import {
	UPDATE_CART,
	GET_CART,
	OPEN_CART,
	CLOSE_CART,
	CHANGE_PRODUCT_QUANTITY
} from "./types";

export const ACTION_UPDATE_CART = cart => ({
	type: UPDATE_CART,
	cart
});

export const ACTION_GET_ACTUAL_CART = () => ({
	type: GET_CART
});

export const ACTION_OPEN_CART = () => ({
	type: OPEN_CART
});

export const ACTION_CLOSE_CART = () => ({
	type: CLOSE_CART
});

export const ACTION_CHANGE_QUANTITY = content => ({
	type: CHANGE_PRODUCT_QUANTITY,
	payload: content
});
