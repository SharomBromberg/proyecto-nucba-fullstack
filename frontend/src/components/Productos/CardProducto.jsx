import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart/cartSlice'
import { formatPrice } from '../../utils'
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
	return (
		<ProductosCard>
			<ImageContainer>
				<img src={img} alt={title} />
			</ImageContainer>

			<TextContainer>
				<h2>{title}</h2>
				<p>{desc}</p>
			</TextContainer>

			<ContainerPrice>
				<CardPrice>{formatPrice(price)}</CardPrice>
				<Button
					onClick={() => {
						dispatch(addToCart({ img, title, desc, price, id }))
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
