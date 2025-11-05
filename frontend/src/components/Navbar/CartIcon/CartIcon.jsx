import { BsCart } from 'react-icons/bs' // Cambia FaShoppingCart por BsCart

import { LinkContainerStyled } from './../NavbarStyles'
import { useDispatch, useSelector } from 'react-redux'
import { toggleHiddenCart } from '../../../redux/cart/cartSlice'

const CartIcon = () => {
	const totalCartItems = useSelector((state) => state.cart.cartItems).reduce(
		(acc, item) => {
			return (acc += item.quantity)
		},
		0
	)

	const dispatch = useDispatch()
	return (
		<LinkContainerStyled onClick={() => dispatch(toggleHiddenCart())}>
			<BsCart color="c8a2ff" />
			<span>{totalCartItems}</span>
		</LinkContainerStyled>
	)
}

export default CartIcon
