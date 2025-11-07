import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart/cartSlice'
import { formatPrice, resolveImageSrc } from '../../utils'
import Button from '../UI/Button/Button'
import {
	CardPrice,
	ContainerPrice,
	ImageContainer,
	ProductosCard,
	TextContainer,
} from './CardsProductosStyles'
import { toast } from 'sonner'

const CardProducto = ({ id, img, title, desc, price }) => {
	const dispatch = useDispatch()
	const cover = resolveImageSrc(img)

	return (
		<ProductosCard>
			<ImageContainer>
				<img src={cover} alt={title} />
			</ImageContainer>

			<TextContainer>
				<h2>{title}</h2>
				<p>{desc}</p>
			</TextContainer>

			<ContainerPrice>
				<CardPrice>{formatPrice(price)}</CardPrice>
				<Button
					onClick={() => {
						dispatch(addToCart({ img: cover, title, desc, price, id }))
						toast.success('Producto agregado')
					}}
				>
					Agregar
				</Button>
			</ContainerPrice>
		</ProductosCard>
	)
}

export default CardProducto
