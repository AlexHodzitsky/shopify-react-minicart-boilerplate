import { translate } from "../../core/helpers/filters";
import PropTypes from "prop-types";

const EmptyMinicart = ({ continueShoppingButtonText, continueShoppingButtonUrl }) => {
	const getAdditionalButton = () => {
		if (!continueShoppingButtonText && !continueShoppingButtonUrl) {
			return null;
		}

		return (
			<a
				href={continueShoppingButtonUrl}
				className="minicart__empty-button button button--primary button--full-width"
			>{continueShoppingButtonText}</a>
		);
	};

	return (
		<div className="minicart__section minicart__section--empty js-minicart-items">
			<div className="minicart__empty-wrapper">
				<p className="minicart__section-empty-message">
					{translate('cart.general.empty')}
				</p>

				{getAdditionalButton()}
			</div>
		</div>
	)
};

EmptyMinicart.propTypes = {
	continueShoppingButtonUrl: PropTypes.string,
	continueShoppingButtonText: PropTypes.string
};

export default EmptyMinicart;
