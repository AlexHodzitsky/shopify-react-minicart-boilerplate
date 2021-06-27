import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { getCart, isOpened } from "../reducers/cart";
import { ACTION_GET_ACTUAL_CART, ACTION_CLOSE_CART, ACTION_OPEN_CART } from "../actions";
import EmptyMinicart from "./EmptyMinicart";
import ProductList from "./ProductList";
import { translate } from "../../core/helpers/filters";
import MinicartFooter from "./MinicartFooter";
import classnames from "classnames";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

const Minicart = ({ isOpened, cart, openCart, closeCart, getActualCart }) => {
	const [customizer, setCustomizer] = useState({});

	const container = useRef(null);

	const minicartClasses = classnames("minicart", {
		"minicart--shown": isOpened,
	});

	const bodyClasses = classnames("minicart__body", {
		"minicart__body--empty": cart.item_count === 0,
	})

	const initCustomizer = () => {
		const customizerDataHolder = document.getElementById("minicart-customizer-data");

		if(!customizerDataHolder) {
			return null;
		}

		try {
			const data = JSON.parse(customizerDataHolder.innerHTML);

			setCustomizer(data.customizer);
		} catch (e) {}
	}

	const open = () => {
		disableBodyScroll(container.current.querySelector(".js-minicart-items"));

		openCart();
	}

	const close = (e) => {
		e.preventDefault();

		enableBodyScroll(container.current.querySelector(".js-minicart-items"));

		closeCart();
	}

	useEffect(() => {
		getActualCart();

		document.addEventListener("open:minicart", open);

		initCustomizer();

		return () => {
			document.removeEventListener("open:minicart", open);
		};
	}, []);

	return (
		<div className={minicartClasses} ref={container}>
			<div
				className="minicart__overlay"
				onClick={close}
			/>

			<div className="minicart__container">
				<div className="minicart__wrapper">
					<div className="minicart__section minicart__section--header">
						<div className="minicart__title-wrapper">
							<div className="minicart__close" onClick={close}>
								{translate("cart.label.close")}
							</div>

							<h4 className="minicart__title" dangerouslySetInnerHTML={{
								__html: translate("cart.general.title_html")
							}}/>
						</div>
					</div>

					<div className={bodyClasses}>
						{cart.item_count === 0 ? (
							<EmptyMinicart
								continueShoppingButtonText={customizer.continue_shopping_button_text}
								continueShoppingButtonUrl={customizer.continue_shopping_button_url}
							/>
						): (
							<ProductList items={cart.items} />
						)}
					</div>

					<MinicartFooter
						cart={cart}
						continueShoppingButtonUrl={customizer.continue_shopping_button_url}
						continueShoppingButtonText={customizer.continue_shopping_button_text}
					/>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	cart: getCart(state),
	isOpened: isOpened(state)
});

const mapDispatchToProps = dispatch => ({
	getActualCart: () => dispatch(ACTION_GET_ACTUAL_CART()),
	openCart: () => dispatch(ACTION_OPEN_CART()),
	closeCart: () => dispatch(ACTION_CLOSE_CART())
});

export default connect(mapStateToProps, mapDispatchToProps)(Minicart);
