import Product from "./Product";
import { ACTION_CHANGE_QUANTITY } from "../actions";
import SimpleBar from 'simplebar-react';
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const ProductList = ({ items }) => {
	const dispatch = useDispatch();

	const changeProductQuantity = (content) => {
		dispatch(ACTION_CHANGE_QUANTITY(content))
	}

	return (
		<SimpleBar
			className="minicart__section minicart__section--items custom-simple-bar js-minicart-items"
			autoHide={false}
		>
			{items.map(item => (
				<Product
					item={item}
					key={item.key}
					changeProductQuantity={changeProductQuantity}
				/>
			))}
		</SimpleBar>
	)
};

ProductList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ProductList;
