import { useNavigate } from 'react-router-dom'
import { formatPrice, resolveImageSrc } from '../../utils'
import Button from '../UI/Button/Button'
import {
	CardPrice,
	ContainerPrice,
	ImageContainer,
	ProductosCard,
	TextContainer,
} from './CardsProductosStyles'

const CardProducto = ({ id, _id, productId, img, title, desc, price }) => {
	const navigate = useNavigate()
	const cover = resolveImageSrc(img)
	const targetId = productId || _id || id

	const handleNavigate = () => {
		if (targetId) {
			navigate(`/producto/${targetId}`)
		}
	}

	return (
		<ProductosCard onClick={handleNavigate}>
			<ImageContainer>
				<img src={cover} alt={title} />
			</ImageContainer>

			<TextContainer>
				<h2>{title}</h2>
			</TextContainer>

			<ContainerPrice>
				<CardPrice>{formatPrice(price)}</CardPrice>
				<Button onClick={(event) => {
					event.stopPropagation()
					handleNavigate()
				}}>
					Ver detalles
				</Button>
			</ContainerPrice>
		</ProductosCard>
	)
}

export default CardProducto
