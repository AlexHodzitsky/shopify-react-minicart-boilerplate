import { getMoneyWithColoredCents, translate } from "../../core/helpers/filters";
import PropTypes from "prop-types";

const MinicartFooter = ({ cart, continueShoppingButtonUrl, continueShoppingButtonText }) => {
	if(!cart.item_count) {
		return null;
	}

	const getAdditionalButton = () => {
		if (!continueShoppingButtonText && !continueShoppingButtonUrl) {
			return null;
		}

		return (
			<div className="minicart__footer-continue-button-wrapper">
				<a href={continueShoppingButtonUrl} className="link minicart__footer-continue-button">
					{continueShoppingButtonText}
				</a>
			</div>
		);
	};

	return (
		<div className="minicart__section minicart__section--footer">
			<div className="minicart__footer-wrapper">
				<div className="minicart__subtotal-wrapper">
					<div className="minicart__subtotal-label">
						{translate('cart.label.subtotal')}
					</div>

					<div
						className="minicart__subtotal-value"
						dangerouslySetInnerHTML={{
							__html: getMoneyWithColoredCents(cart.total_price)
						}}
					/>
				</div>

				<a href="/checkout" className="minicart__checkout-button button button--primary button--full-width">
					{translate('cart.general.checkout')}
				</a>

				{getAdditionalButton()}
			</div>
		</div>
	)
};

MinicartFooter.propTypes = {
	cart: PropTypes.object.isRequired,
	continueShoppingButtonUrl: PropTypes.string,
	continueShoppingButtonText: PropTypes.string
};

export default MinicartFooter;
