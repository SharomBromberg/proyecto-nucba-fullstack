import { formatPrice } from '../../utils'

import {
	PriceContainerStyled,
	ProductLeftStyled,
	ProductPriceStyled,
	ProductStyled,
} from './CardResumenStyles'

const CardResumen = ({ img, title, desc, price, quantity }) => {
	return (
		<ProductStyled>
			<ProductLeftStyled>
				<img src={img} alt={title} />
				<div>
					<h3>{title}</h3>
					<p>{desc}</p>
				</div>
			</ProductLeftStyled>
			<PriceContainerStyled>
				<p>{quantity}U</p>
				<ProductPriceStyled>{formatPrice(price * quantity)}</ProductPriceStyled>
			</PriceContainerStyled>
		</ProductStyled>
	)
}

export default CardResumen
