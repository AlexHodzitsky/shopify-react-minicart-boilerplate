import { useState, useEffect } from "react";
import { getImageUrl, getMoneyWithColoredCents, translate } from "../../core/helpers/filters";
import IconRemove from "../icons/IconRemove";
import PropTypes from "prop-types";

const Product = ({ item, changeProductQuantity }) => {
	const [quantity, setQuantity] = useState(item.quantity);

	useEffect( () => {
		setQuantity(item.quantity);
	}, [item.quantity])

	const getProductPrice = () => {
		if(item.compare_at_price > item.price) {
			return (
				<p
					className="minicart-product__compare-at-price"
					dangerouslySetInnerHTML={{
						__html: getMoneyWithColoredCents(item.compare_at_price * item.quantity)
					}}
				/>
			);
		}

		return (
			<p
				className="minicart-product__price"
				dangerouslySetInnerHTML={{
					__html: getMoneyWithColoredCents(item.price * item.quantity)
				}}
			/>
		)
	};

	const getProductOptions = () => {
		if(!item.options_with_values.length) {
			return null;
		}

		return item.options_with_values.map(option => (
			<div className="minicart-product__option" key={option.name}>
				<p className="minicart-product__option-name">
					{option.name}:
				</p>

				<p className="minicart-product__option-value">
					{option.value}
				</p>
			</div>
		));
	};

	const changeQuantity = (quantity) => {
		changeProductQuantity({
			key: item.key,
			quantity
		})
	};

	const onQuantityInputChange = (event) => {
		setQuantity(+event.target.value);
	};

	return (
		<div className="minicart-product">
			<div className="minicart-product__wrapper">
				<a className="minicart-product__image-wrapper" href={item.url}>
					<img
						src={getImageUrl(item.image, '138x')}
						alt={item.title}
						className="minicart-product__image"
					/>
				</a>

				<div className="minicart-product__content">
					<button
						type="button"
						className="minicart-product__remove-button"
						onClick={() => changeQuantity(0)}
					>
						<IconRemove />
					</button>

					<a href={item.url} className="minicart-product__title">
						{item.product_title}
					</a>

					<div className="minicart-product__price-wrapper">
						{getProductPrice()}
					</div>

					{getProductOptions()}

					<table className="minicart-product__quantity">
						<tbody>
							<tr>
								<td className="minicart-product__quantity-column minicart-product__quantity-column--label">
									<p className="minicart-product__quantity-label">
										{translate('cart.label.quantity')}
									</p>
								</td>

								<td className="minicart-product__quantity-column minicart-product__quantity-column--button">
									<button
										type="button"
										className="minicart-product__quantity-button"
										onClick={() => changeQuantity(quantity - 1)}
									>-</button>
								</td>

								<td className="minicart-product__quantity-column minicart-product__quantity-column--input">
									<div className="minicart-product__quantity-input-wrapper">
										<input
											type="number"
											className="minicart-product__quantity-input"
											value={quantity}
											onChange={onQuantityInputChange}
											onBlur={() => changeQuantity(quantity)}
										/>
									</div>
								</td>

								<td className="minicart-product__quantity-column minicart-product__quantity-column--button">
									<button
										type="button"
										className="minicart-product__quantity-button"
										onClick={() => changeQuantity(quantity + 1)}
									>+</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
};

Product.propTypes = {
	item: PropTypes.object.isRequired,
	changeProductQuantity: PropTypes.func.isRequired
};

export default Product;
