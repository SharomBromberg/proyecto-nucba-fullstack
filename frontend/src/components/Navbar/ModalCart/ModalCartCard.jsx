import { useDispatch } from 'react-redux'
import { formatPrice } from '../../../utils'
import { BsPlusLg } from 'react-icons/bs'
import { FaMinus } from 'react-icons/fa'

import Count from '../../UI/Count/Count'
import Increase from '../../UI/Increase/Increase'
import { addToCart, removeFromCart } from '../../../redux/cart/cartSlice'
import { IoMdTrash } from 'react-icons/io'

import {
	CardTitleStyled,
	PriceStyled,
	ProductContainerStyled,
	QuantityContainerStyled,
	TextContainerStyled,
} from './ModalCartStyles'

const ModalCartCard = ({ img, title, desc, price, quantity, id }) => {
	const dispatch = useDispatch()

	return (
		<ProductContainerStyled>
			<img src={img} alt={title} />
			<TextContainerStyled>
				<CardTitleStyled>{title}</CardTitleStyled>
				<PriceStyled>{formatPrice(price)}</PriceStyled>
			</TextContainerStyled>
			<QuantityContainerStyled>
				<Increase
					bgColor="var(--btn-gradient-secondary)"
					onClick={() => dispatch(removeFromCart(id))}
				>
					{quantity === 1 ? <IoMdTrash /> : <FaMinus />}
				</Increase>
				<Count>{quantity}</Count>
				<Increase
					onClick={() =>
						dispatch(addToCart({ img, title, desc, price, quantity, id }))
					}
				>
					<BsPlusLg />
				</Increase>
			</QuantityContainerStyled>
		</ProductContainerStyled>
	)
}

export default ModalCartCard
