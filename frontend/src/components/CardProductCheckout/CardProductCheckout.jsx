import { useDispatch } from 'react-redux'
import { formatPrice, resolveImageSrc } from '../../utils'
import { BsPlusLg } from 'react-icons/bs'
import { FaMinus } from 'react-icons/fa'
import { IoMdTrash } from 'react-icons/io'
import { addToCart, removeFromCart } from '../../redux/cart/cartSlice'
import Count from '../UI/Count/Count'
import Increase from '../UI/Increase/Increase'
import {
	CardContainerStyled,
	CardInfoStyled,
	ImageWrapper,
	ProductTitleStyled,
	PriceStyled,
	ActionsRow,
} from './CardProductCheckoutStyles'

const CardProductCheckout = ({ id, img, title, price, quantity }) => {
	const dispatch = useDispatch()
	const cover = resolveImageSrc(img)

	return (
		<CardContainerStyled>
			<ImageWrapper>
				<img src={cover} alt={title} />
			</ImageWrapper>
			<CardInfoStyled>
				<ProductTitleStyled>{title}</ProductTitleStyled>
				<PriceStyled>{formatPrice(price)}</PriceStyled>
				<ActionsRow>
					<Increase
						bgColor="var(--btn-gradient-secondary)"
						onClick={() => dispatch(removeFromCart(id))}
					>
						{quantity === 1 ? <IoMdTrash /> : <FaMinus />}
					</Increase>
					<Count>{quantity}</Count>
					<Increase
						onClick={() =>
							dispatch(addToCart({ id, img: cover, title, price }))
						}
					>
						<BsPlusLg />
					</Increase>
				</ActionsRow>
			</CardInfoStyled>
		</CardContainerStyled>
	)
}

export default CardProductCheckout

