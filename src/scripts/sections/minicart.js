import { register } from "@shopify/theme-sections";
import initMinicart from "../react/minicart";

import store from "../react/stores/cart";
import { ACTION_GET_ACTUAL_CART } from "../react/actions";
import { addToCartSubmit } from "../core/helpers/addToCartSubmit";
import { addItems } from "../react/services/api";

register("minicart", {
	minicartOpeners: null,
	onLoad: function () {
		this.init();
		this.initAjaxAddToCart();
		this.initEvents();
		this.initQuickShop();
	},
	init: function () {
		initMinicart(this.container);

		this.minicartOpeners = document.querySelectorAll(".js-open-minicart");
	},
	initEvents: function () {
		this.minicartOpeners.forEach((opener) => {
			opener.addEventListener("click", this.open.bind(this));
		});
	},
	open: function (e) {
		if (e) {
			e.preventDefault();
		}

		document.dispatchEvent(new CustomEvent("open:minicart"));
	},
	initAjaxAddToCart: function () {
		document.addEventListener("product:add", async (event) => {
			const detail = event.detail;

			if (!detail) {
				return null;
			}

			const items = detail.items;

			if (!items) {
				return null;
			}

			const errorCallback =
				typeof detail.errorCallback === "function"
					? detail.errorCallback
					: () => {};
			const callback =
				typeof detail.callback === "function"
					? detail.callback
					: () => {};

			try {
				await addItems(items);
				store.dispatch(ACTION_GET_ACTUAL_CART());
				this.open();
				callback();
			} catch (error) {
				alert("[Minicart] Something went wrong... -" + error.message);
				errorCallback(error);
			}
		});
	},
	initQuickShop: function () {
		const forms = document.querySelectorAll("[data-add-to-cart-form]");

		forms.forEach((form) => {
			form.addEventListener("keydown", (event) => {
				if (event.keyCode === 13) {
					event.preventDefault();
				}
			});

			form.addEventListener("submit", addToCartSubmit, true);
		});
	}
});
