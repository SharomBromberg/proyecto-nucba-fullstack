import { formatPrice } from '../../../utils'
import CardProductCheckout from '../../CardProductCheckout/CardProductCheckout'

import {
	CardsWrapperStyled,
	EnvioStyled,
	HrStyled,
	PriceContainerStyled,
	PriceTotalStyled,
	ProductosContainerStyled,
	ProductsTitleStyled,
	SubtotalStyled,
	TotalStyled,
} from './ProductsCheckoutStyles'

const ProductsCheckout = ({ cartItems, shippingCost, price }) => {
	// Obtén los productos del carrito y calcula el subtotal

	return (
		<ProductosContainerStyled>
			<ProductsTitleStyled>Tu pedido</ProductsTitleStyled>
			<CardsWrapperStyled>
				{cartItems.length ? (
					cartItems.map((item) => (
						<CardProductCheckout key={item.id} {...item} />
					))
				) : (
					<p>No quieres comprar algo?</p>
				)}
			</CardsWrapperStyled>
			<PriceContainerStyled>
				<SubtotalStyled>
					<p>Subtotal</p>
					<span>{formatPrice(price)}</span>
				</SubtotalStyled>
				<EnvioStyled>
					<p>Envío:</p>
					<span>{formatPrice(shippingCost)}</span>
				</EnvioStyled>
				<HrStyled />
				<TotalStyled>
					<p>Total:</p>
					<PriceTotalStyled>
						{formatPrice(price + shippingCost)}
					</PriceTotalStyled>
				</TotalStyled>
			</PriceContainerStyled>
		</ProductosContainerStyled>
	)
}

export default ProductsCheckout
