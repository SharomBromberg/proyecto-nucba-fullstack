import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'

import { FiHome, FiUser } from 'react-icons/fi'
import CartIcon from './CartIcon/CartIcon'
import ModalCart from './ModalCart/ModalCart'
import ModalUser from './ModalUser/ModalUser'

import {
	CartNavStyled,
	CustomImageStyled,
	LinkContainerStyled,
	LinksContainerStyled,
	NavbarContainerStyled,
	SpanStyled,
	UserContainerStyled,
	UserNavStyled,
} from './NavbarStyles'
import { toggleMenuHidden } from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function Navbar() {
	const { currentUser } = useSelector((state) => state.user)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	return (
		<NavbarContainerStyled>
			<ModalCart />
			<ModalUser />
			<div>
				<Link to="/">
					<CustomImageStyled src="../../public/assets/logo.png" alt="Logo" />
				</Link>
			</div>
			<LinksContainerStyled>
				<motion.div whileTap={{ scale: 0.97 }}>
					<Link to="/">
						<LinkContainerStyled>
							<FiHome color="c8a2ff" />
						</LinkContainerStyled>
						Home
					</Link>
				</motion.div>
				<CartNavStyled>
					<CartIcon />
				</CartNavStyled>

				<UserNavStyled>
					<UserContainerStyled
						onClick={() =>
							currentUser ? dispatch(toggleMenuHidden()) : navigate('/register')
						}
					>
						<SpanStyled>
							{currentUser ? `${currentUser.nombre}` : 'Inicia Sesion'}
						</SpanStyled>
						<FiUser color="c8a2ff" />
					</UserContainerStyled>
				</UserNavStyled>
			</LinksContainerStyled>
		</NavbarContainerStyled>
	)
}

export default Navbar
