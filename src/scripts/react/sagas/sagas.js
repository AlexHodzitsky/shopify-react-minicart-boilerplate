import { put, call, takeLatest, all, takeEvery } from 'redux-saga/effects';
import { changeQuantity as apiChangeQuantity, getCart as apiGetCart } from '../services/api';
import { GET_CART, CHANGE_PRODUCT_QUANTITY } from "../actions/types";
import { ACTION_GET_ACTUAL_CART, ACTION_UPDATE_CART } from "../actions";

export function* getCart() {
	const cart = yield call(apiGetCart);
	yield put(ACTION_UPDATE_CART(cart));
}

export function* changeQuantity({ payload }) {
	yield call(apiChangeQuantity, payload.key, payload.quantity);
	yield put(ACTION_GET_ACTUAL_CART());
}

export function* watchGetCart() {
	yield takeLatest(GET_CART, getCart);
}

export function* watchChangeQuantity() {
	yield takeEvery(CHANGE_PRODUCT_QUANTITY, changeQuantity);
}

export default function* root() {
	yield all([
		watchGetCart(),
		watchChangeQuantity()
	]);
}
