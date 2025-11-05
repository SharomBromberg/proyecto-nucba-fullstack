import { useNavigate } from 'react-router-dom'

import CardsMisOrdenes from '../../components/MisOrdenes/CardsMisOrdenes'
import Button from '../../components/UI/Button/Button'

import {
	MisOrdenesBtnContainerStyled,
	MisOrdenesContainerStyled,
	MisOrdenesPatternStyled,
	MisOrdenesTitleStyled,
} from './MisOrdenesStyles'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders } from '../../axios/axios-orders'
import { useEffect } from 'react'
import { clearError, fetchOrdersFail } from '../../redux/orders/ordersSlice'

const MisOrdenes = () => {
	const navigate = useNavigate()
	const { currentUser } = useSelector((state) => state.user)
	const { orders, error } = useSelector((state) => state.orders)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!orders) {
			getOrders(dispatch, currentUser)
		}

		if (!currentUser?.token) {
			dispatch(fetchOrdersFail())
		} else {
			error && dispatch(clearError())
		}
	}, [dispatch, currentUser, orders, error])

	return (
		<>
			<MisOrdenesContainerStyled>
				<MisOrdenesTitleStyled>Mis órdenes</MisOrdenesTitleStyled>
				<CardsMisOrdenes />
				<MisOrdenesBtnContainerStyled>
					<Button onClick={() => navigate('/')}>Volver a comprar</Button>
				</MisOrdenesBtnContainerStyled>
			</MisOrdenesContainerStyled>
			<MisOrdenesPatternStyled />
		</>
	)
}

export default MisOrdenes
