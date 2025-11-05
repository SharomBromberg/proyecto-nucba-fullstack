import { AnimatePresence } from 'framer-motion'
import { MdLogout } from 'react-icons/md'
import { BsDashLg } from 'react-icons/bs'
import {
	LinkStyled,
	ModalContainerStyled,
	UsernameStyled,
} from './ModelUserStyles'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser, toggleMenuHidden } from '../../../redux/user/userSlice'

const ModalUser = () => {
	const { currentUser, hiddenMenu } = useSelector((state) => state.user)
	const dispatch = useDispatch()

	return (
		<AnimatePresence>
			{!hiddenMenu && (
				<ModalContainerStyled
					initial={{ translateX: 600 }}
					animate={{ translateX: 0 }}
					exit={{ translateX: 600 }}
					transition={{ duration: 0.5 }}
					key="cart-user"
				>
					<UsernameStyled>{`${currentUser?.nombre}`}</UsernameStyled>
					<div style={{ textAlign: 'center', margin: '1rem 0' }}>
						<BsDashLg size={30} color="gray" /> {/* Ícono en lugar de línea */}
					</div>
					<LinkStyled to="/mis-ordenes">Mis Ordenes</LinkStyled>
					<span
						onClick={() => {
							dispatch(setCurrentUser(null))
							dispatch(toggleMenuHidden())
						}}
						style={{
							display: 'flex',
							alignItems: 'center',
							cursor: 'pointer',
							gap: '0.5rem',
						}}
					>
						<MdLogout size={20} /> {/* Ícono de cerrar sesión */}
						Cerrar Sesion
					</span>
				</ModalContainerStyled>
			)}
		</AnimatePresence>
	)
}

export default ModalUser
