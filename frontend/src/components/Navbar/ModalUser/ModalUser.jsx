import { useEffect, useRef } from 'react'
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
	const displayName =
		currentUser?.name ??
		currentUser?.nombre ??
		currentUser?.email ??
		'Invitado'

	const modalRef = useRef(null)

	useEffect(() => {
		if (hiddenMenu) return

		const handleOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				dispatch(toggleMenuHidden())
			}
		}

		document.addEventListener('mousedown', handleOutside)
		document.addEventListener('touchstart', handleOutside)

		return () => {
			document.removeEventListener('mousedown', handleOutside)
			document.removeEventListener('touchstart', handleOutside)
		}
	}, [hiddenMenu, dispatch])

	const handleNavigateAway = () => {
		dispatch(toggleMenuHidden())
	}

	const handleLogout = () => {
		dispatch(setCurrentUser(null))
		dispatch(toggleMenuHidden())
	}

	return (
		<AnimatePresence>
			{!hiddenMenu && (
				<ModalContainerStyled
					ref={modalRef}
					initial={{ translateX: 600 }}
					animate={{ translateX: 0 }}
					exit={{ translateX: 600 }}
					transition={{ duration: 0.5 }}
					key="cart-user"
				>
					<UsernameStyled>{displayName}</UsernameStyled>
					<div style={{ textAlign: 'center', margin: '1rem 0' }}>
						<BsDashLg size={30} color="gray" />
					</div>
					<LinkStyled to="/mis-ordenes" onClick={handleNavigateAway}>
						Mis Ordenes
					</LinkStyled>
					<span
						onClick={handleLogout}
						style={{
							display: 'flex',
							alignItems: 'center',
							cursor: 'pointer',
							gap: '0.5rem',
						}}
					>
						<MdLogout size={20} />
						Cerrar Sesion
					</span>
				</ModalContainerStyled>
			)}
		</AnimatePresence>
	)
}

export default ModalUser

