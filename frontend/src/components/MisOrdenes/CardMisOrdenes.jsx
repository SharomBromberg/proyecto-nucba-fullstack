import { useNavigate } from 'react-router-dom'
import { formatDate, formatPrice } from '../../utils'

import {
	IdStyled,
	PedidoContainerStyled,
	PriceStyled,
	StatusStyled,
	TextContainerStyled,
	TitleStyled,
} from './CardMisOrdenesStyles'

const CardMisOrdenes = ({ createdAt, status, total, _id }) => {
	const navigate = useNavigate()

	return (
		<PedidoContainerStyled onClick={() => navigate(`/resumen/${_id}`)}>
			<TextContainerStyled>
				<TitleStyled>ID de la orden: #{_id.slice(-7)}</TitleStyled>
				<IdStyled>Fecha: {formatDate(createdAt)}</IdStyled>
				<PriceStyled>{formatPrice(total)}</PriceStyled>
			</TextContainerStyled>
			<StatusStyled status={status}>{status}</StatusStyled>
		</PedidoContainerStyled>
	)
}
export default CardMisOrdenes
